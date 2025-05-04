
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-geek-dark to-geek-primary text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Bem-vindo ao Universo GeekDungeon
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Descubra produtos incríveis para gamers, colecionadores e amantes da cultura geek.
              Navegue por nosso catálogo repleto de tesouros geeks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-geek-primary hover:bg-gray-100 text-lg px-8 py-6">
                Ver Produtos
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-geek-primary text-lg px-8 py-6">
                Categorias
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-geek-accent rounded-full opacity-30 animate-pulse absolute -top-8 -left-8"></div>
              <img 
                src="/placeholder.svg" 
                alt="GeekDungeon Hero" 
                className="w-full max-w-md relative z-10 animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
