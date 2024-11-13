import prisma from '../lib/prisma';
import { hash, compare } from 'bcryptjs';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export const loginUser = async (username: string, password: string) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { username }
  });

  // If no user exists and it's trying to login as admin, create admin account
  if (!user && username === ADMIN_USERNAME) {
    const hashedPassword = await hash(ADMIN_PASSWORD, 10);
    const newAdminUser = await prisma.user.create({
      data: {
        username: ADMIN_USERNAME,
        password: hashedPassword,
        role: 'ADMIN',
        active: true
      }
    });
    
    if (password === ADMIN_PASSWORD) {
      return {
        username: newAdminUser.username,
        role: newAdminUser.role
      };
    }
  }

  // If user exists, verify password and active status
  if (user) {
    if (!user.active) {
      throw new Error('Usuário inativo');
    }

    const isAdmin = user.username === ADMIN_USERNAME;
    const isValidPassword = isAdmin 
      ? password === ADMIN_PASSWORD 
      : await compare(password, user.password);

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