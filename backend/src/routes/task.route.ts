

import express from 'express';
import * as TaskController from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/rbac.middleware';
import { Role } from '../types/role';

const router = express.Router();

router.post('/:projectId', authenticate,authorizeRoles([Role.MANAGER]), TaskController.createTask);
router.get('/:projectId', authenticate, authorizeRoles([Role.OWNER, Role.MANAGER, Role.MEMBER]), TaskController.getTasks);
router.patch('/status/:taskId', authenticate,authorizeRoles([ Role.MANAGER, Role.MEMBER]), TaskController.updateTaskStatus);


export default router;
