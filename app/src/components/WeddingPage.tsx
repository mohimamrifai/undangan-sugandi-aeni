'use client';

import { useEffect, useRef, useState } from 'react';
import AyatSection from './AyatSection';
import Countdown from './Countdown';
import CoupleSection from './CoupleSection';
import Cover from './Cover';
import EventSection from './EventSection';
import Footer from './Footer';
import GallerySection from './GallerySection';
import MusicButton from './MusicButton';
import RsvpSection from './RsvpSection';
import ScrollReveal from './ScrollReveal';
import UcapanSection from './UcapanSection';
import { SHOW_GIFT, SHOW_STORY } from '@/lib/config';

export default function WeddingPage() {
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

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <Cover isOpen={isOpen} onOpen={openInvitation} />
      {isOpen && <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />}
      <main>
        <section className="px-5 pb-16 pt-16">
          <ScrollReveal className="mx-auto max-w-xl text-center">
            <p className="mb-6 font-serif text-2xl text-navy2">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <p className="mx-auto max-w-lg text-base text-muted">
              Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta&apos;ala, kami
              bermaksud menyelenggarakan pernikahan putra-putri kami.
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
        </section>

        <AyatSection />
        <CoupleSection />
        <Countdown />
        <EventSection />
        <GallerySection />

        {SHOW_STORY && (
          <section className="bg-navy px-5 py-16 text-ivory">
            <ScrollReveal className="mx-auto max-w-xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold-soft">
                Kisah Cinta
              </p>
              <h2 className="mb-4 font-serif text-3xl">Perjalanan Kami</h2>
              <p className="text-base text-white/80">Cerita akan segera ditambahkan.</p>
            </ScrollReveal>
          </section>
        )}

        {SHOW_GIFT && (
          <section className="bg-ivory px-5 py-16">
            <ScrollReveal className="mx-auto max-w-xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                Amplop Digital
              </p>
              <h2 className="mb-4 font-serif text-3xl">Kirim Hadiah</h2>
              <p className="text-base text-muted">Informasi rekening akan ditambahkan.</p>
            </ScrollReveal>
          </section>
        )}

        <RsvpSection />
        <UcapanSection />
      </main>
      <Footer />
    </>
  );
}
