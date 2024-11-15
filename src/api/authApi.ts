const API_URL = 'http://localhost:8080';

export const loginApi = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas');
  }

  return response.json();
};

export const testDatabaseConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/api/test-connection`);
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};