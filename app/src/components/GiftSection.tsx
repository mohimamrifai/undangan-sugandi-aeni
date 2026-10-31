'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { Ornament } from './accent/Ornament';
import { FloralCorner } from './accent/Floral';

/**
 * Rekening pemberian hadiah, sesuai data yang diberikan mempelai.
 */
const accounts = [
  { bank: 'BNI', number: '2049302241', holder: 'Muhammad Sugandi' },
  { bank: 'DANA', number: '0895320368985', holder: 'Quratul Aeni' },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-gradient-to-b from-[#ecd79b] to-gold px-4 text-[12px] font-medium uppercase tracking-[0.1em] text-[#2a1f04] transition-[filter] hover:brightness-105"
    >
      {copied ? 'Nomor tersalin' : 'Salin nomor'}
    </button>
  );
}

export default function GiftSection() {
  return (
    <section className="relative overflow-hidden bg-navy px-5 py-16 text-ivory">
      <div className="relative mx-auto max-w-xl text-center">
        <ScrollReveal>
          <p className="text-[11.5px] uppercase tracking-[0.28em] text-gold-soft">Tanda Kasih</p>
          <h2 className="mt-3 font-serif text-[clamp(28px,7vw,38px)] leading-tight">Wedding Gift</h2>
          <Ornament className="mt-5" />
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/85">
            Kehadiran dan doa sudah cukup bagi kami. Jika ingin memberi tanda kasih, berikut
            caranya.
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {accounts.map((account, index) => (
            <ScrollReveal key={account.bank} delay={index * 90}>
              <div className="relative h-full border border-gold/40 bg-white/[0.07] p-5 text-left">
                <FloralCorner position="tr" className="h-9 w-9 opacity-50" />
                <p className="text-[11.5px] uppercase tracking-[0.2em] text-gold-soft">{account.bank}</p>
                <p
                  className="mt-2 font-serif text-[26px] leading-none tracking-wide text-ivory"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {account.number}
                </p>
                <p className="mt-2 text-[14px] text-white/85">Atas nama {account.holder}</p>
                <CopyButton value={account.number} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-white/70">
          Mohon cantumkan nama pengirim pada berita transfer agar mudah kami catat. Terima kasih
          atas doa dan perhatiannya.
        </p>
      </div>
    </section>
  );
}
