import { Router } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();
const execAsync = promisify(exec);

router.post('/initialize-database', async (req, res) => {
  try {
    const config = req.body;
    
    // Create connection string
    const connectionString = `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
    
    // Save to .env
    const envContent = `VITE_DATABASE_URL="${connectionString}"`;
    fs.writeFileSync('.env', envContent);
    
    // Execute SQL script
    const sqlPath = path.join(process.cwd(), 'prisma', 'schema.sql');
    await execAsync(`mysql -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} < "${sqlPath}"`);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;