import prisma from '../lib/prisma';
import { User } from '@prisma/client';

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== password) { // In production, use proper password hashing
    throw new Error('Senha incorreta');
  }

  return {
    username: user.username,
    role: user.role
  };
};