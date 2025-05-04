
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FeaturedProducts from '@/components/FeaturedProducts';

const categoryData = {
  'games': {
    name: 'Games',
    description: 'Jogos de console, PC e acessórios para gamers',
    banner: '/placeholder.svg'
  },
  'action-figures': {
    name: 'Action Figures',
    description: 'Colecionáveis e action figures das suas séries favoritas',
    banner: '/placeholder.svg'
  },
  'board-games': {
    name: 'Board Games',
    description: 'Jogos de tabuleiro para todos os gostos',
    banner: '/placeholder.svg'
  },
  'camisetas': {
    name: 'Camisetas',
    description: 'Moda geek com estampas exclusivas',
    banner: '/placeholder.svg'
  },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? categoryData[slug as keyof typeof categoryData] : null;
  
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6">Categoria não encontrada</h1>
          <p>A categoria que você está procurando não existe ou foi removida.</p>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div 
          className="bg-geek-primary text-white py-16"
          style={{
            backgroundImage: `linear-gradient(rgba(50, 6, 74, 0.85), rgba(100, 32, 170, 0.85)), url(${category.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">{category.name}</h1>
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
