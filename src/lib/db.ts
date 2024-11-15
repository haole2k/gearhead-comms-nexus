import prisma from './prisma';

interface DatabaseConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

export async function initializeDatabase(config: DatabaseConfig) {
  try {
    const connectionString = `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
    localStorage.setItem('dbConnectionString', connectionString);

    const response = await fetch('/api/initialize-database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Failed to initialize database');
    }

    const isConnected = await testConnection();
    
    if (isConnected) {
      localStorage.setItem('installed', 'true');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export async function testConnection() {
  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1`;
    return Array.isArray(result) && result.length > 0;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export const db = {
  testConnection,
  initializeDatabase,
};