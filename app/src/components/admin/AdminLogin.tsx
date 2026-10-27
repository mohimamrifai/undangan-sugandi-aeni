'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const inputClass =
  'w-full min-h-12 rounded-sm border border-navy/20 bg-white px-3.5 py-3 text-base text-ink focus:border-gold focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-gold';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'Email atau password salah.');
        return;
      }

      router.refresh();
    } catch {
      setError('Tidak dapat terhubung. Silakan coba lagi.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-[3px] border border-navy/10 bg-white p-6 shadow-sm">
      <p className="text-center text-sm text-muted">
        Masuk untuk menyetujui ucapan yang masuk.
      </p>

      <form onSubmit={submit} className="mt-5">
        <label
          htmlFor="admin-email"
          className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted"
        >
          Email admin
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          disabled={busy}
          className={inputClass}
        />

        <label
          htmlFor="admin-password"
          className="mb-1.5 mt-3.5 block text-xs uppercase tracking-[0.14em] text-muted"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          disabled={busy}
          className={inputClass}
        />

        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-sm border border-gold bg-gradient-to-b from-[#ecd79b] to-gold px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2a1f04] transition hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60"
        >
          {busy ? 'Memeriksa...' : 'Masuk'}
        </button>
      </form>

      {error && (
        <p role="alert" aria-live="polite" className="mt-4 text-center text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
