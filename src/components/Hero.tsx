
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame, Gamepad2, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-geek-dark via-black to-geek-dark text-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-geek-flame blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-geek-accent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <span className="inline-block px-4 py-1 bg-geek-accent/20 text-geek-accent rounded-full mb-4 font-medium">
              Bem-vindo ao universo geek
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Sua <span className="text-geek-primary">aventura</span> geek começa na 
              <span className="text-geek-accent"> Dungeon</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Explore nosso catálogo repleto de tesouros para gamers, 
              colecionadores e entusiastas da cultura geek. 
              Sua próxima obsessão está aqui!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-geek-primary hover:bg-geek-secondary text-white text-lg px-8 py-6 group">
                <Link to="/produtos">
                  <Gamepad2 className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Ver Produtos
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-geek-accent text-geek-accent hover:bg-geek-accent hover:text-geek-dark text-lg px-8 py-6 group">
                <Link to="/categorias">
                  <Gift className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Categorias
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-geek-primary rounded-full opacity-20 animate-pulse absolute -top-8 -left-8"></div>
              <div className="relative z-20 bg-geek-dark/50 p-4 rounded-lg border border-geek-stone/30 shadow-xl">
                <img 
                  src="/lovable-uploads/f6b34cea-d1e7-452d-9626-302ef851bf6a.png" 
                  alt="GeekDungeon Logo" 
                  className="w-72 h-72 md:w-96 md:h-96 object-contain relative z-10 animate-float"
                />
                <div className="absolute top-6 left-10 w-6 h-10 bg-geek-flame rounded-full filter blur-sm opacity-80 animate-flame"></div>
                <div className="absolute top-6 right-10 w-6 h-10 bg-geek-flame rounded-full filter blur-sm opacity-80 animate-flame"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
