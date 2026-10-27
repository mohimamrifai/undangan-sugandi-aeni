import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  getAdminCookieOptions,
  isSameOrigin,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Permintaan tidak valid' }, { status: 403 });
  }

  const response = NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } },
  );
  response.cookies.set(ADMIN_COOKIE_NAME, '', getAdminCookieOptions(0));

  return response;
}
