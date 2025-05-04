
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const RegisterPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isResellerParam = searchParams.get('tipo') === 'revendedor';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isReseller, setIsReseller] = useState(isResellerParam);
  const [companyName, setCompanyName] = useState('');
  const [document, setDocument] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/minha-conta');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não correspondem.",
        variant: "destructive",
      });
      return;
    }
    
    if (isReseller && (!companyName || !document)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha os dados da empresa para cadastro de revendedor.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password, isReseller);
      if (success) {
        if (isReseller) {
          navigate('/revenda');
        } else {
          navigate('/minha-conta');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-heading text-white text-center">
                Criar Conta
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                Crie sua conta para acessar todas as funcionalidades da loja
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Account Type */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 border border-gray-600">
                  <div>
                    <h3 className="font-medium text-white">Conta de Revendedor</h3>
                    <p className="text-sm text-gray-400">
                      Ative para ter acesso a preços especiais de atacado
                    </p>
                  </div>
                  <Switch
                    checked={isReseller}
                    onCheckedChange={setIsReseller}
                    className="data-[state=checked]:bg-geek-primary"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                      Dados Pessoais
                    </h3>
                    
                    <div>
                      <Label htmlFor="name" className="text-white">Nome Completo*</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        className="mt-1 bg-gray-700 text-white border-gray-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white">Email*</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="mt-1 bg-gray-700 text-white border-gray-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password" className="text-white">Senha*</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="mt-1 bg-gray-700 text-white border-gray-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password" className="text-white">Confirme a Senha*</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="mt-1 bg-gray-700 text-white border-gray-600"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Reseller Info - Only visible if reseller is selected */}
                  {isReseller && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                        Dados de Revenda
                      </h3>
                      
                      <div>
                        <Label htmlFor="company-name" className="text-white">Nome da Empresa*</Label>
                        <Input
                          id="company-name"
                          type="text"
                          placeholder="Nome da sua empresa"
                          className="mt-1 bg-gray-700 text-white border-gray-600"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required={isReseller}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="document" className="text-white">CNPJ/CPF*</Label>
                        <Input
                          id="document"
                          type="text"
                          placeholder="00.000.000/0000-00"
                          className="mt-1 bg-gray-700 text-white border-gray-600"
                          value={document}
                          onChange={(e) => setDocument(e.target.value)}
                          required={isReseller}
                        />
                      </div>
                      
                      <div className="p-4 bg-geek-primary/20 rounded border border-geek-primary/30 mt-6">
                        <p className="text-sm text-gray-300">
                          Ao se cadastrar como revendedor, você terá acesso a preços especiais e 
                          condições exclusivas. Sua conta passará por uma breve análise e em até 24h 
                          você terá acesso total ao painel de revendedor.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-geek-primary hover:bg-geek-accent text-white py-6 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      "Criar Conta"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t border-gray-700 pt-6">
              <p className="text-center text-gray-400">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-geek-accent hover:text-geek-primary transition-colors">
                  Entrar
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
