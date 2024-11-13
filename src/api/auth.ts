import prisma from '../lib/prisma';
import { hash, compare } from 'bcryptjs';

export const loginUser = async (username: string, password: string) => {
  // Validate admin credentials
  if (username !== 'admin' || password !== 'admin') {
    throw new Error('Credenciais inválidas');
  }

  // Get or create admin user
  let user = await prisma.user.findUnique({
    where: { username: 'admin' }
  });

  if (!user) {
    // Create admin user if it doesn't exist
    user = await prisma.user.create({
      data: {
        username: 'admin',
        password: 'admin', // In a real application, this should be hashed
        role: 'ADMIN'
      }
    });
  }

  return {
    username: user.username,
    role: user.role
  };
};