import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserRound, LogOut } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-racing-green/10 rounded-full flex items-center justify-center">
              <UserRound className="w-10 h-10 text-racing-green" />
            </div>
            <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Nome de usuário</p>
              <p className="font-medium">{user?.username}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Função</p>
              <p className="font-medium">{user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</p>
            </div>
            <Button 
              variant="destructive" 
              className="w-full mt-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;