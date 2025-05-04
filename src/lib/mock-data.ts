
// Mock data for products, categories, and other data needed for the site

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  wholesalePrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  variations?: {
    type: string;
    options: string[];
  }[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isReseller: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  createdAt: string;
}

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Placas Decorativas',
    slug: 'placas-decorativas',
    description: 'Placas decorativas para sua casa ou estabelecimento',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwyfHxkZWNvcmF0aXZlJTIwc2lnbnxlbnwwfHx8fDE3MTUyODM3MDB8MA&ixlib=rb-4.0.3&q=80&w=600'
  },
  {
    id: '2',
    name: 'Quadros Geek',
    slug: 'quadros-geek',
    description: 'Quadros com temas geek para decorar seu espaço',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHw0fHxnZWVrJTIwZGVjb3J8ZW58MHx8fHwxNzE1MjgzNzI4fDA&ixlib=rb-4.0.3&q=80&w=600'
  },
  {
    id: '3',
    name: 'Placas Personalizadas',
    slug: 'placas-personalizadas',
    description: 'Placas personalizadas com sua mensagem ou design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwzfHxjdXN0b20lMjBzaWdufGVufDB8fHx8MTcxNTI4Mzc1M3ww&ixlib=rb-4.0.3&q=80&w=600'
  },
  {
    id: '4',
    name: 'Placas para Negócios',
    slug: 'placas-para-negocios',
    description: 'Placas para identificação e informação em seu negócio',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHNpZ258ZW58MHx8fHwxNzE1MjgzNzgxfDA&ixlib=rb-4.0.3&q=80&w=600'
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Placa Decorativa Game of Thrones',
    slug: 'placa-decorativa-game-of-thrones',
    description: 'Placa decorativa inspirada na série Game of Thrones, perfeita para fãs da série decorarem seus ambientes com estilo. Fabricada em metal resistente com acabamento vintage.',
    shortDescription: 'Placa decorativa Game of Thrones em metal resistente',
    price: 59.90,
    wholesalePrice: 39.90,
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHw1fHxnYW1lJTIwb2YlMjB0aHJvbmVzfGVufDB8fHx8MTcxNTI4Mzg0NXww&ixlib=rb-4.0.3&q=80&w=600',
    ],
    category: 'Placas Decorativas',
    inStock: true,
    featured: true,
    bestseller: true,
    variations: [
      {
        type: 'Tamanho',
        options: ['Pequeno (20x30cm)', 'Médio (30x40cm)', 'Grande (40x60cm)']
      },
      {
        type: 'Material',
        options: ['Metal', 'MDF']
      }
    ],
    createdAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Placa Decorativa Star Wars',
    slug: 'placa-decorativa-star-wars',
    description: 'Placa decorativa inspirada no universo Star Wars, ideal para fãs da saga. Material de alta qualidade com impressão detalhada.',
    shortDescription: 'Placa decorativa Star Wars para fãs da saga',
    price: 64.90,
    wholesalePrice: 42.90,
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwzfHxzdGFyJTIwd2Fyc3xlbnwwfHx8fDE3MTUyODM4ODJ8MA&ixlib=rb-4.0.3&q=80&w=600',
    ],
    category: 'Placas Decorativas',
    inStock: true,
    featured: true,
    bestseller: false,
    variations: [
      {
        type: 'Tamanho',
        options: ['Pequeno (20x30cm)', 'Médio (30x40cm)', 'Grande (40x60cm)']
      },
      {
        type: 'Material',
        options: ['Metal', 'MDF']
      }
    ],
    createdAt: '2023-02-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Placa Personalizada "Bem-vindo"',
    slug: 'placa-personalizada-bem-vindo',
    description: 'Placa personalizada com a mensagem "Bem-vindo" para receber seus convidados com estilo. Personalize com o nome da sua família.',
    shortDescription: 'Placa personalizada para entrada de residências',
    price: 49.90,
    wholesalePrice: 32.90,
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHw0fHx3ZWxjb21lJTIwc2lnbnxlbnwwfHx8fDE3MTUyODM5MTR8MA&ixlib=rb-4.0.3&q=80&w=600',
    ],
    category: 'Placas Personalizadas',
    inStock: true,
    featured: false,
    bestseller: true,
    variations: [
      {
        type: 'Tamanho',
        options: ['Pequeno (15x20cm)', 'Médio (20x30cm)']
      },
      {
        type: 'Material',
        options: ['MDF', 'Acrílico']
      }
    ],
    createdAt: '2023-03-10T09:45:00Z'
  },
  {
    id: '4',
    name: 'Placa para Café "Coffee Shop"',
    slug: 'placa-cafe-coffee-shop',
    description: 'Placa decorativa para cafeterias e espaços gourmet com tema de café. Design vintage com acabamento detalhado.',
    shortDescription: 'Placa decorativa com tema de café',
    price: 54.90,
    wholesalePrice: 36.90,
    images: [
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwc2lnbnxlbnwwfHx8fDE3MTUyODM5NDN8MA&ixlib=rb-4.0.3&q=80&w=600',
    ],
    category: 'Placas para Negócios',
    inStock: true,
    featured: true,
    bestseller: true,
    variations: [
      {
        type: 'Tamanho',
        options: ['Médio (30x40cm)', 'Grande (40x60cm)']
      },
      {
        type: 'Material',
        options: ['Metal', 'MDF']
      }
    ],
    createdAt: '2023-04-05T11:20:00Z'
  },
  {
    id: '5',
    name: 'Quadro Super Mario Bros',
    slug: 'quadro-super-mario-bros',
    description: 'Quadro decorativo com tema do clássico jogo Super Mario Bros. Perfeito para decoração geek.',
    shortDescription: 'Quadro decorativo Super Mario para fãs do jogo',
    price: 69.90,
    wholesalePrice: 46.90,
    images: [
      'https://images.unsplash.com/photo-1642059893618-c83ece3e95b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwxfHxtYXJpbyUyMGdhbWV8ZW58MHx8fHwxNzE1MjgzOTcxfDA&ixlib=rb-4.0.3&q=80&w=600',
    ],
    category: 'Quadros Geek',
    inStock: true,
    featured: true,
    bestseller: false,
    variations: [
      {
        type: 'Tamanho',
        options: ['Pequeno (20x30cm)', 'Médio (30x40cm)', 'Grande (40x60cm)']
      },
      {
        type: 'Material',
        options: ['Canvas', 'Poster']
      }
    ],
    createdAt: '2023-05-12T16:30:00Z'
  },
  {
    id: '6',
    name: 'Placa Open/Closed para Lojas',
    slug: 'placa-open-closed-lojas',
    description: 'Placa reversível Open/Closed para estabelecimentos comerciais. Fabricada em material durável e design elegante.',
    shortDescription: 'Placa Open/Closed para comércios',
    price: 39.90,
    wholesalePrice: 26.90,
    images: [
      'https://images.unsplash.com/photo-1611176216703-8bf68154b96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDE3NjB8MHwxfHNlYXJjaHwxfHxvcGVuJTIwY2xvc2VkJTIwc2lnbnxlbnwwfHx8fDE3MTUyODQwMDJ8MA&ixlib=rb-4.0.3&q=80&w=600',
    ],
    category: 'Placas para Negócios',
    inStock: true,
    featured: false,
    bestseller: true,
    variations: [
      {
        type: 'Tamanho',
        options: ['Padrão (15x30cm)']
      },
      {
        type: 'Material',
        options: ['Acrílico', 'MDF']
      }
    ],
    createdAt: '2023-06-20T10:00:00Z'
  },
];

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    isReseller: false,
    createdAt: '2023-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria@example.com',
    isReseller: true,
    createdAt: '2023-02-15T14:30:00Z'
  }
];

