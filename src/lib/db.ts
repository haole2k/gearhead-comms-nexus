import prisma from './prisma'

export async function testConnection() {
  try {
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1 as result`
    console.log('Database connection successful')
    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

export const db = {
  testConnection,
}