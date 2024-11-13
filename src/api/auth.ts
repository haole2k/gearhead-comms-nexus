import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // Em produção, você deve usar bcrypt.compare
  if (user.password !== password) {
    throw new Error('Senha incorreta');
  }

  return {
    username: user.username,
    role: user.role
  };
};