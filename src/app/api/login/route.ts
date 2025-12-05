import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { decodeJwt } from '@/lib/utils/decodeJwt';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://nortus-challenge.api.stage.loomi.com.br';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  const res = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    const jwt = data.access_token;
    if (!jwt) return NextResponse.json('Invalid token', { status: 400 });

    const { payload } = decodeJwt(jwt);
    if (!payload) return NextResponse.json('Invalid token', { status: 400 });

    cookieStore.set('access_token', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: payload.exp - payload.iat,
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: data.message || 'Login failed' },
    { status: res.status }
  );
}
