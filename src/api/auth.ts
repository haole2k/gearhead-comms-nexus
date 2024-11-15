import prisma from '../lib/prisma';
import { hash, compare } from 'bcryptjs';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export const loginUser = async (username: string, password: string) => {
  try {
    // Direct admin login check
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return {
        success: true,
        user: {
          username: ADMIN_USERNAME,
          role: 'ADMIN',
          teamRole: 'TEAM_PRINCIPAL'
        }
      };
    }

    // Regular user login
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return {
        success: false,
        error: 'Credenciais inválidas'
      };
    }

    if (!user.active) {
      return {
        success: false,
        error: 'Usuário inativo'
      };
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return {
        success: false,
        error: 'Credenciais inválidas'
      };
    }

    return {
      success: true,
      user: {
        username: user.username,
        role: user.role,
        teamRole: user.teamRole
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Erro ao realizar login'
    };
  }
};