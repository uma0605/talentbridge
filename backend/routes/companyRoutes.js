import express from 'express';
import {
  registerCompany,
  loginCompany,
  getCompanyProfile,
} from '../controllers/companyAuthController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/profile', protect, authorize('company'), getCompanyProfile);

export default router;
