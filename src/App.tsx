
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
import HowToBuyPage from "./pages/HowToBuyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/AccountPage/OrdersPage";
import OrderDetailsPage from "./pages/AccountPage/OrderDetailsPage";
import ProfilePage from "./pages/AccountPage/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AdminProductsPage from "./pages/AdminPage/ProductsPage";
import AdminOrdersPage from "./pages/AdminPage/OrdersPage";
import AdminUsersPage from "./pages/AdminPage/UsersPage";
import AdminCouponsPage from "./pages/AdminPage/CouponsPage";
import AdminDashboardPage from "./pages/AdminPage/DashboardPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";

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
          <Route path="/como-comprar" element={<HowToBuyPage />} />
          <Route path="/perguntas-frequentes" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/minha-conta" element={<AccountPage />} />
          <Route path="/minha-conta/pedidos" element={<OrdersPage />} />
          <Route path="/minha-conta/pedido/:id" element={<OrderDetailsPage />} />
          <Route path="/minha-conta/perfil" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/produtos" element={<AdminProductsPage />} />
          <Route path="/admin/pedidos" element={<AdminOrdersPage />} />
          <Route path="/admin/usuarios" element={<AdminUsersPage />} />
          <Route path="/admin/cupons" element={<AdminCouponsPage />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/politica-de-trocas" element={<ReturnPolicyPage />} />
          <Route path="/sobre-nos" element={<AboutUsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
