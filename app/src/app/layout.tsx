import type { Metadata, Viewport } from 'next';
import './globals.css';

const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (deploymentHost ? `https://${deploymentHost}` : 'https://undangan-sugandi-aeni.vercel.app');
const siteUrl = rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Undangan Pernikahan Sugandi & Aeni',
  description:
    'Undangan pernikahan Muhammad Sugandi Putra dan Quratul Aeni. Kamis, 12 November 2026, Segeran Lor, Juntinyuat, Indramayu.',
  openGraph: {
    title: 'Undangan Pernikahan Sugandi & Aeni',
    description: 'Kamis, 12 November 2026 - Segeran Lor, Juntinyuat, Indramayu',
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d1a44',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
