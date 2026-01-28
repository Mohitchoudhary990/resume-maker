import express from 'express';
import { analyzeResume } from '../controllers/atsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect this route if you want only logged-in users to check ATS scores
router.post('/analyze', protect, analyzeResume);

export default router;
