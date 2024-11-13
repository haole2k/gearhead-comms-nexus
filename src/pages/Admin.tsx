import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Users, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (user?.role !== 'ADMIN') {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', onClick: () => {} },
    { icon: <Users className="w-5 h-5" />, label: 'Usuários', onClick: () => {} },
    { icon: <Settings className="w-5 h-5" />, label: 'Configurações', onClick: () => {} },
    { icon: <Shield className="w-5 h-5" />, label: 'Permissões', onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-racing-green">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-4"
            >
              <div className="p-3 bg-racing-green bg-opacity-10 rounded-full">
                {React.cloneElement(item.icon, { className: "w-6 h-6 text-racing-green" })}
              </div>
              <span className="text-lg font-medium text-gray-900">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;