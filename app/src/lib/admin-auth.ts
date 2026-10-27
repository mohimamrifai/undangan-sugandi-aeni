import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'undangan_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

// Akun admin tetap disimpan sebagai environment variable di server.
// Nilai tidak boleh ditulis di source karena repository ini publik.
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('ADMIN_EMAIL dan ADMIN_PASSWORD belum diatur');
}

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? `${ADMIN_EMAIL}:${ADMIN_PASSWORD}:undangan-admin-session`;

export type AdminSession = {
  email: string;
  exp: number;
};

function safeEqual(leftValue: string, rightValue: string) {
  const left = Buffer.from(leftValue);
  const right = Buffer.from(rightValue);

  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function encode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(value: string) {
  return createHmac('sha256', SESSION_SECRET).update(value).digest('base64url');
}

export function isValidAdminCredentials(email: string, password: string) {
  return (
    safeEqual(email.trim().toLowerCase(), ADMIN_EMAIL) &&
    safeEqual(password, ADMIN_PASSWORD)
  );
}

export function createAdminSession() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = encode(JSON.stringify({ email: ADMIN_EMAIL, exp }));
  const token = `${payload}.${sign(payload)}`;

  return { token, maxAge: SESSION_TTL_SECONDS };
}

export function verifyAdminSession(token: string | null | undefined): AdminSession | null {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  if (!payload || !signature) return null;

  if (!safeEqual(signature, sign(payload))) return null;

  try {
    const session = JSON.parse(decode(payload)) as AdminSession;

    if (session.email !== ADMIN_EMAIL) return null;
    if (!Number.isFinite(session.exp) || session.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function getAdminCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  };
}

export function getAdminSessionFromRequest(request: {
  cookies: { get: (name: string) => { value: string } | undefined };
}) {
  return verifyAdminSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function isSameOrigin(request: { headers: Headers; nextUrl: { origin: string } }) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const requestHost = forwardedHost || request.headers.get('host');

    if (requestHost && originHost === requestHost) return true;
  } catch {
    return false;
  }

  return origin === request.nextUrl.origin;
}
