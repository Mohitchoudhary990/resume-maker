import express from 'express';
import {
    generateSummary,
    improveDescription,
    suggestSkills,
    generateProjectDescription,
    optimizeATS,
    getAdvice,
    generatePDF,
    optimizeATSFile
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const router = express.Router();

router.post('/generate-summary', protect, generateSummary);
router.post('/improve-description', protect, improveDescription);
router.post('/suggest-skills', protect, suggestSkills);
router.post('/generate-project-description', protect, generateProjectDescription);
router.post('/optimize-ats', protect, optimizeATS);
router.post('/optimize-ats-file', protect, upload.single('resume'), optimizeATSFile);
router.post('/get-advice', protect, getAdvice);
router.get('/generate-pdf/:id', protect, generatePDF);

export default router;
