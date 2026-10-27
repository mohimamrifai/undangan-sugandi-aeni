import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminSession,
  getAdminCookieOptions,
  isSameOrigin,
  isValidAdminCredentials,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Permintaan tidak valid' }, { status: 403, headers: NO_STORE });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Data login tidak valid' }, { status: 400, headers: NO_STORE });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidAdminCredentials(email, password)) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json(
      { error: 'Email atau password salah' },
      { status: 401, headers: NO_STORE },
    );
  }

  const session = createAdminSession();
  const response = NextResponse.json({ ok: true }, { headers: NO_STORE });
  response.cookies.set(ADMIN_COOKIE_NAME, session.token, getAdminCookieOptions(session.maxAge));

  return response;
}
