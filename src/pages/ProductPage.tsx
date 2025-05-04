
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2, Star, TruckIcon, Package, Shield, ArrowRight } from 'lucide-react';

const productData = {
  'playstation-5': {
    id: 1,
    name: 'PlayStation 5',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2080',
    price: 4499.90,
    discount: 4999.90,
    category: 'Games',
    description: 'Console PlayStation 5 da Sony com controle DualSense, SSD ultra-rápido e gráficos impressionantes.',
    specs: [
      'CPU AMD Zen 2 8 núcleos / 16 threads',
      'GPU AMD RDNA 2 10.3 teraflops',
      'RAM 16GB GDDR6',
      'Armazenamento SSD 825GB',
      'Ray Tracing',
      'Saída 4K e 8K'
    ],
    stock: 5,
    rating: 5
  },
  'action-figure-thor': {
    id: 2,
    name: 'Action Figure Thor',
    image: 'https://images.unsplash.com/photo-1608278047522-58806a6ac8ec?q=80&w=2080',
    price: 299.90,
    discount: null,
    category: 'Action Figures',
    description: 'Action Figure do Thor com detalhes incríveis, baseado no filme Thor: Ragnarok. Material de alta qualidade e articulações realistas.',
    specs: [
      'Altura: 30cm',
      'Material: PVC',
      'Articulado',
      'Base inclusa',
      'Itens: Martelo Mjolnir e Stormbreaker'
    ],
    stock: 12,
    rating: 4
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
  const product = slug ? productData[slug as keyof typeof productData] : null;
  
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
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-gray-900 to-geek-dark py-6">
          <div className="container mx-auto px-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-400">
                <li><a href="/" className="hover:text-geek-accent">Home</a></li>
                <li><span className="mx-1">/</span></li>
                <li><a href="/categorias" className="hover:text-geek-accent">Categorias</a></li>
                <li><span className="mx-1">/</span></li>
                <li><a href={`/categoria/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-geek-accent">{product.category}</a></li>
                <li><span className="mx-1">/</span></li>
                <li className="text-geek-primary">{product.name}</li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-gray-800 rounded-xl p-6 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            
            {/* Product Details */}
            <div>
              <span className="inline-block px-3 py-1 bg-geek-primary/20 text-geek-primary rounded-full mb-2 font-medium">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < product.rating ? 'text-geek-accent fill-geek-accent' : 'text-gray-500'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-400">(120 avaliações)</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-geek-accent font-bold text-3xl">
                    {formatPrice(product.price)}
                  </span>
                  {product.discount && (
                    <span className="text-gray-400 text-lg line-through">
                      {formatPrice(product.discount)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="inline-block px-2 py-1 bg-geek-flame text-white text-sm font-bold rounded-md">
                    {Math.round((1 - product.price/product.discount) * 100)}% OFF
                  </span>
                )}
                <p className="text-gray-400 mt-2">À vista no PIX</p>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Descrição:</h3>
                <p className="text-gray-300">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-gray-300 mb-2">
                  <TruckIcon className="w-5 h-5 mr-2 text-geek-primary" />
                  <span>Frete grátis para compras acima de R$ 299,00</span>
                </div>
                <div className="flex items-center text-gray-300 mb-2">
                  <Package className="w-5 h-5 mr-2 text-geek-primary" />
                  <span>Disponível em estoque: {product.stock} unidades</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Shield className="w-5 h-5 mr-2 text-geek-primary" />
                  <span>Garantia de 12 meses</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button className="bg-geek-primary hover:bg-geek-secondary text-white h-12 text-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
                </Button>
                <Button variant="outline" className="border-geek-accent text-geek-accent hover:bg-geek-accent hover:text-white h-12 text-lg">
                  <Heart className="mr-2 h-5 w-5" /> Lista de Desejos
                </Button>
              </div>
              
              <div className="mt-4">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  <Share2 className="mr-2 h-5 w-5" /> Compartilhar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <Tabs defaultValue="specifications" className="mb-16">
            <TabsList className="w-full bg-gray-800 mb-6">
              <TabsTrigger value="specifications" className="flex-1 text-lg data-[state=active]:bg-geek-primary data-[state=active]:text-white">
                Especificações
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 text-lg data-[state=active]:bg-geek-primary data-[state=active]:text-white">
                Avaliações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specifications">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <ul className="divide-y divide-gray-700">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="py-3 flex items-center">
                        <ArrowRight className="h-4 w-4 text-geek-primary mr-3" />
                        <span className="text-gray-200">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">Nenhuma avaliação disponível ainda.</p>
                    <Button className="bg-geek-primary hover:bg-geek-secondary text-white">
                      Seja o primeiro a avaliar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;
