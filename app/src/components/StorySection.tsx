import ScrollReveal from './ScrollReveal';
import { Ornament, PaperGrain } from './accent/Ornament';
import { SilkPattern } from './accent/Brand';
import { FloralDivider } from './accent/Floral';

/**
 * Kisah cinta bertema umum: alurnya berlaku untuk banyak pasangan, bukan
 * menceritakan satu orang tertentu. Nama dan tempat sengaja tidak disebut.
 */
const steps = [
  {
    label: 'Pertemuan',
    title: 'Berawal dari percakapan biasa',
    body: 'Tidak ada rencana besar saat pertama kali berbicara. Hanya obrolan singkat yang kebetulan berlanjut ke hari berikutnya.',
  },
  {
    label: 'Kedekatan',
    title: 'Kebiasaan kecil yang menetap',
    body: 'Dari saling bertanya kabar sampai tahu kebiasaan masing-masing. Jarak dan waktu membuat keduanya belajar menunggu.',
  },
  {
    label: 'Keputusan',
    title: 'Memilih melangkah serius',
    body: 'Bukan karena terburu-buru. Keduanya memilih saling mengenal keluarga, lalu memutuskan arah yang sama.',
  },
  {
    label: 'Hari ini',
    title: 'Menuju satu tujuan',
    body: 'Dengan doa dan restu keluarga, langkah berikutnya diambil. Semoga menjadi awal yang baik dan bertahan lama.',
  },
];

export default function StorySection() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-16">
      <PaperGrain />
      <SilkPattern />
      <div className="relative mx-auto max-w-xl">
        <ScrollReveal className="text-center">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.26em] text-[#8a6220]">
            Kisah Cinta
          </p>
          <h2 className="mt-3 font-serif text-[clamp(28px,7vw,38px)] leading-tight text-navy2">
            Perjalanan menuju satu tujuan
          </h2>
          <FloralDivider className="mt-5" />
        </ScrollReveal>

        <ol className="mt-10">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="relative border-l border-gold/35 pb-9 pl-7 last:border-transparent last:pb-0"
            >
              <span
                className="absolute -left-[9px] top-1 grid h-4 w-4 place-items-center rounded-full border border-gold bg-ivory"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <ScrollReveal delay={index * 90}>
                <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-[#8a6220]">
                  {step.label}
                </p>
                <h3 className="mt-1.5 font-serif text-xl text-navy2">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#4d5570]">{step.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
