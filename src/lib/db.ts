import prisma from './prisma'

export async function testConnection() {
  try {
    await prisma.$connect()
    // Test the connection with a simple query
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

export const db = {
  testConnection,
}