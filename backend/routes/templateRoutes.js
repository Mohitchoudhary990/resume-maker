import express from 'express';
import { getTemplates, createTemplate, deleteTemplate, seedTemplates } from '../controllers/templateController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTemplates);
router.post('/seed', protect, authorize('admin'), seedTemplates); // Internal use or initial setup
router.post('/', protect, authorize('admin'), createTemplate);
router.delete('/:id', protect, authorize('admin'), deleteTemplate);

export default router;
