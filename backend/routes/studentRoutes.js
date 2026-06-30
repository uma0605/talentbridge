import express from 'express';
import { registerStudent, loginStudent, getStudentProfile } from './studentAuthController.js';
import { protect } from './authMiddleware.js';

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/profile', protect, getStudentProfile);

export default router;