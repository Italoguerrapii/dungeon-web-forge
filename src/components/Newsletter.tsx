
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu email.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Sucesso!",
      description: "Obrigado por se inscrever em nossa newsletter!",
    });
    
    setEmail('');
  };

  return (
    <section className="py-16 bg-geek-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-geek-primary/10 to-transparent opacity-30"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-geek-accent/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-geek-flame/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-geek-primary to-geek-flame mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
            Fique por Dentro das <span className="text-geek-accent">Novidades</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Assine nossa newsletter e receba ofertas exclusivas, lançamentos e dicas sobre o universo geek.
            <span className="block mt-2">Seja o primeiro a saber sobre nossos eventos e promoções!</span>
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-geek-primary"
            />
            <Button 
              type="submit"
              className="bg-geek-primary hover:bg-geek-accent text-white"
            >
              <Send className="mr-2 h-4 w-4" /> Inscrever-se
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade. 
            Não compartilhamos seus dados com terceiros.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
