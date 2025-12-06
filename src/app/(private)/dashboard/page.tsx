'use client';

import { useQuery } from '@tanstack/react-query';

import { dashboardService } from '@/app/services/dashboard.service';
import { mapService } from '@/app/services/map.service';
import Card from '@/components/ui/Cards';

import ClientsMap from './_components/ClientsMap';
import ConversionBarChart from './_components/ConversionBarChart';
import KpiTrendsChart from './_components/KpiTrendsChart';

export default function Dashboard() {
  const { data: nortusVumDashboard, isLoading: isLoadingNortusVumDashboard } =
    useQuery({
      queryKey: ['nortusVumDashboard'],
      queryFn: dashboardService.getDashboard,
      structuralSharing: true,
      retry: 2,
      retryDelay: 1000,
      staleTime: 10 * 1000,
      gcTime: 5 * 60 * 1000,
    });

  const { data: mapLocations, isLoading: isLoadingMapLocations } = useQuery({
    queryKey: ['mapLocations'],
    queryFn: mapService.getLocations,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex flex-col gap-10">
      <section className="grid grid-cols-3 gap-10">
        <Card className="col-span-2 w-full">
          <KpiTrendsChart
            isLoading={isLoadingNortusVumDashboard}
            kpis={nortusVumDashboard?.kpisTrend}
          />
        </Card>
        <Card className="max-w-xl">
          <ConversionBarChart
            isLoading={isLoadingNortusVumDashboard}
            kpis={nortusVumDashboard?.kpisTrend}
          />
        </Card>
      </section>
      <section>
        <Card className="w-full">
          <ClientsMap isLoading={isLoadingMapLocations} infos={mapLocations} />
        </Card>
      </section>
    </div>
  );
}
