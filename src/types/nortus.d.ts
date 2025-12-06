declare namespace Nortus {
  type KpiTrendSeries = {
    name: string;
    data: number[];
  };

  type KpisTrend = {
    labels: string[];
    arpuTrend: KpiTrendSeries;
    conversionTrend: KpiTrendSeries;
    churnTrend: KpiTrendSeries;
    retentionTrend: KpiTrendSeries;
  };

  type KpiResumeItem = {
    valor: number;
    variacao: number;
  };

  type KpisResume = {
    arpu: KpiResumeItem;
    conversion: KpiResumeItem;
    retention: KpiResumeItem;
    churn: KpiResumeItem;
  };

  type SegmentItem = {
    nome: string;
    valor: number;
  };

  type ActiveClientFilters = {
    status: string[];
    secureType: string[];
    locations: string[];
  };

  type ActiveClientItem = {
    id: string;
    name: string;
    email: string;
    secureType: string;
    monthValue: number;
    status: string;
    renewalDate: string;
    location: string;
  };

  type ActiveClientsSection = {
    filters: ActiveClientFilters;
    data: ActiveClientItem[];
  };

  type Dashboard = {
    kpisTrend: KpisTrend;
    kpisResume: KpisResume;
    segments: SegmentItem[];
    activeClients: ActiveClientsSection;
  };
}
