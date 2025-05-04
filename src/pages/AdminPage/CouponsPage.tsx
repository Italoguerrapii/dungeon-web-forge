
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash, Save, Copy } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format, parseISO, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock de cupons
const mockCupons = [
  {
    id: "1",
    codigo: "BEMVINDO15",
    descricao: "15% de desconto para novos clientes",
    tipo: "percentage",
    valor: 15,
    minimo: 0,
    maximo: null,
    uso_unico: true,
    ativo: true,
    valido_ate: "2024-06-30T23:59:59",
    usos: 127,
    usos_max: null
  },
  {
    id: "2",
    codigo: "FRETE10",
    descricao: "R$ 10 de desconto em compras acima de R$ 100",
    tipo: "fixed",
    valor: 10,
    minimo: 100,
    maximo: null,
    uso_unico: false,
    ativo: true,
    valido_ate: "2024-07-15T23:59:59",
    usos: 85,
    usos_max: 200
  },
  {
    id: "3",
    codigo: "GEEKWEEK30",
    descricao: "30% de desconto na semana geek (limite R$ 50)",
    tipo: "percentage",
    valor: 30,
    minimo: 0,
    maximo: 50,
    uso_unico: false,
    ativo: true,
    valido_ate: "2024-05-15T23:59:59",
    usos: 248,
    usos_max: 500
  },
  {
    id: "4",
    codigo: "VOLTA20",
    descricao: "20% para clientes recorrentes",
    tipo: "percentage",
    valor: 20,
    minimo: 150,
    maximo: null,
    uso_unico: true,
    ativo: true,
    valido_ate: "2024-08-31T23:59:59",
    usos: 56,
    usos_max: 100
  },
  {
    id: "5",
    codigo: "PROMO50",
    descricao: "R$ 50 de desconto em pedidos acima de R$ 200",
    tipo: "fixed",
    valor: 50,
    minimo: 200,
    maximo: null,
    uso_unico: true,
    ativo: false,
    valido_ate: "2024-04-30T23:59:59",
    usos: 315,
    usos_max: 300
  }
];

// Schema de validação para o formulário de cupom
const cupomSchema = z.object({
  id: z.string().optional(),
  codigo: z
    .string()
    .min(3, "Código deve ter no mínimo 3 caracteres")
    .max(15, "Código deve ter no máximo 15 caracteres")
    .regex(/^[A-Z0-9]+$/, "Código deve conter apenas letras maiúsculas e números"),
  descricao: z.string().min(5, "Descrição deve ter no mínimo 5 caracteres"),
  tipo: z.enum(["percentage", "fixed"]),
  valor: z.number().positive("Valor deve ser maior que zero"),
  minimo: z.number().min(0, "Valor mínimo deve ser maior ou igual a zero"),
  maximo: z.number().nullable(),
  uso_unico: z.boolean(),
  ativo: z.boolean(),
  valido_ate: z.string(),
  usos: z.number(),
  usos_max: z.number().nullable()
});

type Cupom = z.infer<typeof cupomSchema>;

