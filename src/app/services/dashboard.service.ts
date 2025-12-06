import { toast } from 'sonner'; // ou seu toast library

export const dashboardService = {
  getDashboard: async (): Promise<NortusResponse> => {
    try {
      const res = await fetch('/api/nortus-v1/dashboard');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao buscar dashboard');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao buscar dashboard';

      toast.error(message);
      throw error;
    }
  },
};
export * from './dashboard.service';
