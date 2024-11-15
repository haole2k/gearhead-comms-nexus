import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { loginApi } from '@/api/authApi';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; role: string; teamRole?: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; role: string; teamRole?: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (username: string, password: string) => {
    try {
      const userData = await loginApi(username, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${userData.username}!`,
      });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Credenciais inválidas",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};