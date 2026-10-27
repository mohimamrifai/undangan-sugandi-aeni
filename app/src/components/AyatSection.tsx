import ScrollReveal from './ScrollReveal';

export default function AyatSection() {
  return (
    <section className="bg-gradient-to-b from-[#0a1436] to-[#101c46] px-5 py-14 text-ivory">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="font-serif text-lg italic leading-relaxed text-ivory/90">
          &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu dapat ketenangan hati dan menjadikan kasih sayang di antara kamu.&quot;
        </p>
        <span className="mt-3.5 block text-xs uppercase tracking-[0.18em] text-gold">
          QS. Ar-Rum: 21
        </span>
      </ScrollReveal>
    </section>
  );
}
