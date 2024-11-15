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
    // Create connection string
    const connectionString = `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
    
    // Save connection string to localStorage temporarily
    localStorage.setItem('dbConnectionString', connectionString);

    // Initialize database using API endpoint
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

    // Test connection
    const isConnected = await testConnection();
    
    if (isConnected) {
      // Save to localStorage to mark as installed
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
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export const db = {
  testConnection,
  initializeDatabase,
};