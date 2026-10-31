import ScrollReveal from './ScrollReveal';
import { FloralCorner } from './accent/Floral';

/* Teks ayat diambil dari api.alquran.cloud (30:21), terjemahan Kemenag. */
const ayatArab =
  'وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ';

const ayatArti =
  'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.';

export default function AyatSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1436] to-[#101c46] px-5 py-16 text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23c9a24a' stroke-width='0.6'%3E%3Cpath d='M40 8l22 32-22 32L18 40z'/%3E%3Cpath d='M40 22l12 18-12 18-12-18z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />

      <ScrollReveal className="relative mx-auto max-w-xl">
        <div className="relative border border-gold/30 px-5 py-8 sm:px-8">
          <FloralCorner position="tl" className="h-10 w-10 opacity-60" />
          <FloralCorner position="tr" className="h-10 w-10 opacity-60" />
          <FloralCorner position="bl" className="h-10 w-10 opacity-60" />
          <FloralCorner position="br" className="h-10 w-10 opacity-60" />

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-gold-soft">
            QS. Ar-Rum : 21
          </p>

          <p
            dir="rtl"
            lang="ar"
            className="mt-6 text-right text-[21px] leading-[2.2] text-ivory"
            style={{ fontFamily: '"Amiri", "Noto Naskh Arabic", serif' }}
          >
            {ayatArab}
          </p>

          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <p className="text-center font-serif text-[16.5px] italic leading-relaxed text-ivory/90">
            {ayatArti}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
