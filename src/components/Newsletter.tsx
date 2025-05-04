
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

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
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-geek-secondary font-heading">
            Fique por Dentro das Novidades
          </h2>
          <p className="text-gray-600 mb-8">
            Assine nossa newsletter e receba ofertas exclusivas, lançamentos e dicas sobre o universo geek.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="submit"
              className="bg-geek-primary hover:bg-geek-secondary"
            >
              Inscrever-se
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade. 
            Não compartilhamos seus dados com terceiros.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
