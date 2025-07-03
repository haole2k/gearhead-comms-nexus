
interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  teamRole: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getUsersApi = async (): Promise<User[]> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users;
};

export const createUserApi = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

export const updateUserApi = async (id: string, userData: Partial<User>): Promise<User> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex((u: User) => u.id === id);
  
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('users', JSON.stringify(users));
  return users[userIndex];
};

export const deleteUserApi = async (id: string): Promise<void> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const filteredUsers = users.filter((u: User) => u.id !== id);
  localStorage.setItem('users', JSON.stringify(filteredUsers));
};

export const getStatsApi = async () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const totalUsers = users.length;
  const adminCount = users.filter((u: User) => u.role === 'ADMIN').length;
  
  return {
    totalUsers,
    adminCount,
    adminPercentage: totalUsers > 0 ? `${Math.round((adminCount / totalUsers) * 100)}% são administradores` : '0%',
    activeMembers: users.filter((u: User) => u.active).length,
    activeMembersPercentage: totalUsers > 0 ? `${Math.round((users.filter((u: User) => u.active).length / totalUsers) * 100)}% ativos` : '0%',
    engagementRate: '85%',
    engagementComparison: '+12% em relação ao mês anterior'
  };
};

export const getUserGrowthApi = async () => {
  // Dados mockados para o gráfico
  return [
    { name: 'Jan', total: 12 },
    { name: 'Fev', total: 19 },
    { name: 'Mar', total: 15 },
    { name: 'Abr', total: 25 },
    { name: 'Mai', total: 22 },
    { name: 'Jun', total: 30 }
  ];
};
