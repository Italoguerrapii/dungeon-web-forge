
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, User, Eye, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock de usuários
const mockUsuarios = [
  {
    id: "user-1",
    nome: "Ana Silva",
    email: "ana.silva@email.com",
    tipo: "Cliente",
    cadastro: "2024-03-15T10:23:45",
    pedidos: 5,
    gasto_total: 789.50,
    status: "Ativo"
  },
  {
    id: "user-2",
    nome: "Marcos Oliveira",
    email: "marcos.oliveira@email.com",
    tipo: "Revendedor",
    cadastro: "2024-01-20T09:15:22",
    pedidos: 12,
    gasto_total: 2345.60,
    status: "Ativo"
  },
  {
    id: "user-3",
    nome: "Camila Santos",
    email: "camila.santos@email.com",
    tipo: "Cliente",
    cadastro: "2024-04-05T16:42:10",
    pedidos: 2,
    gasto_total: 259.80,
    status: "Ativo"
  },
  {
    id: "user-4",
    nome: "Rafael Costa",
    email: "rafael.costa@email.com",
    tipo: "Revendedor",
    cadastro: "2023-11-12T11:08:59",
    pedidos: 8,
    gasto_total: 1560.90,
    status: "Ativo"
  },
  {
    id: "user-5",
    nome: "Admin",
    email: "admin@example.com",
    tipo: "Administrador",
    cadastro: "2023-01-01T00:00:00",
    pedidos: 0,
    gasto_total: 0,
    status: "Ativo"
  },
  {
    id: "user-6",
    nome: "Juliana Ferreira",
    email: "juliana.ferreira@email.com",
    tipo: "Cliente",
    cadastro: "2024-02-18T14:30:25",
    pedidos: 3,
    gasto_total: 427.30,
    status: "Inativo"
  },
  {
    id: "user-7",
    nome: "Eduardo Moreira",
    email: "eduardo.moreira@email.com",
    tipo: "Cliente",
    cadastro: "2024-01-05T09:45:12",
    pedidos: 1,
    gasto_total: 139.90,
    status: "Inativo"
  }
];

// Interface para os usuários
interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: "Cliente" | "Revendedor" | "Administrador";
  cadastro: string;
  pedidos: number;
  gasto_total: number;
  status: "Ativo" | "Inativo";
}

// Mock de pedidos por usuário
const mockPedidosPorUsuario = {
  "user-1": [
    { id: "8734", data: "2024-05-01T10:23:45", total: 289.90, status: "Entregue" },
    { id: "8720", data: "2024-04-15T14:22:33", total: 119.90, status: "Entregue" },
    { id: "8701", data: "2024-03-30T09:45:18", total: 209.80, status: "Entregue" },
    { id: "8685", data: "2024-03-12T16:33:42", total: 89.90, status: "Entregue" },
    { id: "8640", data: "2024-02-28T11:14:29", total: 99.90, status: "Entregue" }
  ],
  "user-2": [
    { id: "8733", data: "2024-05-01T09:15:22", total: 572.80, status: "Em trânsito" },
    { id: "8725", data: "2024-04-22T10:35:40", total: 239.80, status: "Entregue" },
    { id: "8712", data: "2024-04-10T15:18:33", total: 179.80, status: "Entregue" }
    // ... outros pedidos
  ]
};

