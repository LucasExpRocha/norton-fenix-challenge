import { NextResponse } from 'next/server';

import { api } from '@/api/axiosConfig';

export const revalidate = 20;

export async function GET() {
  try {
    const { data } = await api.get('/map/locations');
    return NextResponse.json(data);
  } catch (err: unknown) {
    const e = err as { response?: { status?: number; data?: unknown } };
    const status = e.response?.status ?? 500;
    const payload = e.response?.data ?? { message: 'Erro ao buscar locais' };
    return NextResponse.json(payload, { status });
  }
}
