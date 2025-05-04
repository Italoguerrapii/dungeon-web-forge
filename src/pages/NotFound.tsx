
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-md w-full text-center px-4">
          <h1 className="text-9xl font-bold text-geek-primary mb-4">404</h1>
          <p className="text-2xl text-geek-secondary mb-8">Página não encontrada</p>
          <p className="text-gray-600 mb-8">
            A página que você está procurando pode ter sido removida, 
            renomeada ou temporariamente indisponível.
          </p>
          <Button asChild className="bg-geek-primary hover:bg-geek-secondary px-8 py-6 text-lg">
            <Link to="/">Voltar para o Início</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
