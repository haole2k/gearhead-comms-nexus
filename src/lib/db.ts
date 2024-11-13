import prisma from './prisma';

export async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    return { success: true, result };
  } catch (error) {
    console.error('Database connection error:', error);
    return { success: false, error };
  }
}

export const db = {
  testConnection,
};