import { Darker_Grotesque, IBM_Plex_Mono, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './bloom.css';
import { Metadata } from 'next';

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'BLOOM | AI Integration Studio',
  description:
    "AI won't save your company. Judgment will. We're the venture studio that brings both.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'BLOOM | AI Integration Studio',
    description:
      "AI won't save your company. Judgment will. We're the venture studio that brings both.",
    siteName: 'BLOOM',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLOOM | AI Integration Studio',
    description:
      "AI won't save your company. Judgment will. We're the venture studio that brings both.",
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${darkerGrotesque.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
