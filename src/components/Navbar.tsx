
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, User, ShoppingCart, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      toast({
        title: "Pesquisando",
        description: `Buscando por "${searchQuery}"`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 w-full ${isScrolled ? 'bg-geek-dark/95 backdrop-blur-sm shadow-md' : 'bg-geek-dark'} transition-all duration-300 border-b border-geek-stone/20`}>
      <div className="container mx-auto px-4 py-4">
        {/* Top bar with search and user actions */}
        <div className="flex items-center justify-between mb-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-bold text-geek-primary font-heading">
                Geek<span className="text-geek-accent">Dungeon</span>
              </span>
              <span className="absolute -top-1 -right-4 w-3 h-3 bg-geek-flame rounded-full animate-flame"></span>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex relative w-1/3">
            <form onSubmit={handleSearch} className="w-full">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-full pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search size={18} className="text-gray-400" />
              </Button>
            </form>
          </div>

          {/* User actions - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-geek-accent flex items-center gap-2">
                    <User size={20} />
                    <span>{user?.name.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700" onClick={() => navigate('/minha-conta')}>
                    Painel Principal
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700" onClick={() => navigate('/minha-conta/pedidos')}>
                    Meus Pedidos
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700" onClick={() => navigate('/minha-conta/perfil')}>
                    Editar Perfil
                  </DropdownMenuItem>
                  {user?.isReseller && (
                    <DropdownMenuItem className="hover:bg-gray-700" onClick={() => navigate('/revenda')}>
                      Área de Revenda
                    </DropdownMenuItem>
                  )}
                  {user?.email === 'admin@example.com' && (
                    <DropdownMenuItem className="hover:bg-gray-700" onClick={() => navigate('/admin')}>
                      Administração
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700 text-red-400" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" className="text-white hover:text-geek-accent" onClick={() => navigate('/login')}>
                <User className="mr-2 h-5 w-5" />
                Entrar
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="relative border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white"
              onClick={() => navigate('/carrinho')}
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-geek-accent text-geek-dark rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="outline" 
              className="mr-2 relative border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white"
              onClick={() => navigate('/carrinho')}
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-geek-accent text-geek-dark rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" onClick={toggleMenu} className="text-white hover:text-geek-accent">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Main navigation menu - desktop */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Início
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-700 hover:text-geek-accent data-[state=open]:bg-gray-700">
                  Catálogo
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border-gray-700 text-white">
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <div>
                      <Link
                        to="/produtos"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Todos os Produtos</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Explore toda nossa coleção de placas e quadros
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/produtos?categoria=placas-decorativas"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Placas Decorativas</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Para decorar sua casa ou escritório
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/produtos?categoria=quadros-geek"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Quadros Geek</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Colecionáveis para fãs de cultura pop
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/produtos?categoria=placas-personalizadas"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Personalizadas</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Crie sua placa com mensagem personalizada
                        </p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/revenda" className={navigationMenuTriggerStyle()}>
                  Revenda (atacado)
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-700 hover:text-geek-accent data-[state=open]:bg-gray-700">
                  Informações
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border-gray-700 text-white">
                  <div className="grid w-[400px] gap-3 p-4">
                    <div>
                      <Link
                        to="/como-comprar"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Como Comprar</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Guia passo a passo para compras
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/perguntas-frequentes"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Perguntas Frequentes</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Respostas para suas dúvidas
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/contato"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-geek-accent"
                      >
                        <div className="text-lg font-medium leading-none">Contato</div>
                        <p className="text-sm leading-snug text-gray-400">
                          Fale conosco para tirar dúvidas
                        </p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-fade-in">
          {/* Mobile search */}
          <div className="p-4 border-b border-gray-800">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-geek-primary hover:bg-geek-accent">
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Mobile navigation links */}
          <nav className="flex flex-col divide-y divide-gray-800">
            <Link to="/" className="p-4 text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Início
            </Link>
            <Link to="/produtos" className="p-4 text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Catálogo de Produtos
            </Link>
            <Link to="/revenda" className="p-4 text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Revenda (atacado)
            </Link>
            <Link to="/como-comprar" className="p-4 text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Como Comprar
            </Link>
            <Link to="/perguntas-frequentes" className="p-4 text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Perguntas Frequentes
            </Link>
            <Link to="/contato" className="p-4 text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Contato
            </Link>
            
            {/* Login/Account section */}
            {isAuthenticated ? (
              <div className="p-4 border-t border-gray-700">
                <div className="font-medium text-geek-accent mb-2">Minha Conta ({user?.name})</div>
                <div className="flex flex-col space-y-2 ml-2">
                  <Link to="/minha-conta" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                    Painel Principal
                  </Link>
                  <Link to="/minha-conta/pedidos" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                    Meus Pedidos
                  </Link>
                  <Link to="/minha-conta/perfil" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                    Editar Perfil
                  </Link>
                  {user?.isReseller && (
                    <Link to="/revenda" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                      Área de Revenda
                    </Link>
                  )}
                  {user?.email === 'admin@example.com' && (
                    <Link to="/admin" className="text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                      Administração
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="justify-start text-red-400 hover:text-red-300 hover:bg-transparent p-0"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-5 w-5" />
                  Entrar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-geek-accent text-geek-accent hover:bg-geek-accent hover:text-white"
                  onClick={() => {
                    navigate('/cadastro');
                    setIsMenuOpen(false);
                  }}
                >
                  Criar Conta
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
