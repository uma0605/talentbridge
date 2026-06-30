import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }
    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }
    const student = await Student.create({ name, email, password });
    const token = generateToken(student._id, student.role);
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      token,
      user: { id: student._id, name: student.name, email: student.email, role: student.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const student = await Student.findOne({ email: email.toLowerCase() }).select('+password');
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = generateToken(student._id, student.role);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: student._id, name: student.name, email: student.email, role: student.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
};
