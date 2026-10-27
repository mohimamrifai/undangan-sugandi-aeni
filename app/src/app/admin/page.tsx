import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Panel Admin - Undangan Sugandi & Aeni',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  const session = verifyAdminSession(cookies().get(ADMIN_COOKIE_NAME)?.value);

  return (
    <main className="min-h-screen bg-ivory px-5 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-navy/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Panel Admin</p>
            <h1 className="mt-2 font-serif text-3xl text-navy">Ucapan Tamu</h1>
            <p className="mt-1 text-sm text-muted">Undangan Sugandi &amp; Aeni</p>
          </div>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-navy/20 px-4 text-sm text-ink"
          >
            Lihat undangan
          </a>
        </header>

        {session ? <AdminDashboard email={session.email} /> : <AdminLogin />}
      </div>
    </main>
  );
}
