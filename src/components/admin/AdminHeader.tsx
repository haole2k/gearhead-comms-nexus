import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="w-6 h-6 text-racing-green" />
          <h1 className="text-2xl font-bold text-racing-green">Painel Administrativo</h1>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          Voltar
        </Button>
      </div>
    </nav>
  );
};

export default AdminHeader;