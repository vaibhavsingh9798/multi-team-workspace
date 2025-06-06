

import express from 'express';
import {createProject, getProjects } from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles} from '../middlewares/rbac.middleware';
import { Role } from '../types/role';


const router = express.Router();

router.post('/:teamId', authenticate , authorizeRoles([Role.MANAGER , Role.OWNER]) , createProject  );
router.get('/:teamId', authenticate , authorizeRoles([Role.MANAGER , Role.OWNER, Role.MEMBER]) , getProjects);

export default router;
