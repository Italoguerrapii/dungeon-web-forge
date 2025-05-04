
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Product, getBestsellerProducts } from '@/lib/mock-data';
import { useAuth } from '@/hooks/use-auth';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, PackageOpen, Store, Truck, Users } from 'lucide-react';

const WholesalePage = () => {
  const { isAuthenticated, user } = useAuth();
  const isReseller = isAuthenticated && user?.isReseller;
  const bestSellingProducts = getBestsellerProducts();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-800 py-16 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-gradient bg-gradient-to-r from-geek-primary via-geek-accent to-geek-flame bg-clip-text text-transparent">
                Seja um Revendedor GeekDungeon
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Aumente seus lucros revendendo nossos produtos de alta qualidade para o mercado geek. Preços especiais, suporte exclusivo e muito mais.
              </p>
              {isReseller ? (
                <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 inline-flex items-center">
                  <CheckCircle className="text-green-400 mr-2" />
                  <span className="text-green-400">Você já é um revendedor cadastrado!</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-geek-primary hover:bg-geek-accent text-white text-lg py-6 px-8">
                    <Link to="/cadastro?tipo=revendedor">Quero ser Revendedor</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-400 text-white hover:bg-gray-700 text-lg py-6 px-8">
                    <Link to="/contato?assunto=revenda">Falar com Consultor</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading mb-12 text-white text-center">
              Vantagens para Revendedores
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-geek-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-geek-primary/20 flex items-center justify-center mb-4">
                  <Store className="text-geek-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Preços Especiais</h3>
                <p className="text-gray-400">Acesso a descontos exclusivos para aumentar sua margem de lucro.</p>
              </div>
              
              {/* Benefit 2 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-geek-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-geek-primary/20 flex items-center justify-center mb-4">
                  <PackageOpen className="text-geek-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Sem Estoque Mínimo</h3>
                <p className="text-gray-400">Você escolhe a quantidade que deseja comprar, sem pedido mínimo.</p>
              </div>
              
              {/* Benefit 3 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-geek-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-geek-primary/20 flex items-center justify-center mb-4">
                  <Truck className="text-geek-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Entrega Rápida</h3>
                <p className="text-gray-400">Envio prioritário para revendedores em todo o Brasil.</p>
              </div>
              
              {/* Benefit 4 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-geek-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-geek-primary/20 flex items-center justify-center mb-4">
                  <Users className="text-geek-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Suporte Exclusivo</h3>
                <p className="text-gray-400">Contato direto com nossa equipe para tirar dúvidas e resolver problemas.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wholesale Pricing Section */}
        <div className="py-16 bg-gray-800 border-t border-b border-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading mb-4 text-white text-center">
              Tabela de Preços para Atacado
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Nossos preços variam conforme a quantidade adquirida. Quanto mais você compra, maior o seu desconto.
              {!isReseller && " Cadastre-se como revendedor para ver todos os preços especiais."}
            </p>
            
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableCaption>
                  {isReseller ? 
                    "Tabela de preços exclusiva para revendedores." : 
                    "Cadastre-se como revendedor para ver preços completos."}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Produto</TableHead>
                    <TableHead className="text-white text-right">Varejo</TableHead>
                    <TableHead className="text-white text-right">5 a 10 unidades</TableHead>
                    <TableHead className="text-white text-right">11 a 20 unidades</TableHead>
                    {isReseller && <TableHead className="text-white text-right">21+ unidades</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestSellingProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium text-gray-300">
                        <Link to={`/produto/${product.slug}`} className="hover:text-geek-primary">
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right text-gray-300">R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-gray-300">
                        R$ {(product.price * 0.9).toFixed(2)}
                        <span className="ml-1 text-green-400 text-xs">-10%</span>
                      </TableCell>
                      <TableCell className="text-right text-gray-300">
                        R$ {(product.price * 0.85).toFixed(2)}
                        <span className="ml-1 text-green-400 text-xs">-15%</span>
                      </TableCell>
                      {isReseller && (
                        <TableCell className="text-right text-gray-300">
                          R$ {(product.price * 0.75).toFixed(2)}
                          <span className="ml-1 text-green-400 text-xs">-25%</span>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {!isReseller && (
              <div className="mt-8 text-center">
                <Button asChild className="bg-geek-primary hover:bg-geek-accent text-white">
                  <Link to="/cadastro?tipo=revendedor">Cadastre-se como Revendedor</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading mb-12 text-white text-center">
              Perguntas Frequentes sobre Revenda
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-geek-primary">
                    Como me tornar um revendedor?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Para se tornar um revendedor GeekDungeon, basta fazer um cadastro em nosso site 
                    selecionando a opção "Quero ser Revendedor". Após a aprovação do cadastro, você 
                    terá acesso imediato aos preços especiais e vantagens exclusivas.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-geek-primary">
                    Existe um pedido mínimo para revendedores?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Não exigimos um pedido mínimo para revendedores. No entanto, os descontos 
                    são progressivos e variam conforme a quantidade adquirida. Quanto maior o 
                    volume de compra, melhor o preço unitário.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-geek-primary">
                    Como funciona o frete para revendedores?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Revendedores têm prioridade de envio e, para pedidos maiores, oferecemos 
                    condições especiais de frete. Pedidos acima de R$ 2.000,00 têm frete grátis 
                    para todo o Brasil. Para mais detalhes, entre em contato com nossa equipe de suporte.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-geek-primary">
                    É necessário ter CNPJ para ser revendedor?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Ter um CNPJ é recomendado, mas não obrigatório para iniciar como revendedor. 
                    No entanto, para acessar alguns benefícios fiscais e melhores condições de frete, 
                    o CNPJ será necessário. Nossa equipe pode orientar você sobre como proceder 
                    em cada caso.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-geek-primary">
                    É possível personalizar produtos para revenda?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Sim! Oferecemos serviços de personalização para revendedores, incluindo 
                    embalagens e detalhes específicos. Para lotes maiores, podemos desenvolver 
                    produtos exclusivos para sua marca. Entre em contato com nossa equipe comercial 
                    para mais informações.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading mb-6 text-white">
                Pronto para aumentar seus lucros?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Junte-se ao nosso programa de revendedores e comece a oferecer produtos GeekDungeon para seus clientes.
              </p>
              
              {isReseller ? (
                <Tabs defaultValue="catalog" className="w-full max-w-md mx-auto">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                    <TabsTrigger value="catalog">Ver Catálogo</TabsTrigger>
                    <TabsTrigger value="contact">Falar com Consultor</TabsTrigger>
                  </TabsList>
                  <TabsContent value="catalog" className="mt-4">
                    <Button asChild className="w-full bg-geek-primary hover:bg-geek-accent text-white py-6">
                      <Link to="/produtos">Ver Catálogo Completo</Link>
                    </Button>
                  </TabsContent>
                  <TabsContent value="contact" className="mt-4">
                    <Button asChild className="w-full bg-geek-primary hover:bg-geek-accent text-white py-6">
                      <Link to="/contato?assunto=revenda">Falar com Consultor</Link>
                    </Button>
                  </TabsContent>
                </Tabs>
              ) : (
                <Button asChild className="bg-geek-primary hover:bg-geek-accent text-white text-lg py-6 px-8">
                  <Link to="/cadastro?tipo=revendedor">Começar Agora</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WholesalePage;
