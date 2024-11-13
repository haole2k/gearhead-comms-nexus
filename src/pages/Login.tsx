import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User } from 'lucide-react';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.password);
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo de volta!',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Credenciais inválidas',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-racing-black p-4">
      <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-racing-green">Bacarin Racing</h2>
          <p className="mt-2 text-sm text-racing-gray">Entre na sua conta</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-racing-gray/50" />
              <Input
                {...register('username')}
                type="text"
                placeholder="Usuário"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-racing-gray/50" />
              <Input
                {...register('password')}
                type="password"
                placeholder="Senha"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-racing-green hover:bg-racing-green/90">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;