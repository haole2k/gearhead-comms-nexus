import prisma from './prisma'

export async function testConnection() {
  try {
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1 as result`
    console.log('Database connection test result:', result)
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