
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-geek-primary font-heading">GeekDungeon</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-geek-accent font-medium">Início</Link>
            <Link to="/produtos" className="text-gray-700 hover:text-geek-accent font-medium">Produtos</Link>
            <Link to="/categorias" className="text-gray-700 hover:text-geek-accent font-medium">Categorias</Link>
            <Link to="/sobre" className="text-gray-700 hover:text-geek-accent font-medium">Sobre Nós</Link>
            <Link to="/contato" className="text-gray-700 hover:text-geek-accent font-medium">Contato</Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
            <Button variant="outline" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-geek-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">0</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-geek-accent font-medium">Início</Link>
              <Link to="/produtos" className="text-gray-700 hover:text-geek-accent font-medium">Produtos</Link>
              <Link to="/categorias" className="text-gray-700 hover:text-geek-accent font-medium">Categorias</Link>
              <Link to="/sobre" className="text-gray-700 hover:text-geek-accent font-medium">Sobre Nós</Link>
              <Link to="/contato" className="text-gray-700 hover:text-geek-accent font-medium">Contato</Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4">
              <Button variant="ghost" size="icon">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
              <Button variant="outline" className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-geek-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">0</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
