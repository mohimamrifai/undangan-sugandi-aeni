'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  guestName?: string;
};

export default function Cover({ isOpen, onOpen, guestName }: Props) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 60]);

  return (
    <motion.div
      initial={false}
      animate={
        isOpen
          ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' }
          : { opacity: 1, pointerEvents: 'auto', visibility: 'visible' }
      }
      transition={reduced ? { duration: 0 } : { duration: 0.9 }}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-[#06102e]"
    >
      <motion.div
        ref={trackRef}
        style={{ y: photoY }}
        className="kenburns absolute inset-0 scale-110 bg-[url('/prewed-01.webp')] bg-[center_32%] bg-cover brightness-[0.46] saturate-[1.03]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(6,16,46,0.55)] from-0% via-[rgba(6,16,46,0.35)] via-40% to-[rgba(6,16,46,0.92)] to-100%"
        aria-hidden="true"
      />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 1.1, ease: 'easeOut' }}
        className="relative max-w-lg px-6 pb-[14vh] text-center text-ivory"
      >
        <div className="mb-4 flex justify-center">
          <span
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/70"
            aria-hidden="true"
          >
            <span className="font-serif text-[12px] tracking-[0.12em] text-gold">S &amp; A</span>
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold-soft drop-shadow">
          The Wedding Of
        </p>
        <h1 className="mb-1 mt-4 font-serif text-[clamp(46px,14vw,76px)] font-light leading-[1.02] text-white">
          Sugandi
          <span className="my-2 block text-[0.5em] text-gold">&amp;</span>
          Aeni
        </h1>
        <div className="my-3.5 flex items-center justify-center gap-3 text-gold" aria-hidden="true">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M12 2l2.4 6.2L21 10l-5 4.4L17.5 22 12 18.3 6.5 22 8 14.4 3 10l6.6-1.8z" />
          </svg>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-ivory/90">
          Kamis, 12 November 2026
        </p>
        {guestName && (
          <p className="mx-auto mt-5 max-w-xs text-[13px] leading-relaxed text-ivory/80">
            Kepada Yth.
            <span className="mt-1 block font-serif text-lg normal-case tracking-normal text-gold-soft">
              {guestName}
            </span>
          </p>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="btn-sheen mt-7 inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-sm border border-gold bg-gradient-to-b from-[#d9be83] to-[#b8923f] px-8 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2a1f04] transition hover:-translate-y-0.5 hover:brightness-105"
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.div>
  );
}
