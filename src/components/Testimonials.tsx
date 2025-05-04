
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: 'Rafael Silva',
    role: 'Gamer Profissional',
    comment: 'A GeekDungeon tem os melhores produtos para gamers! Atendimento rápido e preços competitivos. Recomendo!',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Marina Costa',
    role: 'Colecionadora',
    comment: 'Sempre encontro items raros na GeekDungeon. A qualidade dos products é excelente e a entrega é super segura.',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Bruno Rodrigues',
    role: 'Entusiasta de Board Games',
    comment: 'Compro jogos de tabuleiro aqui há anos e nunca me decepcionei. O suporte ao cliente é fantástico!',
    avatar: '/placeholder.svg'
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-geek-primary to-geek-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nosso maior orgulho. Confira alguns depoimentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white bg-opacity-95 border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-geek-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-700">{testimonial.comment}</p>
                <div className="flex mt-4">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
