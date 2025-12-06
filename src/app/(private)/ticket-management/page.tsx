'use client';
import { useQuery } from '@tanstack/react-query';

import { ticketsService } from '@/app/services/tickets.service';

import TicketMetricsHeader from './_components/TicketMetricsHeader';

export default function TicketManagement() {
  const { data: ticketsList, isLoading: isLoadingTicketsList } = useQuery({
    queryKey: ['ticketsList'],
    queryFn: ticketsService.getAllTickets,
    refetchInterval: 20 * 1000,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  return (
    <div>
      <TicketMetricsHeader
        ticketsList={ticketsList}
        isLoading={isLoadingTicketsList}
      />
    </div>
  );
}
