import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasourceUrl: import.meta.env.VITE_DATABASE_URL
})

if (import.meta.env.MODE !== 'production') globalForPrisma.prisma = prisma

export default prisma