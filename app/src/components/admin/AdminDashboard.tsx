'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UcapanAdminItem = {
  id: number;
  nama_ketik: string;
  pesan: string;
  dibuat_pada: string;
  disetujui: boolean;
  disetujui_pada: string | null;
};

type Counts = {
  total: number;
  approved: number;
  pending: number;
};

type Filter = 'pending' | 'approved' | 'all';

const FILTER_LABELS: Record<Filter, string> = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  all: 'Semua',
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : dateFormatter.format(date);
}

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('pending');
  const [items, setItems] = useState<UcapanAdminItem[]>([]);
  const [counts, setCounts] = useState<Counts>({ total: 0, approved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/ucapan?status=${filter}`, { cache: 'no-store' });

      if (res.status === 401) {
        router.refresh();
        return;
      }

      if (!res.ok) throw new Error('Gagal memuat ucapan');

      const json = (await res.json()) as {
        data?: UcapanAdminItem[];
        counts?: Counts;
      };

      setItems(Array.isArray(json.data) ? json.data : []);
      if (json.counts) setCounts(json.counts);
    } catch {
      setError('Daftar ucapan belum dapat dimuat.');
    } finally {
      setLoading(false);
    }
  }, [filter, router]);

  useEffect(() => {
    void load();
  }, [load]);

  const changeFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    setNotice('');
    setError('');
  };

  const updateItem = async (id: number, disetujui: boolean) => {
    if (busyId !== null) return;

    setBusyId(id);
    setError('');
    setNotice('');

    try {
      const res = await fetch(`/api/admin/ucapan/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disetujui }),
      });

      if (res.status === 401) {
        router.refresh();
        return;
      }

      if (!res.ok) throw new Error('Gagal memperbarui ucapan');

      setNotice(disetujui ? 'Ucapan disetujui.' : 'Persetujuan dibatalkan.');
      await load();
    } catch {
      setError('Gagal memperbarui ucapan. Silakan coba lagi.');
    } finally {
      setBusyId(null);
    }
  };

  const deleteItem = async (id: number) => {
    if (busyId !== null) return;
    if (!window.confirm('Hapus ucapan ini?')) return;

    setBusyId(id);
    setError('');
    setNotice('');

    try {
      const res = await fetch(`/api/admin/ucapan/${id}`, { method: 'DELETE' });

      if (res.status === 401) {
        router.refresh();
        return;
      }

      if (!res.ok) throw new Error('Gagal menghapus ucapan');

      setNotice('Ucapan dihapus.');
      await load();
    } catch {
      setError('Gagal menghapus ucapan. Silakan coba lagi.');
    } finally {
      setBusyId(null);
    }
  };

  const logout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[3px] border border-navy/10 bg-white px-4 py-3">
        <p className="break-words text-sm text-muted">
          Masuk sebagai <strong className="text-ink">{email}</strong>
        </p>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="inline-flex min-h-11 items-center justify-center rounded-sm border border-navy/20 px-4 text-sm text-ink disabled:opacity-60"
        >
          {loggingOut ? 'Keluar...' : 'Keluar'}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(FILTER_LABELS) as Filter[]).map((key) => {
          const count =
            key === 'pending' ? counts.pending : key === 'approved' ? counts.approved : counts.total;
          const active = filter === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => changeFilter(key)}
              aria-pressed={active}
              disabled={loading || busyId !== null}
              className={`inline-flex min-h-11 items-center justify-center rounded-sm border px-4 text-sm transition disabled:opacity-60 ${
                active
                  ? 'border-gold bg-gold text-[#2a1f04]'
                  : 'border-navy/20 bg-white text-ink hover:border-gold'
              }`}
            >
              {FILTER_LABELS[key]} ({count})
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading || busyId !== null}
          className="inline-flex min-h-11 items-center justify-center rounded-sm border border-navy/20 bg-white px-4 text-sm text-ink transition hover:border-gold disabled:opacity-60"
        >
          {loading ? 'Memuat...' : 'Muat ulang'}
        </button>
      </div>

      {notice && (
        <p role="status" aria-live="polite" className="mt-4 text-sm text-green-700">
          {notice}
        </p>
      )}

      {error && (
        <div className="mt-4">
          <p role="alert" aria-live="polite" className="text-sm text-red-700">
            {error}
          </p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded-sm border border-navy/20 px-4 text-sm text-ink"
          >
            Coba lagi
          </button>
        </div>
      )}

      <div className="mt-5 space-y-4" aria-live="polite">
        {loading ? (
          <p className="text-sm text-muted">Memuat ucapan...</p>
        ) : items.length === 0 ? (
          <p className="rounded-[3px] border border-navy/10 bg-white p-5 text-sm text-muted">
            {filter === 'pending'
              ? 'Tidak ada ucapan yang menunggu persetujuan.'
              : filter === 'approved'
                ? 'Belum ada ucapan yang disetujui.'
                : 'Belum ada ucapan.'}
          </p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-[3px] border border-navy/10 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="break-words font-medium text-ink">{item.nama_ketik}</p>
                  <p className="mt-1 text-xs text-muted">{formatDate(item.dibuat_pada)}</p>
                </div>
                <span
                  className={`inline-flex min-h-7 items-center rounded-full px-2.5 text-xs ${
                    item.disetujui
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {item.disetujui ? 'Disetujui' : 'Menunggu'}
                </span>
              </div>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm text-ink/90">{item.pesan}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {!item.disetujui ? (
                  <button
                    type="button"
                    onClick={() => void updateItem(item.id, true)}
                    disabled={busyId !== null}
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-gold bg-gold px-4 text-sm text-[#2a1f04] disabled:opacity-60"
                  >
                    {busyId === item.id ? 'Menyimpan...' : 'Setujui'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void updateItem(item.id, false)}
                    disabled={busyId !== null}
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-navy/20 bg-white px-4 text-sm text-ink disabled:opacity-60"
                  >
                    {busyId === item.id ? 'Menyimpan...' : 'Batalkan'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => void deleteItem(item.id)}
                  disabled={busyId !== null}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-red-200 bg-white px-4 text-sm text-red-700 disabled:opacity-60"
                >
                  Hapus
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
