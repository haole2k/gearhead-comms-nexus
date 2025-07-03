
// Simulação de API usando localStorage
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

interface User {
  username: string;
  role: string;
  teamRole: string;
}

export const loginApi = async (username: string, password: string): Promise<User> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));

  // Login do admin
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return {
      username: ADMIN_USERNAME,
      role: 'ADMIN',
      teamRole: 'TEAM_PRINCIPAL'
    };
  }

  // Verificar usuários no localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.username === username);

  if (!user || user.password !== password) {
    throw new Error('Credenciais inválidas');
  }

  if (!user.active) {
    throw new Error('Usuário inativo');
  }

  return {
    username: user.username,
    role: user.role,
    teamRole: user.teamRole
  };
};

export const testDatabaseConnection = async () => {
  // Sempre retorna true para localStorage
  return true;
};
