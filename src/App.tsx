import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { testDatabaseConnection } from "@/api/authApi";
import { toast } from "@/components/ui/use-toast";
import { logError } from "@/utils/logger";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

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

const App = () => {
  useEffect(() => {
    const init = async () => {
      try {
        const isConnected = await testDatabaseConnection();
        if (isConnected) {
          toast({
            title: "Conexão estabelecida",
            description: "Banco de dados inicializado com sucesso",
          });
        } else {
          const error = new Error("Não foi possível conectar ao banco de dados");
          logError(error, "Database Connection");
          toast({
            title: "Erro de conexão",
            description: "Não foi possível conectar ao banco de dados",
            variant: "destructive",
          });
        }
      } catch (error) {
        logError(error as Error, "Database Initialization");
        console.error('Database initialization error:', error);
        toast({
          title: "Erro de inicialização",
          description: "Erro ao inicializar o banco de dados",
          variant: "destructive",
        });
      }
    };
    
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;