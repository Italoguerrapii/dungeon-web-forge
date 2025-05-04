
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Globe, Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="w-full max-w-6xl mx-auto mb-16">
          <div className="bg-geek-dark/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Receba Nossas Novidades</h3>
              <p className="text-gray-300">Cadastre-se para receber ofertas exclusivas e novidades.</p>
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <Input 
                  placeholder="Seu email" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="bg-geek-primary hover:bg-geek-accent text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-800 pb-12">
          
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold font-heading">
                <span className="text-geek-primary">Geek</span>
                <span className="text-geek-accent">Dungeon</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Seu portal para produtos geek, games, colecionáveis e muito mais. Navegue pelo nosso vasto catálogo de itens exclusivos.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-gray-800 p-2 rounded-full hover:bg-geek-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="bg-gray-800 p-2 rounded-full hover:bg-geek-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="bg-gray-800 p-2 rounded-full hover:bg-geek-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://geekdungeon.com.br" className="bg-gray-800 p-2 rounded-full hover:bg-geek-primary transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Products */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Produtos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categoria/games" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Games
                </Link>
              </li>
              <li>
                <Link to="/categoria/action-figures" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Action Figures
                </Link>
              </li>
              <li>
                <Link to="/categoria/board-games" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Board Games
                </Link>
              </li>
              <li>
                <Link to="/categoria/camisetas" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Camisetas
                </Link>
              </li>
              <li>
                <Link to="/categoria/acessorios" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Acessórios
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Informações</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Contato
                </Link>
              </li>
              <li>
                <Link to="/perguntas-frequentes" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="text-gray-400 hover:text-geek-accent transition-colors flex items-center">
                  <span className="mr-2">►</span> Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Contato</h3>
            <address className="not-italic text-gray-400 space-y-4">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-geek-primary" />
                <span>Rua dos Geeks, 42<br/>São Paulo - SP<br/>CEP: 01234-567</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-geek-primary" />
                <span>contato@geekdungeon.com.br</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-geek-primary" />
                <span>(11) 9999-9999</span>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center sm:flex sm:justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 GeekDungeon. Todos os direitos reservados.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center justify-center sm:justify-end">
            <span className="text-xs text-gray-500 mr-2">Aceitamos:</span>
            <div className="flex gap-2">
              <div className="w-8 h-6 bg-gray-800 rounded"></div>
              <div className="w-8 h-6 bg-gray-800 rounded"></div>
              <div className="w-8 h-6 bg-gray-800 rounded"></div>
              <div className="w-8 h-6 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
