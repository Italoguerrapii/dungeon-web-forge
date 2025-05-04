
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import CatalogPage from "./pages/CatalogPage";
import WholesalePage from "./pages/WholesalePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import FAQPage from "./pages/FAQPage";
import AdminPage from "./pages/AdminPage";
import ProductsPage from "./pages/AdminPage/ProductsPage";
import OrdersPage from "./pages/AdminPage/OrdersPage";
import UsersPage from "./pages/AdminPage/UsersPage";
import CouponsPage from "./pages/AdminPage/CouponsPage";
import DashboardPage from "./pages/AdminPage/DashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categoria/:slug" element={<CategoryPage />} />
          <Route path="/produto/:slug" element={<ProductPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/produtos" element={<CatalogPage />} />
          <Route path="/revenda" element={<WholesalePage />} />
          <Route path="/como-comprar" element={<FAQPage />} />
          <Route path="/perguntas-frequentes" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/carrinho" element={<CartPage />} />

          {/* Rotas do Admin */}
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="produtos" element={<ProductsPage />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="usuarios" element={<UsersPage />} />
            <Route path="cupons" element={<CouponsPage />} />
          </Route>

          {/* Rota de fallback para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
