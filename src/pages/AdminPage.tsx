
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Ticket, 
  LogOut, 
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Verificação se o usuário é admin
  useEffect(() => {
    // Em uma aplicação real, isso seria verificado pelo backend
    // Aqui, estamos apenas simulando com nosso mock de usuário admin
    if (!isAuthenticated || user?.email !== 'admin@example.com') {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Redirecionamento para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirecionamento para home se não for admin
  if (user?.email !== 'admin@example.com') {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center p-4">
              <h2 className="text-xl font-bold text-geek-primary">
                Geek<span className="text-geek-accent">Dungeon</span>
              </h2>
              <span className="ml-2 text-xs bg-geek-accent text-white px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/admin/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Produtos">
                  <Link to="/admin/produtos">
                    <Package />
                    <span>Produtos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Pedidos">
                  <Link to="/admin/pedidos">
                    <ShoppingCart />
                    <span>Pedidos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Usuários">
                  <Link to="/admin/usuarios">
                    <Users />
                    <span>Usuários</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Cupons">
                  <Link to="/admin/cupons">
                    <Ticket />
                    <span>Cupons</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-geek-accent rounded-full flex items-center justify-center text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="w-full flex items-center gap-2"
              >
                <LogOut size={16} />
                Sair
              </Button>
              <Link to="/admin/configuracoes" className="text-xs text-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center justify-center gap-1 mt-2">
                <Settings size={14} />
                <span>Configurações</span>
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Painel Administrativo
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Gerencie sua loja de forma eficiente
              </p>
            </div>
            <SidebarTrigger />
          </div>
          
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
