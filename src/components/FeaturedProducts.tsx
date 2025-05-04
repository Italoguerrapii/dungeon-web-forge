
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'PlayStation 5',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2080',
    price: 4499.90,
    discount: 4999.90,
    category: 'Games',
    slug: 'playstation-5',
    rating: 5
  },
  {
    id: 2,
    name: 'Action Figure Thor',
    image: 'https://images.unsplash.com/photo-1608278047522-58806a6ac8ec?q=80&w=2080',
    price: 299.90,
    category: 'Action Figures',
    slug: 'action-figure-thor',
    rating: 4
  },
  {
    id: 3,
    name: 'Catan - Jogo de Tabuleiro',
    image: 'https://images.unsplash.com/photo-1590967636575-cb0327e8ae1b?q=80&w=2080',
    price: 349.90,
    discount: 399.90,
    category: 'Board Games',
    slug: 'catan',
    rating: 5
  },
  {
    id: 4,
    name: 'Camiseta Star Wars',
    image: 'https://images.unsplash.com/photo-1533709752211-118fcaf03312?q=80&w=2080',
    price: 89.90,
    category: 'Camisetas',
    slug: 'camiseta-star-wars',
    rating: 4
  },
  {
    id: 5,
    name: 'Headset Gamer RGB',
    image: 'https://images.unsplash.com/photo-1618428173293-6939e43c0c14?q=80&w=2080',
    price: 399.90,
    discount: 499.90,
    category: 'Games',
    slug: 'headset-gamer-rgb',
    rating: 4
  },
  {
    id: 6,
    name: 'Action Figure Darth Vader',
    image: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=2080',
    price: 349.90,
    category: 'Action Figures',
    slug: 'action-figure-darth-vader',
    rating: 5
  },
  {
    id: 7,
    name: 'Dixit - Jogo de Tabuleiro',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d7e4a5eo?q=80&w=2080',
    price: 199.90,
    category: 'Board Games',
    slug: 'dixit',
    rating: 5
  },
  {
    id: 8,
    name: 'Camiseta Marvel',
    image: 'https://images.unsplash.com/photo-1593726892581-ec90148e1664?q=80&w=2080',
    price: 79.90,
    discount: 99.90,
    category: 'Camisetas',
    slug: 'camiseta-marvel',
    rating: 4
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
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-geek-accent/20 text-geek-accent rounded-full mb-4 font-medium">
            Items Raros e Exclusivos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
            Produtos <span className="text-geek-primary">em Destaque</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Confira nossa seleção de produtos mais populares, escolhidos especialmente para você.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-geek-primary/20 transition-all group">
              <div className="relative">
                <Link to={`/produto/${product.slug}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover bg-gray-900"
                  />
                </Link>
                {product.discount && (
                  <Badge className="absolute top-2 right-2 bg-geek-flame text-white">
                    {Math.round((1 - product.price/product.discount) * 100)}% OFF
                  </Badge>
                )}
                <div className="absolute left-0 top-2 flex flex-col gap-2">
                  <Badge className="bg-geek-primary text-white">{product.category}</Badge>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                  <Button variant="outline" size="icon" className="rounded-full bg-white/20 border-white/50 text-white hover:bg-white hover:text-geek-dark">
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-geek-primary text-white hover:bg-geek-accent">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <Link to={`/produto/${product.slug}`} className="hover:text-geek-accent">
                  <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-geek-accent transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <span className="text-geek-primary font-bold text-xl">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount && (
                      <span className="text-gray-400 text-sm line-through ml-2">
                        {formatPrice(product.discount)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'text-geek-accent fill-geek-accent' : 'text-gray-500'}`} 
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-geek-primary hover:bg-geek-accent text-white">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white text-lg px-8 py-6">
            <Link to="/produtos">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
