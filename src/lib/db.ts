import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function testConnection() {
  try {
    await prisma.$connect()
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