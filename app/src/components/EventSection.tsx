import ScrollReveal from './ScrollReveal';
import { Ornament } from './accent/Ornament';

export default function EventSection() {
  return (
    <section className="bg-ivory px-5 py-16">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
          Waktu &amp; Tempat
        </p>
        <h2 className="my-3.5 font-serif text-[clamp(28px,7vw,38px)] leading-tight">
        <Ornament className="mt-4 " />
          Kamis, 12 November 2026
        </h2>
        <div className="mt-6 rounded-[3px] border border-navy/10 bg-white p-6 text-left shadow-[0_10px_30px_rgba(13,26,68,0.07)]">
          <p className="font-serif text-2xl text-navy2">Walimatul &apos;Ursy</p>
          <p className="mt-1.5 text-sm uppercase tracking-[0.1em] text-muted">
            Pukul 09.00 WIB sampai selesai
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#2c3350]">
            Desa Segeran Lor, Blok Klampean Wetan
            <br />
            RT/RW 003/002, Kecamatan Juntinyuat
            <br />
            Kabupaten Indramayu, Jawa Barat
          </p>
          <a
            href="https://maps.app.goo.gl/sniDne4tyMDFCZER6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen mt-5 inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-sm border border-gold bg-gradient-to-b from-[#ecd79b] to-gold px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2a1f04] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Buka Peta Lokasi
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
