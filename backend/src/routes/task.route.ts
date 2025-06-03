

import express from 'express';
import * as TaskController from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/:projectId', authenticate, TaskController.createTask);
router.get('/:projectId', authenticate, TaskController.getTasks);
router.patch('/status/:taskId', authenticate, TaskController.updateTaskStatus);

export default router;
