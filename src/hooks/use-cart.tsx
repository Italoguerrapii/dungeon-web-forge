
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variations?: {
    type: string;
    selected: string;
  }[];
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  itemCount: number;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,
      
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);
        
        if (existingItem) {
          // Update quantity if item exists
          set({
            items: items.map(i => i.id === item.id 
              ? { ...i, quantity: i.quantity + item.quantity } 
              : i
            ),
            itemCount: get().itemCount + item.quantity,
            total: get().total + (item.price * item.quantity)
          });
          toast({
            title: "Quantidade atualizada",
            description: `${item.name} atualizado no carrinho`
          });
        } else {
          // Add new item
          set({
            items: [...items, item],
            itemCount: get().itemCount + item.quantity,
            total: get().total + (item.price * item.quantity)
          });
          toast({
            title: "Produto adicionado",
            description: `${item.name} adicionado ao carrinho`
          });
        }
      },
      
      updateQuantity: (id, quantity) => {
        const { items } = get();
        const item = items.find(i => i.id === id);
        
        if (!item) return;
        
        const quantityDiff = quantity - item.quantity;
        
        set({
          items: items.map(i => i.id === id ? { ...i, quantity } : i),
          itemCount: get().itemCount + quantityDiff,
          total: get().total + (item.price * quantityDiff)
        });
      },
      
      removeItem: (id) => {
        const { items } = get();
        const item = items.find(i => i.id === id);
        
        if (!item) return;
        
        set({
          items: items.filter(i => i.id !== id),
          itemCount: get().itemCount - item.quantity,
          total: get().total - (item.price * item.quantity)
        });
        
        toast({
          title: "Produto removido",
          description: `${item.name} removido do carrinho`
        });
      },
      
      clearCart: () => {
        set({ items: [], itemCount: 0, total: 0 });
      },
      
      getItemQuantity: (id) => {
        const item = get().items.find(i => i.id === id);
        return item?.quantity || 0;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
