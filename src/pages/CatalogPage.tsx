
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterOptions, Product, categories, getFilteredProducts } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Filter states
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: searchParams.get('categoria') || undefined,
    search: searchParams.get('search') || undefined,
    inStock: true,
    minPrice: 0,
    maxPrice: 200,
  });

  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [searchTerm, setSearchTerm] = useState(filterOptions.search || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filterOptions.category ? [filterOptions.category] : []
  );

  const { addItem } = useCart();

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      const filteredProducts = getFilteredProducts(filterOptions);
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [filterOptions]);

  const applyFilters = () => {
    setFilterOptions({
      ...filterOptions,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: searchTerm,
      category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 200]);
    setSearchTerm('');
    setSelectedCategories([]);
    setFilterOptions({
      inStock: true,
      minPrice: 0,
      maxPrice: 200,
    });
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white font-heading">Catálogo de Produtos</h1>
          <Button 
            variant="outline" 
            className="lg:hidden border-geek-primary text-geek-primary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
            {isFilterOpen ? 'Fechar Filtros' : 'Filtrar'}
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop (always visible) and Mobile (toggleable) */}
          <aside className={`lg:w-64 shrink-0 bg-gray-800 rounded-lg p-4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  Filtros
                </h2>
                <Button variant="ghost" size="sm" className="text-gray-300" onClick={resetFilters}>
                  Limpar
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <Label htmlFor="search" className="text-white mb-2 block">Buscar</Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    type="search"
                    placeholder="Buscar..."
                    className="bg-gray-700 border-gray-600 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category.slug]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.slug));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`category-${category.id}`} 
                        className="text-sm text-gray-300 ml-2 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Faixa de Preço</h3>
                <Slider 
                  defaultValue={[0, 200]} 
                  min={0} 
                  max={200} 
                  step={5} 
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                  className="mb-4" 
                />
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
              
              {/* Stock */}
              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox 
                    id="in-stock"
                    checked={filterOptions.inStock}
                    onCheckedChange={(checked) => {
                      setFilterOptions({...filterOptions, inStock: checked === true});
                    }}
                  />
                  <label 
                    htmlFor="in-stock" 
                    className="text-sm text-gray-300 ml-2 cursor-pointer"
                  >
                    Somente itens em estoque
                  </label>
                </div>
              </div>
              
              <Button 
                className="w-full bg-geek-primary hover:bg-geek-accent text-white"
                onClick={applyFilters}
              >
                Aplicar Filtros
              </Button>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              // Skeleton loading UI
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-1/4 mb-6" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="text-gray-400 mb-4">
                  {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover-scale"
                    >
                      <Link to={`/produto/${product.slug}`}>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                      <div className="p-4">
                        <Link to={`/produto/${product.slug}`}>
                          <h3 className="text-lg font-medium text-white mb-1 hover:text-geek-primary">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-400 mb-3">{product.shortDescription}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-semibold text-geek-primary">
                            R$ {product.price.toFixed(2)}
                          </span>
                          {product.inStock ? (
                            <span className="text-green-400 text-xs">Em estoque</span>
                          ) : (
                            <span className="text-red-400 text-xs">Fora de estoque</span>
                          )}
                        </div>
                        <Button 
                          className="w-full bg-geek-primary hover:bg-geek-accent text-white"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-400 mb-6">Tente ajustar seus filtros ou buscar por outros termos.</p>
                <Button onClick={resetFilters} className="bg-geek-primary hover:bg-geek-accent text-white">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CatalogPage;
