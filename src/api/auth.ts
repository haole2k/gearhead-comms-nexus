import prisma from '../lib/prisma';
import { hash, compare } from 'bcryptjs';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export const loginUser = async (username: string, password: string) => {
  // Direct admin login check
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return {
      username: ADMIN_USERNAME,
      role: 'ADMIN',
      teamRole: 'TEAM_PRINCIPAL'
    };
  }

  // Regular user login
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  if (!user.active) {
    throw new Error('Usuário inativo');
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Credenciais inválidas');
  }

  return {
    username: user.username,
    role: user.role,
    teamRole: user.teamRole
  };
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
        teamRole: 'TEAM_PRINCIPAL',
        active: true
      }
    });
  }
};