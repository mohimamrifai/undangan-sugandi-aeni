'use client';

import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const TARGET = new Date('2026-11-12T09:00:00+07:00').getTime();

const pad = (n: number) => String(n).padStart(2, '0');

type Time = {
  d: string;
  h: string;
  m: string;
  s: string;
};

export default function Countdown() {
  const [time, setTime] = useState<Time>({
    d: '00',
    h: '00',
    m: '00',
    s: '00',
  });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setTime({ d: '00', h: '00', m: '00', s: '00' });
        return;
      }
      setTime({
        d: pad(Math.floor(diff / 864e5)),
        h: pad(Math.floor((diff % 864e5) / 36e5)),
        m: pad(Math.floor((diff % 36e5) / 6e4)),
        s: pad(Math.floor((diff % 6e4) / 1e3)),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const Box = ({ value, label }: { value: string; label: string }) => (
    <div className="rounded-sm border border-gold/40 bg-white/5 py-3 px-1.5">
      <b className="block font-serif text-3xl leading-none text-gold-soft tabular-nums">
        {value}
      </b>
      <span className="mt-1.5 block text-xs uppercase tracking-[0.14em] text-ivory/80">
        {label}
      </span>
    </div>
  );

  return (
    <section className="bg-navy px-5 py-16 text-ivory">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold-soft">
          Menuju hari bahagia
        </p>
        <div className="mt-7 grid grid-cols-4 gap-2.5" aria-live="polite">
          <Box value={time.d} label="Hari" />
          <Box value={time.h} label="Jam" />
          <Box value={time.m} label="Menit" />
          <Box value={time.s} label="Detik" />
        </div>
      </ScrollReveal>
    </section>
  );
}
