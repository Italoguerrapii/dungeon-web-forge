
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { Trash2, ShoppingCart, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) quantity = 1;
    updateQuantity(id, quantity);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 font-heading flex items-center">
          <ShoppingCart className="mr-3 h-8 w-8 text-geek-primary" />
          Carrinho
        </h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-900/50">
                      <TableHead className="text-white">Produto</TableHead>
                      <TableHead className="text-white text-right">Quantidade</TableHead>
                      <TableHead className="text-white text-right">Preço</TableHead>
                      <TableHead className="text-white text-right">Subtotal</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id} className="border-gray-700">
                        <TableCell className="font-medium text-gray-300">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded" 
                            />
                            <div>
                              <div className="text-white font-medium hover:text-geek-primary">
                                <Link to={`/produto/${item.id}`}>{item.name}</Link>
                              </div>
                              {item.variations && item.variations.map((variation) => (
                                <div key={variation.type} className="text-xs text-gray-400">
                                  {variation.type}: {variation.selected}
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="inline-flex items-center rounded-md border border-gray-700">
                              <Button
                                variant="ghost"
                                className="h-8 w-8 rounded-none text-gray-400 hover:bg-gray-700"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <span className="px-3 text-center text-sm text-white">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 rounded-none text-gray-400 hover:bg-gray-700"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-gray-300">
                          R$ {item.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-white font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-transparent"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="border-gray-700 bg-gray-900/40">
                      <TableCell colSpan={3} className="text-right text-gray-300">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold text-geek-primary text-lg">
                        R$ {total.toFixed(2)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  className="border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white"
                  onClick={() => navigate('/produtos')}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Continuar Comprando
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal ({itemCount} itens)</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Frete</span>
                    <span>Calculado no checkout</span>
                  </div>
                  
                  <Separator className="my-4 bg-gray-700" />
                  
                  <div className="flex justify-between text-white font-medium">
                    <span>Total</span>
                    <span className="text-geek-primary text-xl">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6 bg-geek-primary hover:bg-geek-accent text-white py-6"
                  onClick={() => navigate('/checkout')}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Finalizar Compra
                </Button>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium text-white">Cupom de Desconto</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Código do cupom"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-geek-primary/10 border border-geek-primary/20 rounded-lg p-4">
                <h3 className="font-medium text-white flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-geek-primary" />
                  Vantagens de comprar na GeekDungeon
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-geek-accent">•</span>
                    Produtos de alta qualidade
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-geek-accent">•</span>
                    Entrega rápida para todo Brasil
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-geek-accent">•</span>
                    Pagamento seguro
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-geek-accent">•</span>
                    Produtos exclusivos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-500" />
            </div>
            <h2 className="text-2xl font-medium text-white mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-400 mb-6">
              Parece que você ainda não adicionou nenhum produto ao carrinho.
            </p>
            <Button 
              className="bg-geek-primary hover:bg-geek-accent text-white"
              onClick={() => navigate('/produtos')}
            >
              Explorar Produtos
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;
