import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'https://nortus-challenge.api.stage.loomi.com.br',
});

api.interceptors.request.use(async (config) => {
  let token: string | undefined = undefined;
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const store = await cookies();
    token = store.get('access_token')?.value;
  }
  config.headers = config.headers ?? {};
  config.headers.Accept = 'application/json';
  if (token) {
    (config.headers as Record<string, string>).Authorization =
      `Bearer ${token}`;
  }
  return config;
});

export class BaseCrud<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(id: string): Promise<T> {
    return await api.get(`${this.endpoint}/${id}`);
  }

  async getSegment<R = T>(
    segment: string,
    params?: Record<string, unknown>
  ): Promise<R> {
    return await api.get(`${this.endpoint}/${segment}`, { params });
  }

  async getAll<R = T>(): Promise<R[]> {
    return await api.get(this.endpoint);
  }

  async post(data: T): Promise<T> {
    return await api.post(this.endpoint, data);
  }

  async put(id: string, data: T): Promise<T> {
    return await api.put(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`${this.endpoint}/${id}`);
  }

  async patch(id: string): Promise<T> {
    return await api.patch(`${this.endpoint}/${id}`);
  }
}
