type TicketPriority = 'Urgente' | 'Média' | 'Baixa';

type TicketStatus = 'Aberto' | 'Em andamento' | 'Fechado';

type TicketItem = {
  id: string;
  ticketId: string;
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  status: TicketStatus;
  responsible: string;
  createdAt: string;
  updatedAt: string;
};

type TicketsAllResponse = {
  data: TicketItem[] | null[];
  total: number;
  listed: number;
};
