import ScrollReveal from './ScrollReveal';
import { Ornament, PaperGrain } from './accent/Ornament';
import { SilkPattern } from './accent/Brand';

/** Daftar pihak yang turut mengundang, sesuai yang diberikan mempelai. */
const guests = [
  'Keluarga besar Bapak Sarkawi',
  'Keluarga besar Bapak Kasuma',
  'Arkham',
  'Barokah / Erul',
  'Gery',
  'Ipan',
];

export default function InvitersSection() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-14">
      <PaperGrain />
      <SilkPattern />
      <div className="relative mx-auto max-w-xl text-center">
        <ScrollReveal>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.26em] text-[#8a6220]">
            Turut Mengundang
          </p>
          <Ornament className="mt-4" />
          <ul className="mt-6 space-y-2">
            {guests.map((name, index) => (
              <li key={name}>
                <ScrollReveal delay={index * 60}>
                  <p className="text-[15px] leading-relaxed text-[#4d5570]">{name}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] leading-relaxed text-muted">
            Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
