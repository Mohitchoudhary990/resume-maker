import express from 'express';
import { analyzeResume, analyzeUploadedResume } from '../controllers/atsController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Protect these routes if you want only logged-in users to check ATS scores
router.post('/analyze', protect, analyzeResume);
router.post('/analyze-upload', protect, upload.single('resume'), analyzeUploadedResume);

export default router;
