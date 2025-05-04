
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, HelpCircle, FileText, Search } from 'lucide-react';

const FAQPage = () => {
  const location = useLocation();
  const isHowToBuyPage = location.pathname === '/como-comprar';

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-gray-900 to-geek-dark py-16 border-b border-gray-700">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {isHowToBuyPage ? "Como Comprar" : "Perguntas Frequentes"}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {isHowToBuyPage 
                ? "Guia completo para fazer suas compras em nossa loja de forma fácil e segura." 
                : "Respostas para as dúvidas mais comuns sobre nossa loja e produtos."}
            </p>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-gray-800 py-10 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="flex-1 px-4">
                <input
                  type="text"
                  placeholder="Buscar pergunta..."
                  className="w-full bg-transparent text-gray-200 py-3 focus:outline-none"
                />
              </div>
              <Button className="bg-geek-primary hover:bg-geek-accent text-white rounded-none px-6 h-14">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </div>
          </div>
        </div>
        
        {/* FAQ Content */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Categorias</h3>
                  <ul className="space-y-2">
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-gray-300 hover:text-geek-primary hover:bg-gray-700/50"
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Perguntas Gerais
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-gray-300 hover:text-geek-primary hover:bg-gray-700/50"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Pedidos e Pagamentos
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-gray-300 hover:text-geek-primary hover:bg-gray-700/50"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Envio e Entrega
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-gray-300 hover:text-geek-primary hover:bg-gray-700/50"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Trocas e Devoluções
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-gray-300 hover:text-geek-primary hover:bg-gray-700/50"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Para Revendedores
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* FAQ Accordion */}
              <div className="lg:col-span-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-geek-primary text-xl py-6">
                      Como faço um pedido no site?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-base px-2">
                      <ol className="list-decimal list-inside space-y-4 pl-2">
                        <li>Escolha o produto desejado e clique nele para ver mais detalhes</li>
                        <li>Selecione as opções disponíveis (se houver) e a quantidade desejada</li>
                        <li>Clique no botão "Adicionar ao Carrinho"</li>
                        <li>Vá para o carrinho clicando no ícone de carrinho no topo do site</li>
                        <li>Confira os itens e clique em "Finalizar Compra"</li>
                        <li>Preencha seus dados de entrega e escolha a forma de pagamento</li>
                        <li>Confirme seu pedido e pronto!</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-geek-primary text-xl py-6">
                      Quais são as formas de pagamento aceitas?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-base px-2">
                      <p className="mb-4">
                        Aceitamos diversas formas de pagamento para sua conveniência:
                      </p>
                      <ul className="list-disc list-inside space-y-2 pl-2">
                        <li>Cartões de crédito (parcelamento em até 12x)</li>
                        <li>Cartões de débito</li>
                        <li>PIX (com 5% de desconto)</li>
                        <li>Boleto bancário</li>
                        <li>PayPal</li>
                      </ul>
                      <p className="mt-4 text-geek-primary">
                        Para revendedores cadastrados, oferecemos opções adicionais de pagamento e faturamento.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-geek-primary text-xl py-6">
                      Como funciona o frete e prazo de entrega?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-base px-2">
                      <p>
                        O frete é calculado automaticamente na finalização do pedido, com base no seu CEP e no peso/volume dos produtos. Trabalhamos com as seguintes transportadoras:
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-4 pl-2">
                        <li>Correios (PAC e SEDEX)</li>
                        <li>Transportadoras privadas</li>
                      </ul>
                      <p className="mt-4">
                        O prazo de entrega varia conforme a região, mas geralmente fica entre 3 a 15 dias úteis após a confirmação do pagamento.
                      </p>
                      <p className="mt-4 font-medium text-geek-primary">
                        Oferecemos frete grátis para compras acima de R$ 299,00!
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-geek-primary text-xl py-6">
                      Qual a política de trocas e devoluções?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-base px-2">
                      <p>
                        Você tem até 7 dias após o recebimento do produto para solicitar a devolução por arrependimento de compra, conforme o Código de Defesa do Consumidor.
                      </p>
                      <p className="mt-4">
                        Para produtos com defeito, o prazo é de 30 dias para produtos não duráveis e 90 dias para produtos duráveis.
                      </p>
                      <p className="mt-4">
                        Para solicitar uma troca ou devolução:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 mt-2 pl-2">
                        <li>Entre em contato com nosso atendimento</li>
                        <li>Informe o número do pedido e o motivo da troca/devolução</li>
                        <li>Aguarde instruções sobre como proceder com o envio</li>
                        <li>Envie o produto na embalagem original sempre que possível</li>
                      </ol>
                      <p className="mt-4">
                        <Link to="/politica-de-trocas" className="text-geek-primary hover:underline">
                          Leia nossa política completa de trocas e devoluções
                        </Link>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-geek-primary text-xl py-6">
                      Como me tornar um revendedor?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-base px-2">
                      <p>
                        Para se tornar um revendedor autorizado, siga os passos:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 mt-4 pl-2">
                        <li>Acesse a página de <Link to="/cadastro?tipo=revendedor" className="text-geek-primary hover:underline">cadastro de revendedor</Link></li>
                        <li>Preencha o formulário com seus dados e informações comerciais</li>
                        <li>Envie a documentação necessária (CNPJ, contrato social, etc.)</li>
                        <li>Aguarde a análise e aprovação do seu cadastro (prazo de até 24h úteis)</li>
                        <li>Após aprovado, você terá acesso ao catálogo com preços especiais para revenda</li>
                      </ol>
                      <p className="mt-4">
                        <Link to="/revenda" className="text-geek-primary hover:underline">
                          Saiba mais sobre nosso programa de revendas
                        </Link>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="bg-gray-800 py-16 border-t border-gray-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para responder todas as suas dúvidas e auxiliar na sua compra.
            </p>
            <Button asChild className="bg-geek-primary hover:bg-geek-accent text-white px-8 py-6 text-lg">
              <Link to="/contato">
                Fale Conosco
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FAQPage;
