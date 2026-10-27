'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

export default function Cover({ isOpen, onOpen }: Props) {
  const reduced = useReducedMotion();

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
      <div
        className="absolute inset-0 bg-[url('/prewed-01.webp')] bg-[center_32%] bg-cover brightness-50 saturate-[1.05]"
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
        <button
          type="button"
          onClick={onOpen}
          className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-sm border border-gold bg-gradient-to-b from-[#ecd79b] to-gold px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2a1f04] transition hover:-translate-y-0.5 hover:brightness-105"
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.div>
  );
}
