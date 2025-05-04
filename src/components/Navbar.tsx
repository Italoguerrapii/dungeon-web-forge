
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Search, User, Flame } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-geek-dark shadow-md border-b border-geek-stone/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl font-bold text-geek-primary font-heading">
                Geek<span className="text-geek-accent">Dungeon</span>
              </span>
              <Flame className="absolute -top-3 -right-6 w-4 h-4 text-geek-flame animate-flame" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-geek-primary font-medium transition-colors">Início</Link>
            <Link to="/produtos" className="text-white hover:text-geek-primary font-medium transition-colors">Produtos</Link>
            <Link to="/categorias" className="text-white hover:text-geek-primary font-medium transition-colors">Categorias</Link>
            <Link to="/sobre" className="text-white hover:text-geek-primary font-medium transition-colors">Sobre Nós</Link>
            <Link to="/contato" className="text-white hover:text-geek-primary font-medium transition-colors">Contato</Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-geek-accent hover:bg-geek-dark">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-geek-accent hover:bg-geek-dark">
              <User size={20} />
            </Button>
            <Button variant="outline" className="relative border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-geek-accent text-geek-dark rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">0</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:text-geek-accent">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-geek-primary font-medium">Início</Link>
              <Link to="/produtos" className="text-white hover:text-geek-primary font-medium">Produtos</Link>
              <Link to="/categorias" className="text-white hover:text-geek-primary font-medium">Categorias</Link>
              <Link to="/sobre" className="text-white hover:text-geek-primary font-medium">Sobre Nós</Link>
              <Link to="/contato" className="text-white hover:text-geek-primary font-medium">Contato</Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-geek-accent">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-geek-accent">
                <User size={20} />
              </Button>
              <Button variant="outline" className="relative border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-geek-accent text-geek-dark rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">0</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
