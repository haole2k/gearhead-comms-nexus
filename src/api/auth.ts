// Mock user data - In production, this would come from a backend API
const MOCK_USERS = [
  {
    username: "admin",
    password: "admin",
    role: "ADMIN"
  },
  {
    username: "user",
    password: "user123",
    role: "USER"
  }
];

export const loginUser = async (username: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(u => u.username === username);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== password) {
    throw new Error('Senha incorreta');
  }

  return {
    username: user.username,
    role: user.role
  };
};