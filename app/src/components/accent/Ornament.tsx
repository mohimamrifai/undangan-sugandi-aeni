/**
 * Ornamen garis emas. Digambar sendiri sebagai SVG agar tidak memakai aset
 * pihak lain. Bentuknya mengikuti pola sulur klasik yang umum dipakai pada
 * undangan cetak, bukan salinan dari satu sumber tertentu.
 */
export function Ornament({
  className = '',
  tone = 'gold',
}: {
  className?: string;
  tone?: 'gold' | 'navy';
}) {
  const stroke = tone === 'gold' ? '#c9a24a' : '#16265c';
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span
        className="block h-px w-16 sm:w-24"
        style={{ background: `linear-gradient(90deg, transparent, ${stroke})` }}
      />
      <svg width="72" height="24" viewBox="0 0 72 24" fill="none" stroke={stroke} strokeWidth="1.1">
        <path d="M6 12c6-7 12-7 18 0-6 7-12 7-18 0Z" strokeLinecap="round" />
        <path d="M66 12c-6-7-12-7-18 0 6 7 12 7 18 0Z" strokeLinecap="round" />
        <path d="M24 12h24" strokeLinecap="round" />
        <circle cx="36" cy="12" r="2.6" />
        <path d="M0.5 12h4M67.5 12h4" strokeLinecap="round" />
      </svg>
      <span
        className="block h-px w-16 sm:w-24"
        style={{ background: `linear-gradient(90deg, ${stroke}, transparent)` }}
      />
    </div>
  );
}

/** Sudut bingkai tipis untuk foto dan kartu. */
export function CornerFrame({ className = '' }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <g stroke="#c9a24a" strokeWidth="0.6" fill="none" opacity="0.75">
          <path d="M0 8V0h8M92 0h8v8M100 92v8h-8M8 100H0v-8" />
          <path d="M0 16V6c0-3 3-6 6-6h10M84 0h10c3 0 6 3 6 6v10M100 84v10c0 3-3 6-6 6H84M16 100H6c-3 0-6-3-6-6V84" opacity="0.5" />
        </g>
      </svg>
    </span>
  );
}

/** Latar berbutir halus, dibuat dari gradient. Tanpa berkas gambar. */
export function PaperGrain({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-[0.35] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 18% 22%, rgba(201,162,74,.10), transparent 42%), radial-gradient(circle at 82% 78%, rgba(22,38,92,.10), transparent 46%)',
      }}
    />
  );
}
