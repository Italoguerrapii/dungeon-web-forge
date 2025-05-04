
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-16">
        <div className="max-w-md w-full text-center px-4">
          <h1 className="text-9xl font-bold text-geek-primary mb-4 relative">
            404
            <span className="absolute top-0 -right-4 w-20 h-20 bg-geek-flame/30 rounded-full blur-xl"></span>
            <span className="absolute bottom-0 -left-4 w-20 h-20 bg-geek-accent/30 rounded-full blur-xl"></span>
          </h1>
          <p className="text-2xl text-geek-accent mb-8 font-heading">Página não encontrada</p>
          <p className="text-gray-300 mb-8">
            A página que você está procurando pode ter sido removida, 
            renomeada ou temporariamente indisponível.
          </p>
          <Button asChild className="bg-geek-primary hover:bg-geek-accent text-white px-8 py-6 text-lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar para o Início
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
