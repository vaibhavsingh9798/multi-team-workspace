// backend/src/routes/project.routes.ts

import express from 'express';
import * as ProjectController from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/:teamId', authenticate , ProjectController.createProject);
router.get('/:teamId', authenticate , ProjectController.getProjects);

export default router;
