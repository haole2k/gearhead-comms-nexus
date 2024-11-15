import prisma from '../lib/prisma';
import { hash, compare } from 'bcryptjs';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export const loginUser = async (username: string, password: string) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { username }
  });

  // Se é o admin tentando fazer login
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Se o usuário admin não existe, cria ele
    if (!user) {
      const hashedPassword = await hash(ADMIN_PASSWORD, 10);
      const newAdminUser = await prisma.user.create({
        data: {
          username: ADMIN_USERNAME,
          password: hashedPassword,
          role: 'ADMIN',
          active: true
        }
      });
    }
    
    return {
      username: ADMIN_USERNAME,
      role: 'ADMIN'
    };
  }

  // Para outros usuários, verifica senha normalmente
  if (user) {
    if (!user.active) {
      throw new Error('Usuário inativo');
    }

    const isValidPassword = await compare(password, user.password);

    if (isValidPassword) {
      return {
        username: user.username,
        role: user.role
      };
    }
  }

  throw new Error('Credenciais inválidas');
};

// Initialize admin user
export const initializeAdmin = async () => {
  const adminUser = await prisma.user.findUnique({
    where: { username: ADMIN_USERNAME }
  });

  if (!adminUser) {
    const hashedPassword = await hash(ADMIN_PASSWORD, 10);
    await prisma.user.create({
      data: {
        username: ADMIN_USERNAME,
        password: hashedPassword,
        role: 'ADMIN',
        active: true
      }
    });
  }

  // Deactivate all non-admin users
  await prisma.user.updateMany({
    where: {
      NOT: {
        username: ADMIN_USERNAME
      }
    },
    data: {
      active: false
    }
  });
};