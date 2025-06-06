
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { Role } from '../types/role';
import { AuthRequest } from './auth.middleware';

export const authorizeRoles = (allowedRoles: Role[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const teamId = req.params.teamId;

      if (!userId || !teamId) {
         res.status(400).json({ message: 'Missing userId or teamId' });
         return;
      }

      // Step 1: Get CompanyUser ID from User
      const companyUser = await prisma.companyUser.findFirst({
        where: {
          userId,
          teams: {
            some: {
              teamId,
            },
          },
        },
        include: {
          teams: true,
        },
      });

      if (!companyUser) {
         res.status(403).json({ message: 'User is not part of this team' });
         return;
      }

      
      if (!allowedRoles.includes(companyUser.role)) {
         res.status(403).json({ message: 'Access denied: insufficient role' });
        return;
      }

      next();
    } catch (error) {
      console.error('RBAC middleware error:', error);
      res.status(500).json({ message: 'Internal server error during authorization' });
    }
  };
};
