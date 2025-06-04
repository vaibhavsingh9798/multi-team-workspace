// backend/src/middlewares/rbac.middleware.ts

import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import {prisma} from '../config/db';
import { Role } from '../generated/prisma';



export const authorizeRoles = (allowedRoles: Role[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const teamId = req.params.teamId;

    if (!userId || !teamId) {
      return res.status(400).json({ message: 'Missing user or team info' });
    }

    const membership = await prisma.teamMember.findFirst({
      where: {
        userId,
        teamId,
      },
    });

    if (!membership || !allowedRoles.includes(membership.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
