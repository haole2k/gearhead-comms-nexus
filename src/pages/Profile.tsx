import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserRound, LogOut, Shield, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-racing-green/10 rounded-full flex items-center justify-center">
              <UserRound className="w-10 h-10 text-racing-green" />
            </div>
            <h1 className="text-2xl font-bold dark:text-white">Perfil do Usuário</h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserRound className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nome de usuário</p>
                  <p className="font-medium dark:text-white">{user?.username}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Função</p>
                  <p className="font-medium dark:text-white">
                    {user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Membro desde</p>
                  <p className="font-medium dark:text-white">
                    {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              {user?.role === 'ADMIN' && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/admin')}
                >
                  Acessar Painel Admin
                </Button>
              )}
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;