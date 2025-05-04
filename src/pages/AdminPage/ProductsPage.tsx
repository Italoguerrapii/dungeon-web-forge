
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash, X, Image, Save } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock de produtos
const mockProdutos = [
  {
    id: "1",
    nome: "Placa Decorativa Game of Thrones",
    categoria: "Placas Decorativas",
    preco: 89.90,
    preco_revenda: 65.90,
    estoque: 42,
    status: "Ativo",
    imagem: "/placeholder.svg"
  },
  {
    id: "2",
    nome: "Quadro Star Wars Vintage",
    categoria: "Quadros Geek",
    preco: 119.90,
    preco_revenda: 84.90,
    estoque: 29,
    status: "Ativo",
    imagem: "/placeholder.svg"
  },
  {
    id: "3",
    nome: "Placa Personalizada DC Comics",
    categoria: "Placas Personalizadas",
    preco: 99.90,
    preco_revenda: 74.90,
    estoque: 18,
    status: "Ativo",
    imagem: "/placeholder.svg"
  },
  {
    id: "4",
    nome: "Quadro Decorativo Senhor dos Anéis",
    categoria: "Quadros Geek",
    preco: 139.90,
    preco_revenda: 99.90,
    estoque: 14,
    status: "Ativo",
    imagem: "/placeholder.svg"
  },
  {
    id: "5",
    nome: "Placa Divertida Frases de Bar",
    categoria: "Placas Decorativas",
    preco: 59.90,
    preco_revenda: 42.90,
    estoque: 0,
    status: "Esgotado",
    imagem: "/placeholder.svg"
  },
  {
    id: "6",
    nome: "Quadro Marvel Vingadores",
    categoria: "Quadros Geek",
    preco: 129.90,
    preco_revenda: 89.90,
    estoque: 5,
    status: "Estoque baixo",
    imagem: "/placeholder.svg"
  },
  {
    id: "7",
    nome: "Placa Rústica Harry Potter",
    categoria: "Placas Decorativas",
    preco: 74.90,
    preco_revenda: 52.90,
    estoque: 31,
    status: "Ativo",
    imagem: "/placeholder.svg"
  }
];

const categories = [
  "Placas Decorativas",
  "Quadros Geek",
  "Placas Personalizadas",
  "Colecionáveis"
];

// Interface para os produtos
interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  preco_revenda: number;
  estoque: number;
  status: string;
  imagem: string;
  descricao?: string;
  slug?: string;
  peso?: number;
  dimensoes?: string;
  destaque?: boolean;
}

const ProductsPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [filtro, setFiltro] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState<Produto | null>(null);

  // Filtrar produtos com base na pesquisa
  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(filtro.toLowerCase()) || 
    produto.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

  // Abrir o diálogo para criar um novo produto
  const handleNovoProduto = () => {
    setProdutoAtual({
      id: `${Date.now()}`,
      nome: "",
      categoria: "",
      preco: 0,
      preco_revenda: 0,
      estoque: 0,
      status: "Ativo",
      imagem: "/placeholder.svg",
      descricao: "",
      slug: "",
      peso: 0,
      dimensoes: "",
      destaque: false
    });
    setDialogOpen(true);
  };

  // Abrir o diálogo para editar um produto existente
  const handleEditarProduto = (produto: Produto) => {
    setProdutoAtual(produto);
    setDialogOpen(true);
  };

  // Abrir o diálogo de confirmação para excluir um produto
  const handleExcluirConfirmacao = (produto: Produto) => {
    setProdutoAtual(produto);
    setDeleteDialogOpen(true);
  };

  // Excluir o produto
  const handleExcluirProduto = () => {
    if (produtoAtual) {
      setProdutos(produtos.filter(p => p.id !== produtoAtual.id));
      toast({
        title: "Produto excluído",
        description: `O produto "${produtoAtual.nome}" foi excluído com sucesso.`
      });
      setDeleteDialogOpen(false);
    }
  };

  // Salvar o produto (criar ou atualizar)
  const handleSalvarProduto = () => {
    if (!produtoAtual) return;

    if (produtoAtual.nome.trim() === "") {
      toast({
        title: "Erro ao salvar",
        description: "O nome do produto é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    if (produtoAtual.preco <= 0) {
      toast({
        title: "Erro ao salvar",
        description: "O preço do produto deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se é uma edição ou criação
    const index = produtos.findIndex(p => p.id === produtoAtual.id);
    
    if (index >= 0) {
      // Atualizar produto existente
      const novosProdutos = [...produtos];
      novosProdutos[index] = produtoAtual;
      setProdutos(novosProdutos);
      toast({
        title: "Produto atualizado",
        description: `O produto "${produtoAtual.nome}" foi atualizado com sucesso.`
      });
    } else {
      // Criar novo produto
      setProdutos([...produtos, produtoAtual]);
      toast({
        title: "Produto criado",
        description: `O produto "${produtoAtual.nome}" foi criado com sucesso.`
      });
    }
    
    setDialogOpen(false);
  };

  // Atualizar os valores do produto atual no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!produtoAtual) return;
    
    const { name, value, type } = e.target;
    
    setProdutoAtual({
      ...produtoAtual,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  // Atualizar a categoria do produto
  const handleCategoriaChange = (value: string) => {
    if (!produtoAtual) return;
    setProdutoAtual({ ...produtoAtual, categoria: value });
  };
  
  // Atualizar o status do produto
  const handleStatusChange = (value: string) => {
    if (!produtoAtual) return;
    setProdutoAtual({ ...produtoAtual, status: value });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Gerenciar Produtos</CardTitle>
            <CardDescription>
              Gerencie o catálogo de produtos da sua loja
            </CardDescription>
          </div>
          <Button onClick={handleNovoProduto} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-8"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Preço Revenda</TableHead>
                  <TableHead className="text-right">Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  produtosFiltrados.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell>
                        <img 
                          src={produto.imagem} 
                          alt={produto.nome} 
                          className="h-10 w-10 rounded-md object-cover" 
                        />
                      </TableCell>
                      <TableCell className="font-medium">{produto.nome}</TableCell>
                      <TableCell>{produto.categoria}</TableCell>
                      <TableCell className="text-right">R$ {produto.preco.toFixed(2)}</TableCell>
                      <TableCell className="text-right">R$ {produto.preco_revenda.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{produto.estoque}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          produto.status === 'Ativo' ? 'bg-green-100 text-green-800' :
                          produto.status === 'Esgotado' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {produto.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditarProduto(produto)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleExcluirConfirmacao(produto)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de criação/edição de produto */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {produtoAtual && produtoAtual.nome ? `Editar: ${produtoAtual.nome}` : "Novo Produto"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do produto abaixo
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="pricing">Preços</TabsTrigger>
              <TabsTrigger value="media">Imagens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Produto</Label>
                  <Input 
                    id="nome" 
                    name="nome" 
                    value={produtoAtual?.nome || ""} 
                    onChange={handleInputChange}
                    placeholder="Nome do produto" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    name="slug" 
                    value={produtoAtual?.slug || ""} 
                    onChange={handleInputChange}
                    placeholder="produto-exemplo" 
                  />
                  <p className="text-xs text-gray-500">
                    O slug é usado na URL do produto (ex: /produto/produto-exemplo)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select 
                    value={produtoAtual?.categoria || ""} 
                    onValueChange={handleCategoriaChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea 
                    id="descricao" 
                    name="descricao" 
                    value={produtoAtual?.descricao || ""} 
                    onChange={handleInputChange}
                    placeholder="Descreva o produto em detalhes" 
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço de Venda (R$)</Label>
                  <Input 
                    id="preco" 
                    name="preco" 
                    type="number" 
                    step="0.01"
                    value={produtoAtual?.preco || 0}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preco_revenda">Preço de Revenda (R$)</Label>
                  <Input 
                    id="preco_revenda" 
                    name="preco_revenda" 
                    type="number" 
                    step="0.01"
                    value={produtoAtual?.preco_revenda || 0}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estoque">Estoque</Label>
                  <Input 
                    id="estoque" 
                    name="estoque" 
                    type="number" 
                    value={produtoAtual?.estoque || 0}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={produtoAtual?.status || "Ativo"} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Estoque baixo">Estoque baixo</SelectItem>
                      <SelectItem value="Esgotado">Esgotado</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input 
                    id="peso" 
                    name="peso" 
                    type="number" 
                    step="0.001"
                    value={produtoAtual?.peso || 0}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensoes">Dimensões (AxLxP cm)</Label>
                  <Input 
                    id="dimensoes" 
                    name="dimensoes" 
                    placeholder="20x30x2"
                    value={produtoAtual?.dimensoes || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4 pt-4">
              <div className="space-y-4">
                <Label>Imagem Principal</Label>
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="space-y-1 text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-500">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Carregar arquivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSalvarProduto} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{produtoAtual?.nome}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleExcluirProduto}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
