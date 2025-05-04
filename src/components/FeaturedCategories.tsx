
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad, Dices, Shirt, Trophy } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Games',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    description: 'Jogos de console, PC e acessórios para gamers',
    slug: 'games',
    icon: <Gamepad className="w-8 h-8" />
  },
  {
    id: 2,
    name: 'Action Figures',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    description: 'Colecionáveis e action figures das suas séries favoritas',
    slug: 'action-figures',
    icon: <Trophy className="w-8 h-8" />
  },
  {
    id: 3,
    name: 'Board Games',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    description: 'Jogos de tabuleiro para todos os gostos',
    slug: 'board-games',
    icon: <Dices className="w-8 h-8" />
  },
  {
    id: 4,
    name: 'Camisetas',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
    description: 'Moda geek com estampas exclusivas',
    slug: 'camisetas',
    icon: <Shirt className="w-8 h-8" />
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-geek-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-geek-accent/20 text-geek-accent rounded-full mb-4 font-medium">
            Explore Nosso Universo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
            Categorias <span className="text-geek-primary">em Destaque</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore nossas categorias mais populares e encontre exatamente o que você está procurando.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              to={`/categoria/${category.slug}`}
              key={category.id} 
              className="bg-gray-800/50 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-geek-primary/30 transition-all group border border-gray-700"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-geek-dark to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-10 left-6 bg-geek-primary rounded-full p-3 shadow-lg group-hover:bg-geek-accent transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-geek-accent pt-4">{category.name}</h3>
                <p className="text-gray-300">{category.description}</p>
                <div className="mt-4 flex items-center justify-end text-geek-primary group-hover:text-geek-accent transition-colors">
                  <span className="text-sm font-medium">Ver Produtos</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
