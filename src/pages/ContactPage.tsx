
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Responderemos em breve!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-geek-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 font-heading">Entre em Contato</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Estamos aqui para ajudar. Preencha o formulário abaixo ou use um dos nossos canais de contato.
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-geek-secondary font-heading">Envie uma Mensagem</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <Input id="email" type="email" placeholder="seuemail@exemplo.com" required />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Assunto
                    </label>
                    <Input id="subject" placeholder="Assunto da mensagem" required />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Escreva sua mensagem aqui..." 
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="bg-geek-primary hover:bg-geek-secondary w-full py-6">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-geek-secondary font-heading">Informações de Contato</h2>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-geek-light rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-geek-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Endereço</h3>
                      <p className="text-gray-600">Rua dos Geeks, 42<br />São Paulo - SP<br />CEP: 01234-567</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-geek-light rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-geek-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Telefone</h3>
                      <p className="text-gray-600">(11) 9999-9999</p>
                      <p className="text-gray-600">(11) 8888-8888</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-geek-light rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-geek-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">E-mail</h3>
                      <p className="text-gray-600">contato@geekdungeon.com.br</p>
                      <p className="text-gray-600">suporte@geekdungeon.com.br</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4">Horário de Atendimento</h3>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Segunda a Sexta</td>
                        <td className="py-2">9h às 18h</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Sábado</td>
                        <td className="py-2">9h às 14h</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Domingo e Feriados</td>
                        <td className="py-2">Fechado</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6 text-geek-secondary font-heading">Nossa Localização</h2>
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Mapa será carregado aqui</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