const UsersPage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filtrar usuários com base na pesquisa, tipo e status
  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchesFiltro = 
      usuario.nome.toLowerCase().includes(filtro.toLowerCase()) || 
      usuario.email.toLowerCase().includes(filtro.toLowerCase());
    
    const matchesTipo = tipoFiltro === "Todos" || usuario.tipo === tipoFiltro;
    const matchesStatus = statusFiltro === "Todos" || usuario.status === statusFiltro;
    
    return matchesFiltro && matchesTipo && matchesStatus;
  });

  // Visualizar detalhes de um usuário
  const handleVerDetalhes = (usuario: Usuario) => {
    setUsuarioAtual(usuario);
    setDialogOpen(true);
  };

  // Formatar data para exibição
  const formatarData = (dataString: string) => {
    try {
      return format(parseISO(dataString), "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
      return dataString;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Gerenciar Usuários</CardTitle>
          <CardDescription>
            Visualize e gerencie os usuários da sua loja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-8"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Tipo: {tipoFiltro}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTipoFiltro("Todos")}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTipoFiltro("Cliente")}>
                    Cliente
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTipoFiltro("Revendedor")}>
                    Revendedor
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTipoFiltro("Administrador")}>
                    Administrador
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Status: {statusFiltro}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFiltro("Todos")}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFiltro("Ativo")}>
                    Ativo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFiltro("Inativo")}>
                    Inativo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="text-right">Pedidos</TableHead>
                  <TableHead className="text-right">Total Gasto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      Nenhum usuário encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  usuariosFiltrados.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-geek-accent rounded-full flex items-center justify-center text-white">
                            {usuario.nome.charAt(0).toUpperCase()}
                          </div>
                          <span>{usuario.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Badge className={
                          usuario.tipo === "Administrador" 
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-200" 
                            : usuario.tipo === "Revendedor" 
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }>
                          {usuario.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatarData(usuario.cadastro)}</TableCell>
                      <TableCell className="text-right">{usuario.pedidos}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(usuario.gasto_total)}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          usuario.status === "Ativo" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }>
                          {usuario.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleVerDetalhes(usuario)}
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

      {/* Diálogo de detalhes do usuário */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Detalhes do Usuário
            </DialogTitle>
            <DialogDescription>
              {usuarioAtual?.nome} ({usuarioAtual?.email})
            </DialogDescription>
          </DialogHeader>
          
          {usuarioAtual && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Informações Gerais</h4>
                    <div className="rounded-md border p-3 space-y-2 bg-gray-50">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">ID:</span>
                        <span className="font-medium text-sm">{usuarioAtual.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Nome:</span>
                        <span className="font-medium text-sm">{usuarioAtual.nome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Email:</span>
                        <span className="font-medium text-sm">{usuarioAtual.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Tipo:</span>
                        <Badge className={
                          usuarioAtual.tipo === "Administrador" 
                            ? "bg-purple-100 text-purple-800" 
                            : usuarioAtual.tipo === "Revendedor" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800"
                        }>
                          {usuarioAtual.tipo}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Status:</span>
                        <Badge className={
                          usuarioAtual.status === "Ativo" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }>
                          {usuarioAtual.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Estatísticas do Usuário</h4>
                    <div className="rounded-md border p-3 space-y-2 bg-gray-50">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Data de Cadastro:</span>
                        <span className="font-medium text-sm">{formatarData(usuarioAtual.cadastro)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Total de Pedidos:</span>
                        <span className="font-medium text-sm">{usuarioAtual.pedidos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Valor Total Gasto:</span>
                        <span className="font-medium text-sm">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(usuarioAtual.gasto_total)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Ticket Médio:</span>
                        <span className="font-medium text-sm">
                          {usuarioAtual.pedidos > 0 
                            ? new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(usuarioAtual.gasto_total / usuarioAtual.pedidos)
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium mb-1">Últimos Pedidos</h4>
                  {mockPedidosPorUsuario[usuarioAtual.id as keyof typeof mockPedidosPorUsuario] ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockPedidosPorUsuario[usuarioAtual.id as keyof typeof mockPedidosPorUsuario]
                            .slice(0, 5)
                            .map((pedido) => (
                              <TableRow key={pedido.id}>
                                <TableCell className="font-medium">#{pedido.id}</TableCell>
                                <TableCell>{formatarData(pedido.data)}</TableCell>
                                <TableCell className="text-right">
                                  {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                  }).format(pedido.total)}
                                </TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    pedido.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                                    pedido.status === 'Em trânsito' ? 'bg-blue-100 text-blue-800' :
                                    pedido.status === 'Processando' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {pedido.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="rounded-md border p-4 text-center text-gray-500">
                      Nenhum pedido encontrado para este usuário
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
