
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'PlayStation 5',
    image: '/placeholder.svg',
    price: 4499.90,
    discount: 4999.90,
    category: 'Games',
    slug: 'playstation-5'
  },
  {
    id: 2,
    name: 'Action Figure Thor',
    image: '/placeholder.svg',
    price: 299.90,
    category: 'Action Figures',
    slug: 'action-figure-thor'
  },
  {
    id: 3,
    name: 'Catan - Jogo de Tabuleiro',
    image: '/placeholder.svg',
    price: 349.90,
    discount: 399.90,
    category: 'Board Games',
    slug: 'catan'
  },
  {
    id: 4,
    name: 'Camiseta Star Wars',
    image: '/placeholder.svg',
    price: 89.90,
    category: 'Camisetas',
    slug: 'camiseta-star-wars'
  },
  {
    id: 5,
    name: 'Headset Gamer RGB',
    image: '/placeholder.svg',
    price: 399.90,
    discount: 499.90,
    category: 'Games',
    slug: 'headset-gamer-rgb'
  },
  {
    id: 6,
    name: 'Action Figure Darth Vader',
    image: '/placeholder.svg',
    price: 349.90,
    category: 'Action Figures',
    slug: 'action-figure-darth-vader'
  },
  {
    id: 7,
    name: 'Dixit - Jogo de Tabuleiro',
    image: '/placeholder.svg',
    price: 199.90,
    category: 'Board Games',
    slug: 'dixit'
  },
  {
    id: 8,
    name: 'Camiseta Marvel',
    image: '/placeholder.svg',
    price: 79.90,
    discount: 99.90,
    category: 'Camisetas',
    slug: 'camiseta-marvel'
  }
];

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-geek-secondary font-heading">
            Produtos em Destaque
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção de produtos mais populares, escolhidos especialmente para você.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-contain bg-gray-50"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    {Math.round((1 - product.price/product.discount) * 100)}% OFF
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-geek-primary font-bold text-xl">
                    {formatPrice(product.price)}
                  </span>
                  {product.discount && (
                    <span className="text-gray-400 text-sm line-through">
                      {formatPrice(product.discount)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-geek-primary hover:bg-geek-secondary">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white text-lg px-8 py-6">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
