'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Formatter } from 'recharts/types/component/DefaultTooltipContent';

import Button from '@/components/ui/Button';
import Title from '@/components/ui/Title';

type Props = {
  isLoading: boolean;
  kpis: NortusResponse['kpisTrend'] | undefined;
};

export default function KpiTrendsChart({ isLoading, kpis }: Props) {
  const labels = useMemo(() => kpis?.labels ?? [], [kpis]);
  const arpu = useMemo(() => kpis?.arpuTrend?.data ?? [], [kpis]);
  const conversion = useMemo(() => kpis?.conversionTrend?.data ?? [], [kpis]);
  const churn = useMemo(() => kpis?.churnTrend?.data ?? [], [kpis]);
  const retention = useMemo(() => kpis?.retentionTrend?.data ?? [], [kpis]);

  const arpuK = useMemo(
    () => arpu.map((v) => (typeof v === 'number' ? v / 1000 : v)),
    [arpu]
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isValid =
    labels.length > 0 &&
    arpu.length === labels.length &&
    conversion.length === labels.length &&
    churn.length === labels.length &&
    retention.length === labels.length;

  const data = useMemo(
    () =>
      isValid
        ? labels.map((label, i) => ({
            label,
            arpu: arpuK[i] ?? null,
            conversion: conversion[i] ?? null,
            churn: churn[i] ?? null,
            retention: retention[i] ?? null,
          }))
        : [],
    [isValid, labels, arpuK, conversion, churn, retention]
  );

  const filters = [
    { label: 'Retenção', key: 'retention' },
    { label: 'Conversão', key: 'conversion' },
    { label: 'Churn', key: 'churn' },
    { label: 'ARPU', key: 'arpu' },
  ];
  const selectedArr = (
    searchParams.get('series') || 'retention,conversion,churn,arpu'
  )
    .split(',')
    .filter((k) => ['retention', 'conversion', 'churn', 'arpu'].includes(k));
  const selected = useMemo(() => new Set<string>(selectedArr), [selectedArr]);
  const [filterError, setFilterError] = useState<string>('');

  const tooltipFormatter: Formatter<string | number, string> = (
    value,
    name,
    item
  ) => {
    const ARPU = item && String(item.dataKey) === 'arpu';
    if (ARPU) return [`${value}k`, 'ARPU (k)'];
    return [value, name];
  };

  const applySelectedToUrl = useCallback(
    (setVal: Set<string>) => {
      try {
        const seriesStr = Array.from(setVal).join(',');
        const url = seriesStr
          ? `${pathname}?series=${encodeURIComponent(seriesStr)}`
          : pathname;
        router.replace(url);
        setFilterError('');
      } catch {
        setFilterError('Falha ao aplicar filtro');
      }
    },
    [pathname, router]
  );

  const toggleFilter = (key: string) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    applySelectedToUrl(next);
  };

  if (!isValid) {
    return (
      <div
        className="w-full h-40 flex-center text-slate-300"
        aria-live="polite"
      >
        Dados do dashboard indisponíveis.
      </div>
    );
  }

  if (filterError) {
    return (
      <div className="w-full h-10 flex-center text-red-400" aria-live="polite">
        {filterError}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div id="cardTop" className="flex justify-between items-center mb-6">
        <Title variant="default">{`Evolução dos KPI's`}</Title>
        <div
          id="buttons-filter"
          className="flex-center bg-[rgba(255,255,255,0.05)] py-1.5 px-3 gap-3 rounded-4xl"
        >
          {filters.map((filter) => (
            <Button
              key={filter.key}
              fullWidth={false}
              variant="filter"
              active={selected.has(filter.key)}
              onClick={() => toggleFilter(filter.key)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
      <div id="cardBody">
        {selected.size === 0 ? (
          <div
            className="w-full h-40 flex-center text-slate-300"
            aria-live="polite"
          >
            Nenhum dataset selecionado.
          </div>
        ) : (
          <div
            className="w-full h-[208px]"
            role="img"
            aria-label="Gráfico de evolução dos KPI's"
          >
            <ResponsiveContainer width="100%" height="100%" aspect={16 / 6}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(55,220,225)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(55,220,225)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient
                    id="conversionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8BC34A" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8BC34A" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="churnGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FF5252" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FF5252" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="retentionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FFC107" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FFC107" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#E3E3E3', fontSize: 12 }}
                  axisLine={{ stroke: '#E3E3E3', strokeWidth: 1 }}
                />
                <YAxis
                  tick={{ fill: '#E3E3E3', fontSize: 12 }}
                  axisLine={{ stroke: '#E3E3E3', strokeWidth: 1 }}
                />
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <Tooltip
                  cursor={{ stroke: '#E3E3E3', strokeOpacity: 0.2 }}
                  contentStyle={{
                    backgroundColor: '#0B1125',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: '#E3E3E3',
                  }}
                  formatter={tooltipFormatter}
                />
                <Legend wrapperStyle={{ color: '#E3E3E3' }} />
                {selected.has('arpu') && (
                  <Area
                    type="monotone"
                    dataKey="arpu"
                    name="ARPU (k)"
                    stroke="#37DCE1"
                    fill="url(#tealGradient)"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={data.length <= 300}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                )}
                {selected.has('conversion') && (
                  <Area
                    type="monotone"
                    dataKey="conversion"
                    name="Conversão"
                    stroke="#8BC34A"
                    fill="url(#conversionGradient)"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={data.length <= 300}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                )}
                {selected.has('churn') && (
                  <Area
                    type="monotone"
                    dataKey="churn"
                    name="Churn"
                    stroke="#FF5252"
                    fill="url(#churnGradient)"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={data.length <= 300}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                )}
                {selected.has('retention') && (
                  <Area
                    type="monotone"
                    dataKey="retention"
                    name="Retenção"
                    stroke="#FFC107"
                    fill="url(#retentionGradient)"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={data.length <= 300}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
