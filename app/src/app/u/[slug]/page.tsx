import type { Metadata } from 'next';
import WeddingPage from '@/components/WeddingPage';

type Params = { slug: string };

/** Nama tamu diambil dari slug: tanda hubung diubah jadi spasi. */
function readGuestName(slug: string): string {
  const raw = decodeURIComponent(slug).replace(/-/g, ' ').trim();
  return raw.slice(0, 80);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  return {
    title: `Undangan Pernikahan Sugandi & Aeni`,
    description: `Undangan untuk ${readGuestName(params.slug)}. Kamis, 12 November 2026, Juntinyuat, Indramayu.`,
    robots: { index: false, follow: false },
  };
}

export default function GuestInvitation({ params }: { params: Params }) {
  return <WeddingPage guestName={readGuestName(params.slug)} />;
}
