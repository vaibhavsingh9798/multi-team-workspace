

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) : void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Unauthorized' });
     return ;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (err) {
     res.status(403).json({ message: 'Invalid token' });
     return ;
  }
};
