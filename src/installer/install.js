const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execAsync = promisify(exec);
const XAMPP_PATH = 'C:\\xampp';

async function startXAMPP() {
  try {
    const xamppControl = path.join(XAMPP_PATH, 'xampp_control.exe');
    await execAsync(`"${xamppControl}" start mysql`);
    console.log('XAMPP MySQL started successfully');
    return true;
  } catch (error) {
    console.error('Error starting XAMPP:', error);
    return false;
  }
}

async function waitForMySQL() {
  let attempts = 0;
  const maxAttempts = 30;

  while (attempts < maxAttempts) {
    try {
      await execAsync('mysql -u root -h localhost -P 3306 -e "SELECT 1"');
      console.log('MySQL is ready');
      return true;
    } catch (error) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('MySQL did not start in time');
}

async function initializeDatabase() {
  try {
    const sqlPath = path.join(__dirname, '..', '..', 'prisma', 'schema.sql');
    await execAsync(`mysql -u root < "${sqlPath}"`);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

async function startApplication() {
  try {
    await execAsync('npm install');
    console.log('Dependencies installed');

    await execAsync('npm run dev');
    console.log('Application started');

    // Open default browser
    const startUrl = 'http://localhost:5173';
    const command = process.platform === 'win32' ? 'start' : 'open';
    await execAsync(`${command} ${startUrl}`);
    
    return true;
  } catch (error) {
    console.error('Error starting application:', error);
    return false;
  }
}

async function main() {
  try {
    console.log('Starting installation...');
    
    // Start XAMPP
    const xamppStarted = await startXAMPP();
    if (!xamppStarted) {
      throw new Error('Failed to start XAMPP');
    }

    // Wait for MySQL to be ready
    await waitForMySQL();

    // Initialize database
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      throw new Error('Failed to initialize database');
    }

    // Start application
    const appStarted = await startApplication();
    if (!appStarted) {
      throw new Error('Failed to start application');
    }

    console.log('Installation completed successfully!');
  } catch (error) {
    console.error('Installation failed:', error);
    process.exit(1);
  }
}

main();