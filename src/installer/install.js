const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execAsync = promisify(exec);
const XAMPP_PATH = 'C:\\xampp';

const log = (message, type = 'info') => {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${message}`);
};

const clearConsole = () => {
  process.stdout.write('\x1Bc');
};

const showAppInfo = () => {
  clearConsole();
  console.log('\n=== Bacarin Racing - Comunicador de Equipe ===\n');
  log('Servidor em execução');
  log('Banco de dados conectado');
  log('Acesse: http://localhost:5173');
  console.log('\nInformações de Acesso:');
  console.log('Usuário: admin');
  console.log('Senha: admin\n');
  console.log('Status dos Serviços:');
  console.log('- XAMPP MySQL: Ativo');
  console.log('- Aplicação Web: Ativa');
  console.log('- API: Ativa\n');
  console.log('Pressione Ctrl+C para encerrar a aplicação\n');
};

async function startXAMPP() {
  try {
    log('Iniciando XAMPP MySQL...');
    const xamppControl = path.join(XAMPP_PATH, 'xampp_control.exe');
    await execAsync(`"${xamppControl}" start mysql`);
    log('XAMPP MySQL iniciado com sucesso', 'success');
    return true;
  } catch (error) {
    log('Erro ao iniciar XAMPP: ' + error.message, 'error');
    return false;
  }
}

async function waitForMySQL() {
  let attempts = 0;
  const maxAttempts = 30;

  while (attempts < maxAttempts) {
    try {
      log('Verificando conexão MySQL...');
      await execAsync('mysql -u root -h localhost -P 3306 -e "SELECT 1"');
      log('MySQL está pronto', 'success');
      return true;
    } catch (error) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('MySQL não iniciou no tempo esperado');
}

async function initializeDatabase() {
  try {
    log('Inicializando banco de dados...');
    const sqlPath = path.join(__dirname, '..', '..', 'prisma', 'schema.sql');
    await execAsync(`mysql -u root < "${sqlPath}"`);
    log('Banco de dados inicializado com sucesso', 'success');
    return true;
  } catch (error) {
    log('Erro ao inicializar banco de dados: ' + error.message, 'error');
    return false;
  }
}

async function startApplication() {
  try {
    log('Instalando dependências...');
    await execAsync('npm install');
    log('Dependências instaladas', 'success');

    log('Iniciando aplicação...');
    const startUrl = 'http://localhost:5173';
    const command = process.platform === 'win32' ? 'start' : 'open';
    await execAsync(`${command} ${startUrl}`);
    
    showAppInfo();
    
    // Keep console open
    process.stdin.resume();
    
    return true;
  } catch (error) {
    log('Erro ao iniciar aplicação: ' + error.message, 'error');
    return false;
  }
}

async function main() {
  try {
    clearConsole();
    console.log('\n=== Instalador Bacarin Racing ===\n');
    
    // Start XAMPP
    const xamppStarted = await startXAMPP();
    if (!xamppStarted) {
      throw new Error('Falha ao iniciar XAMPP');
    }

    // Wait for MySQL
    await waitForMySQL();

    // Initialize database
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      throw new Error('Falha ao inicializar banco de dados');
    }

    // Start application
    const appStarted = await startApplication();
    if (!appStarted) {
      throw new Error('Falha ao iniciar aplicação');
    }

  } catch (error) {
    log('Instalação falhou: ' + error.message, 'error');
    console.log('\nPressione qualquer tecla para sair...');
    process.stdin.resume();
    process.stdin.on('data', () => process.exit(1));
  }
}

main();
