import express from 'express';
import {
    getResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, getResumes)
    .post(protect, createResume);

router.route('/:id')
    .get(protect, getResume)
    .put(protect, updateResume)
    .delete(protect, deleteResume);

export default router;
