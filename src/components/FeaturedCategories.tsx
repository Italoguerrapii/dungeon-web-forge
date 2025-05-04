
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Games',
    image: '/placeholder.svg',
    description: 'Jogos de console, PC e acessórios para gamers',
    slug: 'games'
  },
  {
    id: 2,
    name: 'Action Figures',
    image: '/placeholder.svg',
    description: 'Colecionáveis e action figures das suas séries favoritas',
    slug: 'action-figures'
  },
  {
    id: 3,
    name: 'Board Games',
    image: '/placeholder.svg',
    description: 'Jogos de tabuleiro para todos os gostos',
    slug: 'board-games'
  },
  {
    id: 4,
    name: 'Camisetas',
    image: '/placeholder.svg',
    description: 'Moda geek com estampas exclusivas',
    slug: 'camisetas'
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-geek-secondary font-heading">
            Categorias em Destaque
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossas categorias mais populares e encontre exatamente o que você está procurando.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              to={`/categoria/${category.slug}`}
              key={category.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-geek-primary">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
