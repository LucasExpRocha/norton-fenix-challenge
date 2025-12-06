import Image from 'next/image';
import { useMemo } from 'react';

import Card from '@/components/ui/Cards';
import Title from '@/components/ui/Title';

export default function TicketMetricsHeader({
  ticketsList,
  isLoading,
}: {
  ticketsList?: TicketsAllResponse;
  isLoading: boolean;
}) {
  const tickets = useMemo(() => ticketsList?.data ?? [], [ticketsList]);

  const open = tickets.filter((t) => t && t.status === 'Aberto').length;
  const progress = tickets.filter(
    (t) => t && t.status === 'Em andamento'
  ).length;

  const today = new Date();
  const solvedToday = tickets.filter((t) => {
    if (t && t.status !== 'Fechado') return false;
    const d = new Date(t!.updatedAt);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  }).length;

  const closed = tickets.filter((t) => t && t.status === 'Fechado');
  const timeAvg = closed.length
    ? Number(
        (
          closed
            .map(
              (t) =>
                (new Date(t!.updatedAt).getTime() -
                  new Date(t!.createdAt).getTime()) /
                36e5
            )
            .reduce((a, b) => a + b, 0) / closed.length
        ).toFixed(1)
      )
    : 0;

  const metrics = [
    {
      title: 'Ticket aberto',
      icon: '/svgs/ticketAberto.svg',
      value: open,
    },
    {
      title: 'Em andamento',
      icon: '/svgs/emAndamento.svg',
      value: progress,
    },
    {
      title: 'Resolvidos hoje',
      icon: '/svgs/resolvidosHoje.svg',
      value: solvedToday,
    },
    {
      title: 'Tempo médio',
      icon: '/svgs/tempoMedio.svg',
      value: timeAvg,
      unit: 'h',
    },
  ];
  return (
    <header className="grid grid-cols-4 gap-6" aria-label="Métricas de tickets">
      {metrics.map((metric) => (
        <Card
          key={metric.title}
          aria-label={`${metric.title} ${metric.value} ${metric.unit}`}
        >
          <div className="flex flex-col justify-between gap-8">
            <Title variant="subtitle">{metric.title}</Title>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Title>{metric.value}</Title>
                <Title>{metric.unit}</Title>
              </div>
              <Image
                src={metric.icon}
                alt={metric.title}
                width={32}
                height={32}
              />
            </div>
          </div>
        </Card>
      ))}
    </header>
  );
}
