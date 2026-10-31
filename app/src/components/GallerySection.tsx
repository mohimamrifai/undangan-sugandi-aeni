'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { Ornament } from './accent/Ornament';

/** Foto yang dipakai sementara: dua aset prewedding yang sudah ada. */
const photos = [
  {
    src: '/prewed-01.webp',
    alt: 'Kedua mempelai berjalan berpegangan tangan di tepi pantai pada malam hari',
    caption: 'Tepi pantai, menjelang malam',
    width: 934,
    height: 1280,
  },
  {
    src: '/prewed-03.webp',
    alt: 'Quratul Aeni dalam balutan busana biru di antara pepohonan',
    caption: 'Balutan biru',
    width: 960,
    height: 1280,
  },
  {
    src: '/prewed-04.webp',
    alt: 'Muhammad Sugandi dalam balutan busana biru di antara pepohonan',
    caption: 'Satu nada',
    width: 960,
    height: 1280,
  },
];

export default function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const move = useCallback(
    (step: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + step + photos.length) % photos.length;
      });
    },
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, move]);

  return (
    <section className="relative overflow-hidden bg-navy px-5 py-16 text-ivory">
      <div className="relative mx-auto max-w-xl">
        <ScrollReveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">Galeri</p>
          <h2 className="mt-3 font-serif text-[clamp(28px,7vw,38px)] leading-tight">
            Sekilas kebersamaan
          </h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <div className="mt-7 grid grid-cols-2 gap-2.5">
          {photos.map((photo, index) => (
            <ScrollReveal
              key={photo.src}
              delay={index * 80}
              className={index === 0 ? 'col-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`group relative block w-full overflow-hidden border border-gold/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  index === 0 ? 'h-[340px] sm:h-[420px]' : 'h-[210px] sm:h-[250px]'
                }`}
                aria-label={`Buka foto: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={index === 0 ? '(max-width: 640px) 92vw, 560px' : '(max-width: 640px) 45vw, 270px'}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-3 pb-2.5 pt-8 text-left text-[11px] tracking-wide text-white/85">
                  {photo.caption}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-4 text-center text-[11.5px] text-white/40">
          Foto lain menyusul. Ketuk foto untuk memperbesar.
        </p>
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto galeri"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <div className="relative max-h-full w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              width={photos[active].width}
              height={photos[active].height}
              className="max-h-[80vh] w-full object-contain"
            />
            <p className="mt-3 text-center text-xs tracking-wide text-white/70">
              {photos[active].caption}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                className="min-h-11 border border-gold/50 px-4 text-xs uppercase tracking-[0.18em] text-gold-soft"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                onClick={close}
                className="min-h-11 border border-white/30 px-4 text-xs uppercase tracking-[0.18em] text-white/80"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="min-h-11 border border-gold/50 px-4 text-xs uppercase tracking-[0.18em] text-gold-soft"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
