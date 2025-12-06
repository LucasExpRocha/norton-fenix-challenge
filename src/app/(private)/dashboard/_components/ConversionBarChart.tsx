'use client';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

import Title from '@/components/ui/Title';

type Props = {
  isLoading: boolean;
  kpis: NortusResponse['kpisTrend'] | undefined;
};

export default function ConversionBarChart({ isLoading, kpis }: Props) {
  const labels = kpis?.labels ?? [];
  const conversion = kpis?.conversionTrend?.data ?? [];

  const isValid = labels.length > 0 && conversion.length === labels.length;

  const data = useMemo(
    () =>
      isValid
        ? labels.map((label, i) => ({
            label,
            conversion: conversion[i] ?? null,
          }))
        : [],
    [isValid, labels, conversion]
  );

  if (!isValid) {
    return (
      <div
        className="w-full h-40 flex-center text-slate-300"
        aria-live="polite"
      >
        Dados de conversão indisponíveis.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        id="cardTop"
        className="flex justify-between items-center mb-6 w-full h-14"
      >
        <Title variant="default">Conversão</Title>
      </div>
      <div id="cardBody">
        <div
          className="w-full h-[240px]"
          role="img"
          aria-label="Gráfico de barras de conversão"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <defs>
                <linearGradient
                  id="barConversionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(117,221,252)"
                    stopOpacity={0.7}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(117,221,252)"
                    stopOpacity={0}
                  />
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
                cursor={{ fill: 'rgba(227,227,227,0.08)' }}
                contentStyle={{
                  backgroundColor: '#0B1125',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  color: '#E3E3E3',
                }}
              />
              <Legend wrapperStyle={{ color: '#E3E3E3' }} />
              <Bar
                dataKey="conversion"
                name="Novos usuários"
                stroke="rgba(55,220,225,0.1)"
                fill="url(#barConversionGradient)"
                maxBarSize={40}
                isAnimationActive={data.length <= 300}
                animationDuration={600}
                animationEasing="ease-in-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
