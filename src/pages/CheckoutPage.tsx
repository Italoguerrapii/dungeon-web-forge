
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from '@/hooks/use-cart';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  ShoppingBag,
  Truck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  QrCode,
  Receipt,
  Home,
  MapPin,
  X
} from "lucide-react";

// Esquema de validação do formulário de endereço
const addressFormSchema = z.object({
  cep: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  street: z.string().min(3, "Endereço muito curto"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
});

// Esquema de validação do formulário de pagamento
const paymentFormSchema = z.object({
  paymentType: z.enum(["credit", "boleto", "pix"]),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

// Tipos derivados dos esquemas zod
type AddressFormValues = z.infer<typeof addressFormSchema>;
type PaymentFormValues = z.infer<typeof paymentFormSchema>;

// Interface para os valores do frete
interface ShippingOption {
  id: string;
  name: string;
  price: number;
  days: string;
  selected: boolean;
}

const CheckoutPage = () => {
  const { toast } = useToast();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<"address" | "shipping" | "payment" | "summary">("address");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Formulário de endereço usando react-hook-form com validação zod
  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    }
  });

  // Formulário de pagamento usando react-hook-form com validação zod
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentType: "credit",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    }
  });

  // Estado para endereço
  const [addressData, setAddressData] = useState({
    cep: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    number: "",
    complement: ""
  });

  // Estado para pagamento
  const [paymentData, setPaymentData] = useState({
    method: "credit",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: ""
  });

  // Verificar CEP e buscar endereço
  const handleCepSearch = async (cep: string) => {
    if (cep.length < 8) return;

    setIsSearchingCep(true);

    // Simulação de busca de CEP
    setTimeout(() => {
      // Exemplo de dados fictícios
      const mockAddressData = {
        street: "Avenida Paulista",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP"
      };

      addressForm.setValue("street", mockAddressData.street);
      addressForm.setValue("neighborhood", mockAddressData.neighborhood);
      addressForm.setValue("city", mockAddressData.city);
      addressForm.setValue("state", mockAddressData.state);
      
      setIsAddressValid(true);
      setIsSearchingCep(false);
      
      // Gerar opções de frete quando CEP é validado
      generateShippingOptions();

      toast({
        title: "CEP encontrado",
        description: "Endereço preenchido automaticamente",
      });
    }, 1000);
  };

  // Gerar opções de frete baseadas no CEP
  const generateShippingOptions = () => {
    setShippingOptions([
      { 
        id: "sedex", 
        name: "SEDEX", 
        price: 25.90, 
        days: "2 dias úteis", 
        selected: false 
      },
      { 
        id: "pac", 
        name: "PAC", 
        price: 15.90, 
        days: "7 dias úteis", 
        selected: false 
      },
      { 
        id: "transportadora", 
        name: "Transportadora", 
        price: 19.90, 
        days: "4 dias úteis", 
        selected: false 
      }
    ]);
  };

  // Selecionar opção de frete
  const handleSelectShipping = (shippingId: string) => {
    setSelectedShipping(shippingId);
    setShippingOptions(shippingOptions.map(option => ({
      ...option,
      selected: option.id === shippingId
    })));
  };

  // Avançar para a próxima etapa
  const handleNextStep = () => {
    if (currentStep === "address") {
      addressForm.handleSubmit((data) => {
        setAddressData({
          cep: data.cep,
          street: data.street,
          number: data.number,
          complement: data.complement || "",
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
        });
        setCurrentStep("shipping");
      })();
    } else if (currentStep === "shipping") {
      if (!selectedShipping) {
        toast({
          title: "Selecione uma opção de frete",
          description: "Por favor, escolha uma opção de frete para continuar.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      paymentForm.handleSubmit((data) => {
        setPaymentData({
          method: data.paymentType,
          cardName: data.cardName || "",
          cardNumber: data.cardNumber || "",
          cardExpiry: data.cardExpiry || "",
          cardCvv: data.cardCvv || "",
        });
        setCurrentStep("summary");
      })();
    } else if (currentStep === "summary") {
      processPayment();
    }
  };

  // Processar pagamento
  const processPayment = () => {
    setIsLoading(true);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsLoading(false);
      setOrderComplete(true);
      setOrderId(`GK${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();

      toast({
        title: "Pedido confirmado!",
        description: "Seu pedido foi processado com sucesso",
      });
    }, 2000);
  };

  // Voltar para a etapa anterior
  const handlePreviousStep = () => {
    if (currentStep === "shipping") setCurrentStep("address");
    else if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "summary") setCurrentStep("payment");
  };

  // Calcular o total com frete
  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const shippingCost = selectedShippingOption ? selectedShippingOption.price : 0;
  const totalWithShipping = total + shippingCost;

  // Formatar preço
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Verificar se há itens no carrinho
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="bg-gray-800 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-300 mb-6">
              Parece que você ainda não adicionou nenhum produto ao carrinho.
            </p>
            <Button 
              className="bg-geek-primary hover:bg-geek-accent text-white"
              onClick={() => navigate('/produtos')}
            >
              Explorar Produtos
            </Button>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Página de agradecimento quando o pedido estiver completo
  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-geek-primary/20 mb-4">
                <CheckCircle2 className="h-10 w-10 text-geek-primary" />
              </div>
              <h1 className="text-3xl font-bold text-white">Pedido Concluído!</h1>
              <p className="text-gray-300 mt-2">
                Seu pedido foi processado com sucesso.
              </p>
              <div className="mt-4 mb-6">
                <span className="text-gray-400">Número do pedido:</span>
                <span className="font-mono text-geek-primary text-xl ml-2">{orderId}</span>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Frete:</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <Separator className="my-3 bg-gray-700" />
                <div className="flex justify-between text-white font-medium">
                  <span>Total:</span>
                  <span className="text-geek-primary text-xl">{formatPrice(totalWithShipping)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900/50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-geek-primary mr-2" />
                  <h3 className="text-lg font-medium text-white">Endereço de entrega</h3>
                </div>
                <div className="text-gray-300 space-y-1">
                  <p>{addressData.street}, {addressData.number}</p>
                  {addressData.complement && <p>{addressData.complement}</p>}
                  <p>{addressData.neighborhood}</p>
                  <p>{addressData.city} - {addressData.state}</p>
                  <p>CEP: {addressData.cep}</p>
                </div>
              </div>

              <div className="bg-gray-900/50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <CreditCard className="h-5 w-5 text-geek-primary mr-2" />
                  <h3 className="text-lg font-medium text-white">Forma de pagamento</h3>
                </div>
                <div className="text-gray-300">
                  {paymentData.method === 'credit' && <p>Cartão de crédito</p>}
                  {paymentData.method === 'boleto' && <p>Boleto bancário</p>}
                  {paymentData.method === 'pix' && <p>PIX</p>}
                  {selectedShippingOption && (
                    <p className="mt-3">Entrega: {selectedShippingOption.name} ({selectedShippingOption.days})</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-geek-primary/10 border border-geek-primary/20 rounded-lg p-5 mb-6">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-5 w-5 text-geek-primary mr-2" />
                <h3 className="text-lg font-medium text-white">Informações importantes</h3>
              </div>
              <ul className="text-gray-300 list-disc list-inside space-y-1">
                <li>Você receberá um e-mail com os detalhes do seu pedido</li>
                <li>Você pode acompanhar o status na área "Minha Conta"</li>
                <li>Em caso de dúvidas, entre em contato conosco</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-geek-primary hover:bg-geek-accent text-white"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Voltar para a Home
              </Button>
              <Button
                variant="outline"
                className="border-geek-primary text-geek-primary hover:bg-geek-primary hover:text-white"
                onClick={() => navigate('/minha-conta/pedidos')}
              >
                Meus Pedidos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
            
            {/* Progress Steps */}
            <div className="flex mb-8">
              <div className={`flex-1 text-center border-b-2 pb-2 ${currentStep === 'address' ? 'border-geek-primary text-geek-primary' : 'border-gray-700 text-gray-500'}`}>
                <span className="font-semibold">1. Endereço</span>
              </div>
              <div className={`flex-1 text-center border-b-2 pb-2 ${currentStep === 'shipping' ? 'border-geek-primary text-geek-primary' : 'border-gray-700 text-gray-500'}`}>
                <span className="font-semibold">2. Frete</span>
              </div>
              <div className={`flex-1 text-center border-b-2 pb-2 ${currentStep === 'payment' ? 'border-geek-primary text-geek-primary' : 'border-gray-700 text-gray-500'}`}>
                <span className="font-semibold">3. Pagamento</span>
              </div>
              <div className={`flex-1 text-center border-b-2 pb-2 ${currentStep === 'summary' ? 'border-geek-primary text-geek-primary' : 'border-gray-700 text-gray-500'}`}>
                <span className="font-semibold">4. Finalizar</span>
              </div>
            </div>

            {/* Address Form */}
            {currentStep === 'address' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-geek-primary" />
                    Endereço de Entrega
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Preencha com o endereço onde deseja receber seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...addressForm}>
                    <form className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={addressForm.control}
                          name="cep"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-200">CEP</FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input
                                    placeholder="00000-000"
                                    className="bg-gray-700 border-gray-600 text-white"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      if (e.target.value.length === 8 || e.target.value.length === 9) {
                                        handleCepSearch(e.target.value);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <Button 
                                  type="button" 
                                  variant="secondary"
                                  className="whitespace-nowrap"
                                  onClick={() => handleCepSearch(field.value)}
                                  disabled={isSearchingCep || field.value.length < 8}
                                >
                                  {isSearchingCep ? (
                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                  ) : "Buscar CEP"}
                                </Button>
                              </div>
                              <FormMessage className="text-red-400" />
                              <FormDescription className="text-gray-400 text-xs">
                                Digite apenas números
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={addressForm.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-200">Rua</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nome da sua rua"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={addressForm.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem className="sm:w-1/3">
                              <FormLabel className="text-gray-200">Número</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addressForm.control}
                          name="complement"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-200">Complemento</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Apto 101, Bloco B (opcional)"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={addressForm.control}
                          name="neighborhood"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-200">Bairro</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Seu bairro"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-200">Cidade</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Sua cidade"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="sm:w-1/4">
                              <FormLabel className="text-gray-200">Estado</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="UF"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  maxLength={2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Shipping Options */}
            {currentStep === 'shipping' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-geek-primary" />
                    Opções de Frete
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Escolha como deseja receber seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {shippingOptions.length > 0 ? (
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => handleSelectShipping(option.id)}
                          className={`p-4 rounded-lg cursor-pointer flex items-center justify-between transition-all
                            ${option.selected ? 'bg-geek-primary/20 border border-geek-primary' : 'bg-gray-700 border border-gray-600 hover:border-gray-500'}
                          `}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${option.selected ? 'border-geek-primary' : 'border-gray-500'}`}>
                              {option.selected && <div className="w-3 h-3 rounded-full bg-geek-primary"></div>}
                            </div>
                            <div>
                              <div className="font-medium text-white">{option.name}</div>
                              <div className="text-sm text-gray-400">Entrega em {option.days}</div>
                            </div>
                          </div>
                          <div className="font-semibold text-white">{formatPrice(option.price)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert className="bg-red-900/20 border-red-900">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-400">
                        Por favor, volte e preencha um CEP válido para calcular o frete.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Payment Form */}
            {currentStep === 'payment' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-geek-primary" />
                    Forma de Pagamento
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Escolha como deseja pagar seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...paymentForm}>
                    <form className="space-y-6">
                      <FormField
                        control={paymentForm.control}
                        name="paymentType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                <Tabs value={field.value} className="w-full">
                                  <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                                    <TabsTrigger 
                                      value="credit" 
                                      className="data-[state=active]:bg-geek-primary data-[state=active]:text-white"
                                      onClick={() => field.onChange("credit")}
                                    >
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      Cartão
                                    </TabsTrigger>
                                    <TabsTrigger 
                                      value="boleto" 
                                      className="data-[state=active]:bg-geek-primary data-[state=active]:text-white"
                                      onClick={() => field.onChange("boleto")}
                                    >
                                      <Receipt className="mr-2 h-4 w-4" />
                                      Boleto
                                    </TabsTrigger>
                                    <TabsTrigger 
                                      value="pix" 
                                      className="data-[state=active]:bg-geek-primary data-[state=active]:text-white"
                                      onClick={() => field.onChange("pix")}
                                    >
                                      <QrCode className="mr-2 h-4 w-4" />
                                      PIX
                                    </TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="credit" className="mt-4 bg-gray-700 rounded-lg p-4">
                                    <div className="space-y-4">
                                      <FormField
                                        control={paymentForm.control}
                                        name="cardName"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-gray-200">Nome no cartão</FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Nome como está no cartão"
                                                className="bg-gray-600 border-gray-500 text-white"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                          </FormItem>
                                        )}
                                      />
                                      
                                      <FormField
                                        control={paymentForm.control}
                                        name="cardNumber"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-gray-200">Número do cartão</FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="0000 0000 0000 0000"
                                                className="bg-gray-600 border-gray-500 text-white"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                          </FormItem>
                                        )}
                                      />
                                      
                                      <div className="flex gap-4">
                                        <FormField
                                          control={paymentForm.control}
                                          name="cardExpiry"
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormLabel className="text-gray-200">Data de expiração</FormLabel>
                                              <FormControl>
                                                <Input
                                                  placeholder="MM/AA"
                                                  className="bg-gray-600 border-gray-500 text-white"
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage className="text-red-400" />
                                            </FormItem>
                                          )}
                                        />
                                        
                                        <FormField
                                          control={paymentForm.control}
                                          name="cardCvv"
                                          render={({ field }) => (
                                            <FormItem className="flex-1">
                                              <FormLabel className="text-gray-200">CVV</FormLabel>
                                              <FormControl>
                                                <Input
                                                  placeholder="123"
                                                  className="bg-gray-600 border-gray-500 text-white"
                                                  maxLength={4}
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage className="text-red-400" />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="boleto" className="mt-4 bg-gray-700 rounded-lg p-4">
                                    <div className="text-center p-4">
                                      <Receipt className="h-12 w-12 text-geek-primary mx-auto mb-4" />
                                      <h3 className="text-lg font-medium text-white mb-2">Pagamento via Boleto</h3>
                                      <p className="text-gray-300 mb-4">
                                        Após a finalização do pedido, você receberá o boleto para pagamento.
                                      </p>
                                      <ul className="text-gray-300 text-sm space-y-1 text-left">
                                        <li>• O boleto vence em 3 dias úteis</li>
                                        <li>• O pedido será enviado após a confirmação do pagamento</li>
                                        <li>• A confirmação pode levar até 2 dias úteis</li>
                                      </ul>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="pix" className="mt-4 bg-gray-700 rounded-lg p-4">
                                    <div className="text-center p-4">
                                      <QrCode className="h-12 w-12 text-geek-primary mx-auto mb-4" />
                                      <h3 className="text-lg font-medium text-white mb-2">Pagamento via PIX</h3>
                                      <p className="text-gray-300 mb-4">
                                        Após a finalização do pedido, você receberá as informações para pagamento.
                                      </p>
                                      <ul className="text-gray-300 text-sm space-y-1 text-left">
                                        <li>• Pagamento instantâneo</li>
                                        <li>• O pedido será processado imediatamente após o pagamento</li>
                                        <li>• O QR Code vence em 30 minutos</li>
                                      </ul>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Order Summary and Confirm */}
            {currentStep === 'summary' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-geek-primary" />
                    Confirmação do Pedido
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Revise os detalhes do seu pedido antes de finalizar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-medium flex items-center">
                          <MapPin className="h-4 w-4 text-geek-primary mr-2" /> 
                          Endereço de Entrega
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-gray-400 hover:text-white"
                          onClick={() => setCurrentStep("address")}
                        >
                          Editar
                        </Button>
                      </div>
                      <div className="text-gray-300 text-sm">
                        <p>{addressData.street}, {addressData.number}</p>
                        {addressData.complement && <p>{addressData.complement}</p>}
                        <p>{addressData.neighborhood}</p>
                        <p>{addressData.city} - {addressData.state}</p>
                        <p>CEP: {addressData.cep}</p>
                      </div>
                    </div>
                    
                    {/* Shipping Method */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-medium flex items-center">
                          <Truck className="h-4 w-4 text-geek-primary mr-2" /> 
                          Método de Entrega
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-gray-400 hover:text-white"
                          onClick={() => setCurrentStep("shipping")}
                        >
                          Editar
                        </Button>
                      </div>
                      <div className="text-gray-300 text-sm">
                        {selectedShippingOption && (
                          <p>{selectedShippingOption.name} - {selectedShippingOption.days} - {formatPrice(selectedShippingOption.price)}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-medium flex items-center">
                          <CreditCard className="h-4 w-4 text-geek-primary mr-2" /> 
                          Forma de Pagamento
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-gray-400 hover:text-white"
                          onClick={() => setCurrentStep("payment")}
                        >
                          Editar
                        </Button>
                      </div>
                      <div className="text-gray-300 text-sm">
                        {paymentData.method === 'credit' && (
                          <p>Cartão de crédito terminado em {paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : '****'}</p>
                        )}
                        {paymentData.method === 'boleto' && (
                          <p>Boleto bancário</p>
                        )}
                        {paymentData.method === 'pix' && (
                          <p>PIX - Pagamento instantâneo</p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium">Itens do Pedido</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-gray-400 hover:text-white"
                          onClick={() => navigate("/carrinho")}
                        >
                          Editar
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="h-12 w-12 bg-gray-600 rounded overflow-hidden mr-4">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-white text-sm">{item.name}</p>
                              <div className="flex justify-between text-sm text-gray-400">
                                <span>Qtd: {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              {currentStep !== 'address' && (
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Voltar
                </Button>
              )}
              
              {currentStep === 'address' && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/carrinho')}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Voltar ao Carrinho
                </Button>
              )}
              
              <Button
                onClick={handleNextStep}
                className="bg-geek-primary hover:bg-geek-accent text-white ml-auto"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentStep === 'summary' ? 'Finalizar Pedido' : 'Continuar'}
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full md:w-96 shrink-0">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 sticky top-28">
              <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-12 w-12 bg-gray-700 rounded overflow-hidden mr-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-white text-sm line-clamp-1">{item.name}</p>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Qtd: {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4 bg-gray-700" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Frete:</span>
                  {selectedShippingOption ? (
                    <span>{formatPrice(selectedShippingOption.price)}</span>
                  ) : (
                    <span>Calcular</span>
                  )}
                </div>
                
                <Separator className="my-3 bg-gray-700" />
                
                <div className="flex justify-between text-white font-medium">
                  <span>Total:</span>
                  <span className="text-geek-primary text-xl">{formatPrice(totalWithShipping)}</span>
                </div>
              </div>
              
              <div className="mt-6 bg-geek-primary/10 border border-geek-primary/20 rounded-md p-4">
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 text-geek-primary mr-2" />
                  Informações
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Este é um ambiente de testes</li>
                  <li>• Nenhum pagamento real será processado</li>
                  <li>• Todos os dados são apenas simulados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CheckoutPage;
