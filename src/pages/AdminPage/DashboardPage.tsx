
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, Package, DollarSign, TrendingUp, Clock, Award } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock de dados para dashboard
const dashboardStats = {
  totalVendas: "R$ 158.345,90",
  pedidosHoje: 8,
  novosClientes: 12,
  produtosAtivos: 128,
  taxaConversao: "3,2%",
  ticketMedio: "R$ 357,22"
};

// Mock para últimos pedidos
const ultimosPedidos = [
  { id: "#8734", cliente: "Ana Silva", data: "01/05/2024", valor: "R$ 289,90", status: "Entregue" },
  { id: "#8733", cliente: "Marcos Oliveira", data: "01/05/2024", valor: "R$ 572,80", status: "Em trânsito" },
  { id: "#8732", cliente: "Camila Santos", data: "30/04/2024", valor: "R$ 189,90", status: "Processando" },
  { id: "#8731", cliente: "Rafael Costa", data: "30/04/2024", valor: "R$ 438,50", status: "Pago" },
  { id: "#8730", cliente: "Juliana Ferreira", data: "29/04/2024", valor: "R$ 257,30", status: "Entregue" }
];

// Mock para produtos mais vendidos
const produtosMaisVendidos = [
  { produto: "Placa Decorativa Game of Thrones", vendas: 47, receita: "R$ 4.277,00" },
  { produto: "Quadro Geek Star Wars Vintage", vendas: 35, receita: "R$ 3.325,00" },
  { produto: "Placa Personalizada Super-heróis", vendas: 29, receita: "R$ 2.784,00" },
  { produto: "Quadro Decorativo Harry Potter", vendas: 24, receita: "R$ 2.160,00" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
            <DollarSign className="w-4 h-4 text-geek-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalVendas}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +15% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
            <ShoppingCart className="w-4 h-4 text-geek-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pedidosHoje}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              2 aguardando processamento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.novosClientes}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +8% em relação à semana anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Package className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.produtosAtivos}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              5 com estoque baixo
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.taxaConversao}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +0,5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Award className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.ticketMedio}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              -2,3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tabela dos últimos pedidos */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Últimos Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ultimosPedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">{pedido.id}</TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell>{pedido.data}</TableCell>
                    <TableCell>{pedido.valor}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pedido.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                        pedido.status === 'Em trânsito' ? 'bg-blue-100 text-blue-800' :
                        pedido.status === 'Processando' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {pedido.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tabela dos produtos mais vendidos */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" /> Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Vendas</TableHead>
                  <TableHead>Receita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtosMaisVendidos.map((produto, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{produto.produto}</TableCell>
                    <TableCell>{produto.vendas}</TableCell>
                    <TableCell>{produto.receita}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
