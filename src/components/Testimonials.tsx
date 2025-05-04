
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rafael Silva',
    role: 'Gamer Profissional',
    comment: 'A GeekDungeon tem os melhores produtos para gamers! Atendimento rápido e preços competitivos. Recomendo!',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Marina Costa',
    role: 'Colecionadora',
    comment: 'Sempre encontro items raros na GeekDungeon. A qualidade dos products é excelente e a entrega é super segura.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 3,
    name: 'Bruno Rodrigues',
    role: 'Entusiasta de Board Games',
    comment: 'Compro jogos de tabuleiro aqui há anos e nunca me decepcionei. O suporte ao cliente é fantástico!',
    avatar: 'https://i.pravatar.cc/150?img=8'
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-geek-dark to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-geek-flame blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-geek-accent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-geek-accent/20 text-geek-accent rounded-full mb-4 font-medium">
            Experiência Comprovada
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
            O que <span className="text-geek-primary">Nossos Clientes</span> Dizem
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nosso maior orgulho. Confira alguns depoimentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-800/60 border-gray-700 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-geek-primary">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-geek-accent">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-200 mb-4">{testimonial.comment}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-5 h-5 text-geek-accent fill-geek-accent" 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
