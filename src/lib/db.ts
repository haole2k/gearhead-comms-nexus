import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function testConnection() {
  try {
    await prisma.$connect()
    return { success: true }
  } catch (error) {
    console.error('Database connection error:', error)
    return { success: false, error }
  } finally {
    await prisma.$disconnect()
  }
}

export const db = {
  testConnection,
}