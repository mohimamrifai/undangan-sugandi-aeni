import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { CornerFrame, Ornament, PaperGrain } from './accent/Ornament';
import { FloralCorner } from './accent/Floral';
import { ArchFrame, SilkPattern } from './accent/Brand';

const couple = [
  {
    name: 'Muhammad Sugandi',
    child: 'Putra dari',
    parents: 'Bapak Kasuma & Ibu Umroti',
    photo: '/prewed-04.webp',
    alt: 'Muhammad Sugandi dalam balutan busana biru',
  },
  {
    name: 'Quratul Aeni',
    child: 'Putri dari',
    parents: 'Bapak Maksum (Alm.) & Ibu Ulpah',
    photo: '/prewed-03.webp',
    alt: 'Quratul Aeni dalam balutan busana biru',
  },
];

export default function CoupleSection() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-16">
      <PaperGrain />
      <SilkPattern />
      <div className="relative mx-auto max-w-xl">
        <ScrollReveal className="text-center">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.26em] text-[#8a6220]">
            The Bride &amp; Groom
          </p>
          <h2 className="mt-3 font-serif text-[clamp(28px,7vw,38px)] leading-tight text-navy2">
            Dua nama, satu tujuan
          </h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <div className="mt-9 grid grid-cols-2 gap-3">
          {couple.map((person, index) => (
            <ScrollReveal key={person.name} delay={index * 110}>
              <article className="h-full text-center">
                <ArchFrame>
                  <Image
                    src={person.photo}
                    alt={person.alt}
                    width={600}
                    height={800}
                    sizes="(max-width: 640px) 45vw, 260px"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </ArchFrame>
                <h3 className="mt-4 font-serif text-[clamp(15px,4.5vw,22px)] leading-tight text-navy2 sm:text-[24px] whitespace-nowrap">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-muted">{person.child}</p>
                <p className="mt-1 text-[14.5px] leading-snug text-[#2f3860]">{person.parents}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 text-center">
          <p className="font-serif text-xl text-gold" aria-hidden="true">
            &amp;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