const CouponsPage = () => {
  const [cupons, setCupons] = useState<Cupom[]>(mockCupons);
  const [filtro, setFiltro] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cupomAtual, setCupomAtual] = useState<Cupom | null>(null);

  // Configuração do formulário com React Hook Form
  const form = useForm<Cupom>({
    resolver: zodResolver(cupomSchema),
    defaultValues: {
      codigo: "",
      descricao: "",
      tipo: "percentage",
      valor: 0,
      minimo: 0,
      maximo: null,
      uso_unico: false,
      ativo: true,
      valido_ate: format(addDays(new Date(), 30), "yyyy-MM-dd'T'23:59:59"),
      usos: 0,
      usos_max: null
    }
  });

  // Filtrar cupons com base na pesquisa
  const cuponsFiltrados = cupons.filter(cupom => 
    cupom.codigo.toLowerCase().includes(filtro.toLowerCase()) || 
    cupom.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  // Abrir o diálogo para criar um novo cupom
  const handleNovoCupom = () => {
    setCupomAtual(null);
    form.reset({
      codigo: "",
      descricao: "",
      tipo: "percentage",
      valor: 0,
      minimo: 0,
      maximo: null,
      uso_unico: false,
      ativo: true,
      valido_ate: format(addDays(new Date(), 30), "yyyy-MM-dd'T'23:59:59"),
      usos: 0,
      usos_max: null
    });
    setDialogOpen(true);
  };

  // Abrir o diálogo para editar um cupom existente
  const handleEditarCupom = (cupom: Cupom) => {
    setCupomAtual(cupom);
    form.reset({
      ...cupom
    });
    setDialogOpen(true);
  };

  // Abrir o diálogo de confirmação para excluir um cupom
  const handleExcluirConfirmacao = (cupom: Cupom) => {
    setCupomAtual(cupom);
    setDeleteDialogOpen(true);
  };

  // Excluir o cupom
  const handleExcluirCupom = () => {
    if (cupomAtual) {
      setCupons(cupons.filter(c => c.id !== cupomAtual.id));
      toast({
        title: "Cupom excluído",
        description: `O cupom "${cupomAtual.codigo}" foi excluído com sucesso.`
      });
      setDeleteDialogOpen(false);
    }
  };

  // Salvar o cupom (criar ou atualizar)
  const onSubmit = (data: Cupom) => {
    // Se for edição, atualize o cupom existente
    if (cupomAtual) {
      const novosCupons = cupons.map(c => {
        if (c.id === cupomAtual.id) {
          return {
            ...data,
            id: cupomAtual.id
          };
        }
        return c;
      });
      
      setCupons(novosCupons);
      toast({
        title: "Cupom atualizado",
        description: `O cupom "${data.codigo}" foi atualizado com sucesso.`
      });
    } 
    // Se for criação, adicione um novo cupom
    else {
      // Verifica se o código já existe
      const codigoExiste = cupons.some(c => c.codigo === data.codigo);
      
      if (codigoExiste) {
        toast({
          title: "Erro ao criar cupom",
          description: `O código "${data.codigo}" já está em uso.`,
          variant: "destructive"
        });
        return;
      }
      
      const novoCupom = {
        ...data,
        id: `${cupons.length + 1}`,
        usos: 0
      };
      
      setCupons([...cupons, novoCupom]);
      toast({
        title: "Cupom criado",
        description: `O cupom "${data.codigo}" foi criado com sucesso.`
      });
    }
    
    setDialogOpen(false);
  };

  // Copiar código do cupom para a área de transferência
  const handleCopiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast({
      title: "Código copiado",
      description: `O código "${codigo}" foi copiado para a área de transferência.`
    });
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
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Gerenciar Cupons</CardTitle>
            <CardDescription>
              Crie e gerencie cupons de desconto para sua loja
            </CardDescription>
          </div>
          <Button onClick={handleNovoCupom} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Cupom
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar cupons..."
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
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-center">Uso Único</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead className="text-right">Usos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cuponsFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      Nenhum cupom encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  cuponsFiltrados.map((cupom) => (
                    <TableRow key={cupom.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span>{cupom.codigo}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5" 
                            onClick={() => handleCopiarCodigo(cupom.codigo)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span className="sr-only">Copiar</span>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{cupom.descricao}</TableCell>
                      <TableCell>
                        {cupom.tipo === 'percentage' 
                          ? `${cupom.valor}%` 
                          : new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(cupom.valor)
                        }
                        {cupom.maximo && cupom.tipo === 'percentage' && 
                          ` (máx. ${new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(cupom.maximo)})`
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {cupom.uso_unico ? "Sim" : "Não"}
                      </TableCell>
                      <TableCell>{formatarData(cupom.valido_ate)}</TableCell>
                      <TableCell className="text-right">
                        {cupom.usos}{cupom.usos_max ? `/${cupom.usos_max}` : ""}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          cupom.ativo 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }>
                          {cupom.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditarCupom(cupom)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleExcluirConfirmacao(cupom)}
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

      {/* Diálogo de criação/edição de cupom */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {cupomAtual ? `Editar: ${cupomAtual.codigo}` : "Novo Cupom"}
            </DialogTitle>
            <DialogDescription>
              Preencha as informações do cupom de desconto abaixo
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="codigo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código do Cupom</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="BEMVINDO15" 
                          {...field}
                          className="uppercase"
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="15% de desconto para novos clientes" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Desconto</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentage">Porcentagem</SelectItem>
                            <SelectItem value="fixed">Valor Fixo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="valor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("tipo") === "percentage" ? "Porcentagem (%)" : "Valor (R$)"}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step={form.watch("tipo") === "percentage" ? "1" : "0.01"}
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minimo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Mínimo da Compra (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maximo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("tipo") === "percentage" ? "Desconto Máximo (R$)" : "Valor Máximo do Cupom (R$)"}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            placeholder="Sem limite" 
                            {...field}
                            value={field.value === null ? "" : field.value}
                            onChange={(e) => field.onChange(e.target.value === "" ? null : parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="valido_ate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Válido Até</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field}
                            value={field.value ? field.value.substring(0, 10) : ""}
                            onChange={(e) => {
                              const date = e.target.value;
                              field.onChange(`${date}T23:59:59`);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="usos_max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limite de Usos</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Sem limite" 
                            {...field}
                            value={field.value === null ? "" : field.value}
                            onChange={(e) => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="uso_unico"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="uso_unico">Uso único por cliente</Label>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="ativo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="ativo">Cupom ativo</Label>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o cupom "{cupomAtual?.codigo}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleExcluirCupom}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CouponsPage;
