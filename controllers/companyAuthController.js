import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const registerCompany = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;
    if (!companyName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }
    const existingCompany = await Company.findOne({ email: email.toLowerCase() });
    if (existingCompany) {
      return res.status(409).json({ success: false, message: 'A company with this email already exists' });
    }
    const company = await Company.create({ companyName, email, password });
    const token = generateToken(company._id, company.role);
    res.status(201).json({
      success: true,
      message: 'Company registered successfully',
      token,
      user: { id: company._id, name: company.companyName, email: company.email, role: company.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const company = await Company.findOne({ email: email.toLowerCase() }).select('+password');
    if (!company) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await company.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = generateToken(company._id, company.role);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: company._id, name: company.companyName, email: company.email, role: company.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: { id: req.user._id, name: req.user.companyName, email: req.user.email, role: req.user.role },
  });
};
