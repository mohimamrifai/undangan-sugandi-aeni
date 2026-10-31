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
    'Undangan pernikahan Muhammad Sugandi dan Quratul Aeni. Kamis, 12 November 2026, Segeran Lor, Juntinyuat, Indramayu.',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
