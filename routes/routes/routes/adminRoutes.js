import express from 'express';
import { loginAdmin, getAdminProfile, getStats, getAllStudents, getAllCompanies, deleteStudent, deleteCompany } from './adminAuthController.js';
import { protect } from './authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.get('/stats', protect, getStats);
router.get('/students', protect, getAllStudents);
router.get('/companies', protect, getAllCompanies);
router.delete('/students/:id', protect, deleteStudent);
router.delete('/companies/:id', protect, deleteCompany);

export default router;
