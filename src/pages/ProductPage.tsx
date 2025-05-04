
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from 'lucide-react';

const products = {
  'playstation-5': {
    id: 1,
    name: 'PlayStation 5',
    image: '/placeholder.svg',
    price: 4499.90,
    discount: 4999.90,
    category: 'Games',
    description: 'O PlayStation 5 é o console mais recente da Sony, com gráficos impressionantes e carregamento rápido para uma experiência de jogo imersiva.',
    specs: [
      'CPU AMD Zen 2',
      'GPU AMD RDNA 2',
      'SSD Personalizado de 825GB',
      'Suporte a Ray Tracing',
      'Resolução 4K a 120fps'
    ],
    stock: 5
  },
  'action-figure-thor': {
    id: 2,
    name: 'Action Figure Thor',
    image: '/placeholder.svg',
    price: 299.90,
    category: 'Action Figures',
    description: 'Action figure do Thor altamente detalhada, com vários pontos de articulação e acessórios como o martelo Mjolnir.',
    specs: [
      'Altura: 30cm',
      'Material: Plástico de alta qualidade',
      'Inclui base de exposição',
      'Edição limitada',
      '12 pontos de articulação'
    ],
    stock: 12
  }
};

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? products[slug as keyof typeof products] : null;
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6">Produto não encontrado</h1>
          <p>O produto que você está procurando não existe ou foi removido.</p>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-80 max-w-full object-contain" />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-geek-secondary font-heading">{product.name}</h1>
            <div className="text-sm text-gray-500 mb-4">Código: PROD-{product.id}</div>
            
            <div className="flex items-end gap-3 mb-4">
              {product.discount && (
                <span className="text-gray-400 text-lg line-through">
                  {formatPrice(product.discount)}
                </span>
              )}
              <span className="text-geek-primary font-bold text-3xl">
                {formatPrice(product.price)}
              </span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Disponibilidade:</h3>
              {product.stock > 0 ? (
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Em estoque ({product.stock} unidades)
                </div>
              ) : (
                <div className="text-red-600">Fora de estoque</div>
              )}
            </div>
            
            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex border rounded-md max-w-[140px]">
                  <button className="px-3 py-1 border-r" onClick={() => {}}>-</button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    className="w-full text-center"
                    defaultValue="1"
                  />
                  <button className="px-3 py-1 border-l" onClick={() => {}}>+</button>
                </div>
                <Button className="bg-geek-primary hover:bg-geek-secondary flex-grow">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
                </Button>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">Categoria:</span>
                <a href={`/categoria/${product.category.toLowerCase()}`} className="text-geek-primary hover:underline">
                  {product.category}
                </a>
              </div>
              
              <div className="flex mb-2">
                <span className="font-semibold mr-2">Compartilhar:</span>
                <div className="flex space-x-2">
                  <a href="#" className="text-gray-500 hover:text-geek-primary">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-geek-primary">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-geek-primary">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="descricao">
            <TabsList className="w-full grid grid-cols-3 mb-8 bg-gray-100">
              <TabsTrigger value="descricao">Descrição</TabsTrigger>
              <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="descricao" className="pt-4">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
              </div>
            </TabsContent>
            <TabsContent value="especificacoes" className="pt-4">
              <ul className="list-disc pl-5 space-y-2">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="avaliacoes" className="pt-4">
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">5.0 (3 avaliações)</span>
                </div>
                
                <div className="border-t pt-6">
                  <p className="italic text-gray-500">Ainda não há avaliações para este produto. Seja o primeiro a avaliar!</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-geek-secondary">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Product Cards would go here */}
            {/* For now showing just placeholder */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;
