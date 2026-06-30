import express from 'express';
import {
  registerStudent,
  loginStudent,
  getStudentProfile,
} from '../controllers/studentAuthController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/profile', protect, authorize('student'), getStudentProfile);

export default router;