// Mock Orders
export const orders: Order[] = [
  {
    id: '1001',
    userId: '1',
    products: [
      { productId: '1', quantity: 2, price: 59.90 },
      { productId: '3', quantity: 1, price: 49.90 }
    ],
    status: 'delivered',
    total: 169.70,
    shippingAddress: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    paymentMethod: 'credit_card',
    createdAt: '2023-03-20T15:45:00Z'
  },
  {
    id: '1002',
    userId: '2',
    products: [
      { productId: '2', quantity: 10, price: 42.90 },
      { productId: '4', quantity: 5, price: 36.90 }
    ],
    status: 'shipped',
    total: 613.50,
    shippingAddress: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 210',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
    },
    paymentMethod: 'bank_transfer',
    createdAt: '2023-04-05T10:30:00Z'
  }
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

// Helper function to get filtered products
export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export function getFilteredProducts(options: FilterOptions): Product[] {
  return products.filter(product => {
    // Filter by category
    if (options.category && product.category !== options.category) {
      return false;
    }
    
    // Filter by price range
    if (options.minPrice && product.price < options.minPrice) {
      return false;
    }
    if (options.maxPrice && product.price > options.maxPrice) {
      return false;
    }
    
    // Filter by stock
    if (options.inStock !== undefined && product.inStock !== options.inStock) {
      return false;
    }
    
    // Filter by search term
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.shortDescription.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

// Helper function to get bestseller products
export function getBestsellerProducts(): Product[] {
  return products.filter(product => product.bestseller);
}

// Helper function to get orders by user ID
export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter(order => order.userId === userId);
}
