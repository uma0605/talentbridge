import express from 'express';
import { registerCompany, loginCompany, getCompanyProfile } from './companyAuthController.js';
import { protect } from './authMiddleware.js';

const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/profile', protect, getCompanyProfile);

export default router;
