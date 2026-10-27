'use client';

import { FormEvent, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const inputClass =
  'w-full min-h-12 rounded-sm border border-navy/20 bg-white px-3.5 py-3 text-base text-ink focus:border-gold focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-gold';

type Status = 'idle' | 'loading' | 'ok' | 'err';

export default function RsvpSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      nama: String(fd.get('nama') ?? '').trim(),
      jumlah: String(fd.get('jumlah') ?? ''),
      kehadiran: String(fd.get('kehadiran') ?? ''),
      ucapan: String(fd.get('ucapan') ?? '').trim(),
    };

    setStatus('loading');
    setErrorMessage('');

    let message = 'Gagal mengirim. Silakan coba lagi.';

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        if (data?.error) message = data.error;
        throw new Error('request-failed');
      }

      form.reset();
      setStatus('ok');
    } catch {
      setStatus('err');
      setErrorMessage(message);
    }
  };

  return (
    <section id="rsvp" className="bg-ivory px-5 py-16">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
          Konfirmasi Kehadiran
        </p>
        <h2 className="my-3.5 font-serif text-[clamp(28px,7vw,38px)] leading-tight">RSVP</h2>
        <p className="mx-auto max-w-lg text-base text-muted">
          Mohon konfirmasi kehadiran agar kami dapat menyiapkan tempat dengan baik.
        </p>
        <form onSubmit={submit} className="mx-auto mt-5 max-w-md text-left">
          <label
            htmlFor="nama"
            className="mb-1.5 mt-3.5 block text-xs uppercase tracking-[0.14em] text-muted"
          >
            Nama
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            placeholder="Nama Anda"
            autoComplete="name"
            maxLength={80}
            required
            disabled={status === 'loading'}
            className={inputClass}
          />
          <label
            htmlFor="jumlah"
            className="mb-1.5 mt-3.5 block text-xs uppercase tracking-[0.14em] text-muted"
          >
            Jumlah tamu
          </label>
          <select
            id="jumlah"
            name="jumlah"
            disabled={status === 'loading'}
            className={inputClass}
          >
            <option>1 orang</option>
            <option>2 orang</option>
            <option>3 orang</option>
            <option>4 orang</option>
            <option>Lebih dari 4</option>
          </select>
          <label
            htmlFor="hadir"
            className="mb-1.5 mt-3.5 block text-xs uppercase tracking-[0.14em] text-muted"
          >
            Kehadiran
          </label>
          <select
            id="hadir"
            name="kehadiran"
            disabled={status === 'loading'}
            className={inputClass}
          >
            <option>Hadir</option>
            <option>Berhalangan hadir</option>
          </select>
          <label
            htmlFor="pesan"
            className="mb-1.5 mt-3.5 block text-xs uppercase tracking-[0.14em] text-muted"
          >
            Ucapan &amp; doa
          </label>
          <textarea
            id="pesan"
            name="ucapan"
            placeholder="Tulis doa atau ucapan untuk kedua mempelai"
            maxLength={500}
            disabled={status === 'loading'}
            className={`${inputClass} min-h-24 resize-y`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-sm border border-gold bg-gradient-to-b from-[#ecd79b] to-gold px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2a1f04] transition hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60"
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim RSVP'}
          </button>
          {status === 'ok' && (
            <p role="status" aria-live="polite" className="mt-3 text-center text-sm text-green-700">
              Terima kasih, konfirmasi berhasil dikirim.
            </p>
          )}
          {status === 'err' && (
            <p role="alert" aria-live="polite" className="mt-3 text-center text-sm text-red-700">
              {errorMessage}
            </p>
          )}
          <p className="mt-3 text-center text-sm text-muted">
            Data hanya digunakan untuk konfirmasi kehadiran.
          </p>
        </form>
      </ScrollReveal>
    </section>
  );
}
