

// import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/password';
import { signAccessToken, signRefreshToken } from '../utils/token';
 const { PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const payload = { userId: user.id, email: user.email, role: 'USER' }; 
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { accessToken, refreshToken, user };
};
