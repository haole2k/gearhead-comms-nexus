import prisma from './prisma';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export async function initializeDatabase(config: {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}) {
  try {
    // Create connection string
    const connectionString = `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
    
    // Save to .env
    const envContent = `VITE_DATABASE_URL="${connectionString}"`;
    fs.writeFileSync('.env', envContent);

    // Execute SQL script
    const sqlPath = path.join(process.cwd(), 'prisma', 'schema.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
    await execAsync(`mysql -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} < "${sqlPath}"`);

    // Test connection
    await testConnection();

    return true;
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