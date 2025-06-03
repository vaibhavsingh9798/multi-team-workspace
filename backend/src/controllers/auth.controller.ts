

import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthService.registerUser(name, email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.loginUser(email, password);
    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
