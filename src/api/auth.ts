import prisma from '../lib/prisma';

export const loginUser = async (username: string, password: string) => {
  // Only allow admin user
  if (username !== 'admin' || password !== 'admin') {
    throw new Error('Credenciais inválidas');
  }

  // Get or create admin user
  let user = await prisma.user.findUnique({
    where: { username: 'admin' }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username: 'admin',
        password: 'admin',
        role: 'ADMIN'
      }
    });
  }

  return {
    username: user.username,
    role: user.role
  };
};