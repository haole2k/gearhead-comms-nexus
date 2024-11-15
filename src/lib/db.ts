import prisma from './prisma'

export async function testConnection() {
  try {
    // During installation, use the connection string from localStorage
    if (!localStorage.getItem('installed')) {
      const connectionString = localStorage.getItem('dbConfig');
      if (connectionString) {
        process.env.VITE_DATABASE_URL = connectionString;
      }
    }
    
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