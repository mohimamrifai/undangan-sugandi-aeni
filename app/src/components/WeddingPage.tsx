'use client';

import { useEffect, useRef, useState } from 'react';
import AyatSection from './AyatSection';
import Countdown from './Countdown';
import CoupleSection from './CoupleSection';
import Cover from './Cover';
import { EdgeVine, Seam } from './accent/Floral';
import { ArchFrame, ReadingProgress, SilkPattern } from './accent/Brand';
import EventSection from './EventSection';
import Footer from './Footer';
import GallerySection from './GallerySection';
import InvitersSection from './InvitersSection';
import GiftSection from './GiftSection';
import MusicButton from './MusicButton';
import RsvpSection from './RsvpSection';
import ScrollReveal from './ScrollReveal';
import StorySection from './StorySection';
import UcapanSection from './UcapanSection';
import { SHOW_GIFT, SHOW_STORY } from '@/lib/config';

export default function WeddingPage({ guestName }: { guestName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tryPlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void tryPlay();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const openInvitation = () => {
    setIsOpen(true);
    void tryPlay();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (window.location.hash === '#buka') {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = `${(ratio * 100).toFixed(2)}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isOpen]);

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <Cover isOpen={isOpen} onOpen={openInvitation} guestName={guestName} />
      {isOpen && <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />}
      <ReadingProgress />
      <EdgeVine side="left" />
      <EdgeVine side="right" />
      <main className="relative z-10">
        <section className="relative overflow-hidden bg-ivory px-5 pb-14 pt-14">
          <SilkPattern />
          <div className="relative mx-auto max-w-xl text-center">
            <ScrollReveal>
              <p className="font-serif text-[17px] italic leading-relaxed text-navy2/85">
                Assalamu&apos;alaikum warahmatullahi wabarakatuh
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-7">
              <ArchFrame className="mx-auto max-w-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/prewed-02.webp"
                  alt="Sugandi dan Aeni dalam balutan busana biru"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </ArchFrame>
            </ScrollReveal>

            <ScrollReveal delay={220} className="mt-8">
              <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-muted">
                Tanpa mengurangi rasa hormat. Kami mengundang bapak/ibu/saudara/i serta
                kerabat sekalian untuk menghadiri acara pernikahan kami.
              </p>
              <div
                className="mx-auto my-6 flex items-center justify-center gap-3 text-gold"
                aria-hidden="true"
              >
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2l2.4 6.2L21 10l-5 4.4L17.5 22 12 18.3 6.5 22 8 14.4 3 10l6.6-1.8z" />
                </svg>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <AyatSection />
        <Seam from="#101c46" to="#fbf7ee" shape="wave" />
        <CoupleSection />
        <Seam from="#fbf7ee" to="#0d1a44" shape="leaf" />
        <Countdown />
        <Seam from="#0d1a44" to="#fbf7ee" shape="arch" />
        <EventSection />
        <Seam from="#fbf7ee" to="#0d1a44" shape="wave" />
        <GallerySection />
        <Seam from="#0d1a44" to="#fbf7ee" shape="leaf" />

        {SHOW_STORY && <StorySection />}
        {SHOW_STORY && <Seam from="#fbf7ee" to="#0d1a44" shape="arch" />}

        {SHOW_GIFT && <GiftSection />}
        {SHOW_GIFT && <Seam from="#0d1a44" to="#fbf7ee" shape="wave" />}

        <InvitersSection />

        <RsvpSection defaultName={guestName} />
        <UcapanSection />
        <Seam from="#fbf7ee" to="#050d24" shape="leaf" />
      </main>
      <Footer />
    </>
  );
}
