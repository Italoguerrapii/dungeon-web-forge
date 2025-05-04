
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from "@/hooks/use-toast";
import { users } from '@/lib/mock-data';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  isReseller: boolean;
}

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, isReseller: boolean) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          // Simulate API call with delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock validation (in a real app, this would be a backend call)
          const user = users.find(u => u.email === email);
          
          if (!user) {
            toast({
              title: "Erro ao entrar",
              description: "Email ou senha inválidos",
              variant: "destructive",
            });
            return false;
          }
          
          // Successful login
          set({ 
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              isReseller: user.isReseller
            }, 
            isAuthenticated: true 
          });
          
          toast({
            title: "Login realizado com sucesso",
            description: `Bem-vindo(a) de volta, ${user.name}!`,
          });
          
          return true;
        } catch (error) {
          toast({
            title: "Erro ao entrar",
            description: "Ocorreu um erro ao tentar fazer login",
            variant: "destructive",
          });
          return false;
        }
      },
      
      register: async (name: string, email: string, password: string, isReseller: boolean) => {
        try {
          // Simulate API call with delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock validation (check if email exists)
          const existingUser = users.find(u => u.email === email);
          
          if (existingUser) {
            toast({
              title: "Erro no cadastro",
              description: "Este email já está em uso",
              variant: "destructive",
            });
            return false;
          }
          
          // Mock user creation - in real app this would be a backend call
          const newUser: AuthUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            isReseller
          };
          
          // Set the new user as logged in
          set({ user: newUser, isAuthenticated: true });
          
          toast({
            title: "Cadastro realizado com sucesso",
            description: `Bem-vindo(a) à GeekDungeon, ${name}!`,
          });
          
          return true;
        } catch (error) {
          toast({
            title: "Erro no cadastro",
            description: "Ocorreu um erro ao tentar criar sua conta",
            variant: "destructive",
          });
          return false;
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
        toast({
          title: "Logout realizado",
          description: "Você saiu da sua conta",
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
