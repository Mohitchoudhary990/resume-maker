import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getAllUsers);

router.route('/:id')
    .delete(deleteUser);

export default router;
