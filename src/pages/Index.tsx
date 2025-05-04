
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Separator } from "@/components/ui/separator";
import { Gamepad2, ShieldCheck, TruckIcon, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        
        {/* Features Section */}
        <section className="py-12 bg-geek-dark">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-gray-800/30 hover:border-geek-primary transition-colors">
                <div className="bg-geek-primary/20 p-4 rounded-full mb-4">
                  <Gamepad2 className="h-8 w-8 text-geek-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Produtos Autênticos</h3>
                <p className="text-gray-400">Garantimos a autenticidade de todos os nossos produtos.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-gray-800/30 hover:border-geek-primary transition-colors">
                <div className="bg-geek-primary/20 p-4 rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-geek-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Compra Segura</h3>
                <p className="text-gray-400">Sua compra é 100% segura em nossa loja online.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-gray-800/30 hover:border-geek-primary transition-colors">
                <div className="bg-geek-primary/20 p-4 rounded-full mb-4">
                  <TruckIcon className="h-8 w-8 text-geek-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Entrega Rápida</h3>
                <p className="text-gray-400">Envio para todo o Brasil com rastreamento.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-gray-800/30 hover:border-geek-primary transition-colors">
                <div className="bg-geek-primary/20 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-geek-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Suporte 24/7</h3>
                <p className="text-gray-400">Estamos sempre disponíveis para ajudar você.</p>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProducts />
        
        {/* About Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-geek-dark relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 bg-geek-accent/20 text-geek-accent rounded-full mb-4 font-medium">
                  Sobre Nós
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
                  Bem-vindo à <span className="text-geek-primary">GeekDungeon</span>
                </h2>
                <Separator className="my-6 bg-geek-primary/50 mx-auto w-24 h-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="/lovable-uploads/f6b34cea-d1e7-452d-9626-302ef851bf6a.png" 
                    alt="GeekDungeon Logo"
                    className="w-full max-w-md mx-auto rounded-lg shadow-2xl shadow-geek-primary/20" 
                  />
                </div>
                <div>
                  <p className="text-gray-300 mb-4">
                    A GeekDungeon nasceu da paixão por games, colecionáveis e cultura pop. Fundada em 2023, nossa missão é trazer os melhores produtos do universo geek para os fãs mais dedicados.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Nossa equipe é formada por entusiastas e especialistas que selecionam cuidadosamente cada item do nosso catálogo. Queremos que cada compra seja uma experiência incrível, desde a navegação no site até o momento em que você recebe o seu produto.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="font-bold text-geek-accent text-xl mb-1">1000+</h4>
                      <p className="text-gray-400">Produtos disponíveis</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="font-bold text-geek-accent text-xl mb-1">5000+</h4>
                      <p className="text-gray-400">Clientes satisfeitos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
