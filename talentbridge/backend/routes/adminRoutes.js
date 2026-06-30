import express from 'express';
import { loginAdmin, getAdminProfile, getStats, getAllStudents, getAllCompanies, deleteStudent, deleteCompany } from '../controllers/adminAuthController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, authorize('admin'), getAdminProfile);
router.get('/stats', protect, authorize('admin'), getStats);
router.get('/students', protect, authorize('admin'), getAllStudents);
router.get('/companies', protect, authorize('admin'), getAllCompanies);
router.delete('/students/:id', protect, authorize('admin'), deleteStudent);
router.delete('/companies/:id', protect, authorize('admin'), deleteCompany);

export default router;