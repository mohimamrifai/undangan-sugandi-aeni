'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { SilkPattern } from './accent/Brand';
import { Ornament } from './accent/Ornament';

type UcapanItem = {
  id: number;
  nama_ketik: string;
  pesan: string;
  dibuat_pada: string;
};

type Status = { type: 'ok' | 'error'; message: string } | null;

const inputClass =
  'w-full min-h-12 rounded-sm border border-navy/20 bg-white px-3.5 py-3 text-base text-ink focus:border-gold focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-gold';

export default function UcapanSection() {
  const [list, setList] = useState<UcapanItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [nama, setNama] = useState('');
  const [pesan, setPesan] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const load = useCallback(async (showLoading = true) => {
    if (showLoading) setListLoading(true);

    try {
      const res = await fetch('/api/ucapan', { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal memuat ucapan');

      const json = (await res.json()) as { data?: UcapanItem[] };
      setList(Array.isArray(json.data) ? json.data : []);
      setListError('');
    } catch {
      if (showLoading) setListError('Daftar ucapan belum dapat dimuat.');
    } finally {
      if (showLoading) setListLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        void load(false);
      }
    }, 20000);

    return () => window.clearInterval(interval);
  }, [load]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (busy) return;

    const cleanNama = nama.trim();
    const cleanPesan = pesan.trim();

    if (cleanNama.length < 2) {
      setStatus({ type: 'error', message: 'Nama minimal 2 karakter.' });
      return;
    }

    if (!cleanPesan) {
      setStatus({ type: 'error', message: 'Ucapan tidak boleh kosong.' });
      return;
    }

    setBusy(true);
    setStatus(null);

    try {
      const res = await fetch('/api/ucapan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_ketik: cleanNama, pesan: cleanPesan }),
      });

      if (!res.ok) throw new Error('Gagal mengirim ucapan');

      setNama('');
      setPesan('');
      setStatus({
        type: 'ok',
        message: 'Ucapan sudah terkirim dan akan tampil otomatis setelah disetujui admin.',
      });
    } catch {
      setStatus({ type: 'error', message: 'Gagal mengirim. Silakan coba lagi.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-16">
      <SilkPattern />
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Ucapan &amp; Doa</p>
        <h2 className="my-3.5 font-serif text-[clamp(28px,7vw,38px)] leading-tight">
        <Ornament className="mt-4 " />
          Kirimkan Doa
        </h2>
        <p className="mx-auto max-w-lg text-base text-muted">
          Tulis doa dan ucapan untuk kedua mempelai. Ucapan akan tampil setelah disetujui admin.
        </p>

        <form onSubmit={submit} className="mx-auto mt-5 max-w-md text-left">
          <label
            htmlFor="nama-ketik"
            className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted"
          >
            Nama tampilan
          </label>
          <input
            id="nama-ketik"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            autoComplete="name"
            maxLength={60}
            required
            disabled={busy}
            className={inputClass}
          />
          <label
            htmlFor="ucapan-pesan"
            className="mb-1.5 mt-3.5 block text-xs uppercase tracking-[0.14em] text-muted"
          >
            Ucapan untuk mempelai
          </label>
          <textarea
            id="ucapan-pesan"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Tulis doa atau ucapan"
            maxLength={500}
            required
            disabled={busy}
            className={`${inputClass} min-h-24 resize-y`}
          />
          <button
            type="submit"
            disabled={busy}
            className="btn-sheen mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-sm border border-gold bg-gradient-to-b from-[#ecd79b] to-gold px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2a1f04] transition hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60"
          >
            {busy ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>

        {status && (
          <p
            role={status.type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={`mt-4 text-center text-sm ${
              status.type === 'error' ? 'text-red-700' : 'text-green-700'
            }`}
          >
            {status.message}
          </p>
        )}

        <div className="mt-10 text-left" aria-live="polite">
          <h3 className="mb-4 text-center font-serif text-2xl text-navy2">Ucapan terbaru</h3>

          {listLoading ? (
            <p className="text-center text-sm text-muted">Memuat ucapan...</p>
          ) : listError ? (
            <div className="text-center">
              <p className="text-sm text-muted">{listError}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-sm border border-navy/20 px-4 text-sm text-ink"
              >
                Coba lagi
              </button>
            </div>
          ) : list.length === 0 ? (
            <p className="text-center text-sm text-muted">
              Belum ada ucapan yang tampil. Jadilah yang pertama mengirim doa.
            </p>
          ) : (
            <div className="space-y-4">
              {list.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[3px] border border-navy/10 bg-white p-5 shadow-sm"
                >
                  <p className="break-words font-medium text-ink">{item.nama_ketik}</p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm text-ink/90">
                    {item.pesan}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
