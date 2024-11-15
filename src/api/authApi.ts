const API_URL = 'http://localhost:8080';

export const loginApi = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Credenciais inválidas');
    }

    return data.user;
  } catch (error) {
    console.error('Login API error:', error);
    throw new Error('Credenciais inválidas');
  }
};

export const testDatabaseConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/api/test-connection`, {
      credentials: 'include'
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};