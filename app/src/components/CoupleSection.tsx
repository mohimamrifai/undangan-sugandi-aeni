import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function CoupleSection() {
  return (
    <section className="bg-ivory px-5 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Mempelai</p>
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-5">
            <div>
              <h3 className="font-serif text-[31px] font-semibold leading-tight text-navy2">
                Muhammad Sugandi Putra
              </h3>
              <p className="mt-2 text-[15px] text-muted">
                Putra dari
                <br />
                <b className="font-medium text-[#3a4368]">Bapak Kasuma</b> &amp;{' '}
                <b className="font-medium text-[#3a4368]">Ibu Umroti</b>
              </p>
            </div>
            <div
              className="font-serif text-[38px] leading-none text-gold"
              aria-hidden="true"
            >
              &amp;
            </div>
            <div>
              <h3 className="font-serif text-[31px] font-semibold leading-tight text-navy2">
                Quratul Aeni
              </h3>
              <p className="mt-2 text-[15px] text-muted">
                Putri dari
                <br />
                <b className="font-medium text-[#3a4368]">Bapak Maksum (Alm.)</b> &amp;{' '}
                <b className="font-medium text-[#3a4368]">Ibu Ulpah</b>
              </p>
            </div>
            <div className="mx-auto mt-5 max-w-[340px] border border-gold/55 bg-white p-2 md:col-span-3">
              <Image
                src="/prewed-02.webp"
                alt="Muhammad Sugandi Putra dan Quratul Aeni"
                width={600}
                height={800}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
