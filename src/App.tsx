import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { testConnection } from "@/lib/db";
import { initializeAdmin } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Install from "./pages/Install";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'ADMIN') return <Navigate to="/" />;
  return <>{children}</>;
};

const InstallationCheck = ({ children }: { children: React.ReactNode }) => {
  const installed = localStorage.getItem('installed') === 'true';
  return installed ? <>{children}</> : <Navigate to="/install" />;
};

const App = () => {
  useEffect(() => {
    const init = async () => {
      try {
        const isConnected = await testConnection();
        if (isConnected) {
          await initializeAdmin();
          toast({
            title: "Conexão estabelecida",
            description: "Banco de dados inicializado com sucesso",
          });
        } else {
          toast({
            title: "Erro de conexão",
            description: "Não foi possível conectar ao banco de dados",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Database initialization error:', error);
        toast({
          title: "Erro de inicialização",
          description: "Erro ao inicializar o banco de dados",
          variant: "destructive",
        });
      }
    };
    
    if (localStorage.getItem('installed') === 'true') {
      init();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/install" element={
                localStorage.getItem('installed') === 'true' 
                  ? <Navigate to="/login" /> 
                  : <Install />
              } />
              <Route path="/login" element={
                <InstallationCheck>
                  <Login />
                </InstallationCheck>
              } />
              <Route path="/" element={
                <InstallationCheck>
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                </InstallationCheck>
              } />
              <Route path="/admin" element={
                <InstallationCheck>
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                </InstallationCheck>
              } />
              <Route path="/profile" element={
                <InstallationCheck>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </InstallationCheck>
              } />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;