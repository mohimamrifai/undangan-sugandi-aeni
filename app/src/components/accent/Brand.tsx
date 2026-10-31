/**
 * Monogram, bingkai lengkung, motif latar, dan progress baca.
 * Semua digambar sendiri (SVG/CSS), bebas dipakai.
 */
import type { ReactNode } from 'react';

/** Monogram inisial dalam lingkaran emas ganda. */
export function Monogram({
  initials = 'S & A',
  className = '',
  tone = 'gold',
}: {
  initials?: string;
  className?: string;
  tone?: 'gold' | 'navy';
}) {
  const color = tone === 'gold' ? '#c9a24a' : '#16265c';
  return (
    <span
      className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${className}`}
      style={{ border: `1px solid ${color}`, boxShadow: `inset 0 0 0 4px transparent, inset 0 0 0 3px ${color}22` }}
      aria-hidden="true"
    >
      <span
        className="font-serif text-[13px] tracking-[0.14em]"
        style={{ color }}
      >
        {initials}
      </span>
    </span>
  );
}

/** Bingkai lengkung (arch) untuk foto portrait. */
export function ArchFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-t-[999px] border border-gold/50 p-1.5 bg-white/60">
        <div className="overflow-hidden rounded-t-[999px]">{children}</div>
      </div>
    </div>
  );
}

/** Motif daun samar sebagai latar section ivory. */
export function SilkPattern({ className = '' }: { className?: string }) {
  const tile = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
      <g fill='none' stroke='#c9a24a' stroke-width='0.7' opacity='0.5'>
        <path d='M20 10c14 6 22 16 24 30-14-4-22-14-24-30Z'/>
        <path d='M100 110c-14-6-22-16-24-30 14 4 22 14 24 30Z'/>
        <circle cx='60' cy='60' r='2.2'/>
        <path d='M48 60c6-8 18-8 24 0-6 8-18 8-24 0Z'/>
      </g>
    </svg>`,
  );
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-[0.06] ${className}`}
      style={{ backgroundImage: `url("data:image/svg+xml,${tile}")`, backgroundSize: '120px 120px' }}
    />
  );
}

/** Garis emas tipis di atas layar yang mengikuti kemajuan baca. */
export function ReadingProgress() {
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        id="reading-progress"
        className="h-full w-0 bg-gradient-to-r from-gold/40 via-gold to-gold-soft"
      />
    </div>
  );
}
