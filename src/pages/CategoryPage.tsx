
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Gamepad, Dices, Shirt, Trophy } from 'lucide-react';

const categoryData = {
  'games': {
    name: 'Games',
    description: 'Jogos de console, PC e acessórios para gamers',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    icon: <Gamepad className="w-8 h-8 text-white" />
  },
  'action-figures': {
    name: 'Action Figures',
    description: 'Colecionáveis e action figures das suas séries favoritas',
    banner: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    icon: <Trophy className="w-8 h-8 text-white" />
  },
  'board-games': {
    name: 'Board Games',
    description: 'Jogos de tabuleiro para todos os gostos',
    banner: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    icon: <Dices className="w-8 h-8 text-white" />
  },
  'camisetas': {
    name: 'Camisetas',
    description: 'Moda geek com estampas exclusivas',
    banner: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
    icon: <Shirt className="w-8 h-8 text-white" />
  },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? categoryData[slug as keyof typeof categoryData] : null;
  
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6 text-white">Categoria não encontrada</h1>
          <p className="text-gray-300">A categoria que você está procurando não existe ou foi removida.</p>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <div 
          className="relative py-24"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${category.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-geek-dark via-transparent to-geek-dark opacity-60"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-geek-primary rounded-full p-4">
                {category.icon}
              </div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-400">
                  <li><a href="/" className="hover:text-geek-accent">Home</a></li>
                  <li><span className="mx-1">/</span></li>
                  <li><a href="/categorias" className="hover:text-geek-accent">Categorias</a></li>
                  <li><span className="mx-1">/</span></li>
                  <li className="text-geek-accent">{category.name}</li>
                </ol>
              </nav>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
              {category.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">{category.description}</p>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FeaturedProducts />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
