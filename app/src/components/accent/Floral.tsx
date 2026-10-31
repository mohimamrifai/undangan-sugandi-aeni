/**
 * Ornamen bunga dan sulur. Digambar sendiri sebagai SVG (garis emas),
 * bukan menyalin berkas dari situs lain, jadi bebas dipakai.
 */

/** Sulur vertikal yang menempel di tepi kiri/kanan layar. */
export function EdgeVine({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 640"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none fixed top-0 z-0 h-screen w-[26px] text-gold opacity-[0.30] max-[360px]:hidden ${
        side === 'left' ? 'left-0' : 'right-0 -scale-x-100'
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      <path d="M8 0c14 70 8 130-4 190-11 58-2 108 14 168 12 46 10 92-4 138-12 40-10 84 4 144" />
      <path d="M6 96c10-6 18-4 24 4-10 6-18 4-24-4Z" />
      <path d="M8 150c-10 4-16 12-16 22 10-2 16-10 16-22Z" />
      <path d="M10 268c11-4 19 0 24 9-11 4-19 0-24-9Z" />
      <path d="M6 330c-10 5-15 14-13 24 9-4 14-13 13-24Z" />
      <path d="M18 420c10-7 19-4 25 4-10 7-19 4-25-4Z" />
      <path d="M4 486c-9 6-13 16-9 25 8-5 12-15 9-25Z" />
      <path d="M20 566c10-6 19-3 25 6-11 6-19 3-25-6Z" />
      <path d="M6 620c-9 6-12 16-8 25 8-6 11-16 8-25Z" />
      {/* kuntum bunga */}
      <g opacity="0.9">
        <circle cx="22" cy="210" r="2.4" />
        <path d="M22 200c4 3 4 7 0 10-4-3-4-7 0-10Z" />
        <path d="M12 210c3-4 7-4 10 0-3 4-7 4-10 0Z" />
        <path d="M32 210c-3-4-7-4-10 0 3 4 7 4 10 0Z" />
        <path d="M22 220c4-3 4-7 0-10-4 3-4 7 0 10Z" />
      </g>
      <g opacity="0.85">
        <circle cx="16" cy="382" r="2.1" />
        <path d="M16 373c3.5 2.8 3.5 6.2 0 9-3.5-2.8-3.5-6.2 0-9Z" />
        <path d="M7 382c2.8-3.5 6.2-3.5 9 0-2.8 3.5-6.2 3.5-9 0Z" />
        <path d="M25 382c-2.8-3.5-6.2-3.5-9 0 2.8 3.5 6.2 3.5 9 0Z" />
        <path d="M16 391c3.5-2.8 3.5-6.2 0-9-3.5 2.8-3.5 6.2 0 9Z" />
      </g>
    </svg>
  );
}

/** Rangkaian bunga kecil sebagai pemisah antar section. */
export function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <svg width="104" height="28" viewBox="0 0 104 28" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M52 24c-8-6-10-12-4-17 5 4 6 10 4 17Z" opacity="0.9" />
        <path d="M52 24c8-6 10-12 4-17-5 4-6 10-4 17Z" opacity="0.9" />
        <path d="M52 24V9" />
        <circle cx="52" cy="6" r="2.6" />
        <path d="M40 18c-6-2-10 0-12 5 6 2 10 0 12-5Z" />
        <path d="M64 18c6-2 10 0 12 5-6 2-10 0-12-5Z" />
        <path d="M30 22c-5-2-10-1-14 3 6 3 11 2 14-3Z" opacity="0.75" />
        <path d="M74 22c5-2 10-1 14 3-6 3-11 2-14-3Z" opacity="0.75" />
        <path d="M20 25h-14M84 25h14" opacity="0.5" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}

/** Bunga di sudut kartu atau foto. */
export function FloralCorner({
  position = 'tl',
  className = '',
}: {
  position?: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
}) {
  const map = {
    tl: 'left-0 top-0',
    tr: 'right-0 top-0 -scale-x-100',
    bl: 'left-0 bottom-0 -scale-y-100',
    br: 'right-0 bottom-0 -scale-100',
  } as const;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={`pointer-events-none absolute ${map[position]} h-12 w-12 text-gold opacity-70 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M2 2c14 2 24 10 30 22" />
      <path d="M6 12c7 0 12 3 15 9-7 1-12-2-15-9Z" />
      <path d="M12 6c0 7 3 12 9 15 1-7-2-12-9-15Z" />
      <path d="M28 30c6-2 10 0 12 5-6 2-10 0-12-5Z" />
      <circle cx="34" cy="20" r="2.2" />
      <path d="M34 14c2.6 2 2.6 4.6 0 6.6-2.6-2-2.6-4.6 0-6.6Z" />
      <path d="M40 20c-2.6 2-2.6 4.6 0 6.6 2.6-2 2.6-4.6 0-6.6Z" />
    </svg>
  );
}

/** Sambungan bergelombang antar section. `to` = warna section berikutnya. */
export function Seam({
  to,
  from,
  shape = 'wave',
}: {
  to: string;
  from: string;
  shape?: 'wave' | 'arch' | 'leaf';
}) {
  const paths = {
    wave: 'M0,32 C180,0 360,64 540,32 C720,0 900,64 1080,32 C1260,0 1350,32 1440,32 L1440,80 L0,80 Z',
    arch: 'M0,64 C240,0 480,0 720,40 C960,80 1200,80 1440,40 L1440,80 L0,80 Z',
    leaf: 'M0,48 C120,8 240,8 360,40 C480,72 600,72 720,40 C840,8 960,8 1080,40 C1200,72 1320,72 1440,40 L1440,80 L0,80 Z',
  } as const;

  return (
    <div aria-hidden="true" className="relative -mt-px" style={{ backgroundColor: from }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-8 w-full sm:h-12">
        <path d={paths[shape]} fill={to} />
      </svg>
    </div>
  );
}
