
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
import { Search, Filter, Eye, CheckCircle, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock de pedidos
const mockPedidos = [
  {
    id: "8734",
    cliente: "Ana Silva",
    email: "ana.silva@email.com",
    data: "2024-05-01T10:23:45",
    total: 289.90,
    status: "Entregue",
    pagamento: "Cartão de Crédito",
    itens: [
      { id: "1", produto: "Placa Decorativa Game of Thrones", quantidade: 2, preco: 89.90, subtotal: 179.80 },
      { id: "3", produto: "Placa Personalizada DC Comics", quantidade: 1, preco: 99.90, subtotal: 99.90 }
    ],
    endereco: {
      rua: "Rua das Flores, 123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01001-000"
    }
  },
  {
    id: "8733",
    cliente: "Marcos Oliveira",
    email: "marcos.oliveira@email.com",
    data: "2024-05-01T09:15:22",
    total: 572.80,
    status: "Em trânsito",
    pagamento: "Pix",
    itens: [
      { id: "2", produto: "Quadro Star Wars Vintage", quantidade: 4, preco: 119.90, subtotal: 479.60 },
      { id: "7", produto: "Placa Rústica Harry Potter", quantidade: 1, preco: 74.90, subtotal: 74.90 }
    ],
    endereco: {
      rua: "Av. Paulista, 1578",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01310-200"
    }
  },
  {
    id: "8732",
    cliente: "Camila Santos",
    email: "camila.santos@email.com",
    data: "2024-04-30T16:42:10",
    total: 189.90,
    status: "Processando",
    pagamento: "Boleto",
    itens: [
      { id: "5", produto: "Placa Divertida Frases de Bar", quantidade: 1, preco: 59.90, subtotal: 59.90 },
      { id: "7", produto: "Placa Rústica Harry Potter", quantidade: 1, preco: 74.90, subtotal: 74.90 },
      { id: "3", produto: "Placa Personalizada DC Comics", quantidade: 1, preco: 99.90, subtotal: 99.90 }
    ],
    endereco: {
      rua: "Rua Augusta, 456",
      bairro: "Consolação",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01305-000"
    }
  },
  {
    id: "8731",
    cliente: "Rafael Costa",
    email: "rafael.costa@email.com",
    data: "2024-04-30T11:08:59",
    total: 438.50,
    status: "Pago",
    pagamento: "Cartão de Crédito",
    itens: [
      { id: "4", produto: "Quadro Decorativo Senhor dos Anéis", quantidade: 2, preco: 139.90, subtotal: 279.80 },
      { id: "5", produto: "Placa Divertida Frases de Bar", quantidade: 2, preco: 59.90, subtotal: 119.80 },
      { id: "1", produto: "Placa Decorativa Game of Thrones", quantidade: 1, preco: 89.90, subtotal: 89.90 }
    ],
    endereco: {
      rua: "Rua Oscar Freire, 789",
      bairro: "Jardins",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01426-001"
    }
  },
  {
    id: "8730",
    cliente: "Juliana Ferreira",
    email: "juliana.ferreira@email.com",
    data: "2024-04-29T14:30:25",
    total: 257.30,
    status: "Entregue",
    pagamento: "Pix",
    itens: [
      { id: "6", produto: "Quadro Marvel Vingadores", quantidade: 1, preco: 129.90, subtotal: 129.90 },
      { id: "3", produto: "Placa Personalizada DC Comics", quantidade: 1, preco: 99.90, subtotal: 99.90 }
    ],
    endereco: {
      rua: "Av. Brigadeiro Faria Lima, 1234",
      bairro: "Pinheiros",
      cidade: "São Paulo",
      estado: "SP",
      cep: "05426-100"
    }
  },
  {
    id: "8729",
    cliente: "Eduardo Moreira",
    email: "eduardo.moreira@email.com",
    data: "2024-04-29T09:45:12",
    total: 319.60,
    status: "Cancelado",
    pagamento: "Cartão de Crédito",
    itens: [
      { id: "2", produto: "Quadro Star Wars Vintage", quantidade: 2, preco: 119.90, subtotal: 239.80 },
      { id: "5", produto: "Placa Divertida Frases de Bar", quantidade: 1, preco: 59.90, subtotal: 59.90 }
    ],
    endereco: {
      rua: "Rua Haddock Lobo, 595",
      bairro: "Cerqueira César",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01414-001"
    }
  }
];

// Status possíveis para um pedido
const statusOptions = [
  { label: "Aguardando Pagamento", value: "Aguardando Pagamento", color: "bg-blue-100 text-blue-800" },
  { label: "Pago", value: "Pago", color: "bg-green-100 text-green-800" },
  { label: "Processando", value: "Processando", color: "bg-yellow-100 text-yellow-800" },
  { label: "Enviado", value: "Em trânsito", color: "bg-purple-100 text-purple-800" },
  { label: "Entregue", value: "Entregue", color: "bg-green-100 text-green-800" },
  { label: "Cancelado", value: "Cancelado", color: "bg-red-100 text-red-800" }
];

// Interface para os pedidos
interface Pedido {
  id: string;
  cliente: string;
  email: string;
  data: string;
  total: number;
  status: string;
  pagamento: string;
  itens: {
    id: string;
    produto: string;
    quantidade: number;
    preco: number;
    subtotal: number;
  }[];
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

const OrdersPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [filtro, setFiltro] = useState("");
  const [pedidoAtual, setPedidoAtual] = useState<Pedido | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState<string>("Todos");

  // Filtrar pedidos com base na pesquisa e status
  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchesFiltro = 
      pedido.id.toLowerCase().includes(filtro.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      pedido.email.toLowerCase().includes(filtro.toLowerCase());
    
    return (statusFiltro === "Todos" || pedido.status === statusFiltro) && matchesFiltro;
  });

  // Visualizar detalhes de um pedido
  const handleVerDetalhes = (pedido: Pedido) => {
    setPedidoAtual(pedido);
    setDialogOpen(true);
  };

  // Alterar o status de um pedido
  const handleAlterarStatus = (pedido: Pedido, novoStatus: string) => {
    const novoPedidos = pedidos.map(p => {
      if (p.id === pedido.id) {
        return {
          ...p,
          status: novoStatus
        };
      }
      return p;
    });
    
    setPedidos(novoPedidos);
    
    if (pedidoAtual && pedidoAtual.id === pedido.id) {
      setPedidoAtual({
        ...pedidoAtual,
        status: novoStatus
      });
    }
    
    toast({
      title: "Status atualizado",
      description: `O pedido #${pedido.id} foi alterado para "${novoStatus}".`
    });
  };

  // Formatar a data para exibição
  const formatarData = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch (error) {
      return dataString;
    }
  };

  // Obter a cor do status para exibição
  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Gerenciar Pedidos</CardTitle>
          <CardDescription>
            Visualize e gerencie os pedidos da sua loja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por ID, cliente ou email..."
                className="pl-8"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Status:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {statusFiltro}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFiltro("Todos")}>
                    Todos
                  </DropdownMenuItem>
                  {statusOptions.map((status) => (
                    <DropdownMenuItem 
                      key={status.value}
                      onClick={() => setStatusFiltro(status.value)}
                    >
                      {status.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      Nenhum pedido encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  pedidosFiltrados.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell className="font-medium">#{pedido.id}</TableCell>
                      <TableCell>{pedido.cliente}</TableCell>
                      <TableCell>{formatarData(pedido.data)}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(pedido.total)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={`${getStatusColor(pedido.status)} cursor-pointer flex items-center gap-2 py-1 px-3`}>
                              {pedido.status}
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {statusOptions.map((status) => (
                              <DropdownMenuItem 
                                key={status.value}
                                onClick={() => handleAlterarStatus(pedido, status.value)}
                                disabled={pedido.status === status.value}
                                className="flex items-center gap-2"
                              >
                                {pedido.status === status.value && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                <span className={pedido.status === status.value ? "font-medium" : ""}>
                                  {status.label}
                                </span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>{pedido.pagamento}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleVerDetalhes(pedido)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
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

      {/* Diálogo de detalhes do pedido */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Detalhes do Pedido #{pedidoAtual?.id}</span>
              <Badge className={getStatusColor(pedidoAtual?.status || "")}>
                {pedidoAtual?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {pedidoAtual ? `Realizado em ${formatarData(pedidoAtual.data)}` : ""}
            </DialogDescription>
          </DialogHeader>

          {pedidoAtual && (
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="items">Itens</TabsTrigger>
                <TabsTrigger value="client">Cliente</TabsTrigger>
                <TabsTrigger value="shipping">Entrega</TabsTrigger>
              </TabsList>
              
              <TabsContent value="items" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedidoAtual.itens.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.produto}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(item.preco)}
                          </TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(item.subtotal)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(pedidoAtual.total)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Frete:</span>
                      <span className="font-medium">R$ 0,00</span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-lg">
                      <span>Total:</span>
                      <span>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(pedidoAtual.total)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="font-medium">Forma de Pagamento</h4>
                    <p className="text-sm text-gray-500">{pedidoAtual.pagamento}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-right">Alterar Status</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          {pedidoAtual.status}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {statusOptions.map((status) => (
                          <DropdownMenuItem 
                            key={status.value}
                            onClick={() => handleAlterarStatus(pedidoAtual, status.value)}
                            disabled={pedidoAtual.status === status.value}
                            className="flex items-center gap-2"
                          >
                            {pedidoAtual.status === status.value && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span className={pedidoAtual.status === status.value ? "font-medium" : ""}>
                              {status.label}
                            </span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="client" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Informações do Cliente</h4>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Nome:</span> {pedidoAtual.cliente}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {pedidoAtual.email}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Endereço de Entrega</h4>
                  <div className="space-y-1">
                    <p className="text-sm">{pedidoAtual.endereco.rua}</p>
                    <p className="text-sm">
                      {pedidoAtual.endereco.bairro}, {pedidoAtual.endereco.cidade} - {pedidoAtual.endereco.estado}
                    </p>
                    <p className="text-sm">CEP: {pedidoAtual.endereco.cep}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
