import express from 'express';
import { loginAdmin, getAdminProfile } from '../controllers/adminAuthController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, authorize('admin'), getAdminProfile);

export default router;
