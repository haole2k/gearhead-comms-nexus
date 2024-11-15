import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testConnection } from "@/lib/db";

const Install = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bacarin_racing'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const connectionString = `mysql://${formData.user}:${formData.password}@${formData.host}:${formData.port}/${formData.database}`;
      
      // Save connection string to localStorage temporarily
      localStorage.setItem('dbConfig', connectionString);
      
      // Test connection
      const isConnected = await testConnection();
      
      if (isConnected) {
        toast({
          title: "Conexão estabelecida",
          description: "Banco de dados configurado com sucesso!",
        });
        
        // Remove installation route
        localStorage.setItem('installed', 'true');
        
        // Redirect to login
        navigate('/login');
      } else {
        toast({
          title: "Erro de conexão",
          description: "Não foi possível conectar ao banco de dados. Verifique as credenciais.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao configurar o banco de dados.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Instalação Bacarin Racing</CardTitle>
          <CardDescription>Configure a conexão com o banco de dados MySQL</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Host</label>
              <Input
                name="host"
                value={formData.host}
                onChange={handleChange}
                placeholder="localhost"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Porta</label>
              <Input
                name="port"
                value={formData.port}
                onChange={handleChange}
                placeholder="3306"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Usuário</label>
              <Input
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="root"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Senha</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha do MySQL"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Banco de Dados</label>
              <Input
                name="database"
                value={formData.database}
                onChange={handleChange}
                placeholder="bacarin_racing"
              />
            </div>
            <Button type="submit" className="w-full">
              Configurar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;