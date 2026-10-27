import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function GallerySection() {
  return (
    <section className="bg-navy px-5 py-16 text-ivory">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold-soft">Galeri</p>
        <h2 className="my-3.5 font-serif text-[clamp(28px,7vw,38px)] leading-tight">
          Sekilas kebersamaan
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <Image
            src="/prewed-01.webp"
            alt="Sugandi dan Aeni berjalan di tepi pantai pada malam hari"
            width={400}
            height={533}
            className="aspect-[3/4] h-full w-full border border-gold/35 object-cover"
          />
          <Image
            src="/prewed-02.webp"
            alt="Sugandi dan Aeni dalam balutan busana biru"
            width={400}
            height={533}
            className="aspect-[3/4] h-full w-full border border-gold/35 object-cover"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
