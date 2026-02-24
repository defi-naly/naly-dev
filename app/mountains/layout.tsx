import { Darker_Grotesque, IBM_Plex_Mono, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './mountains.css';
import 'leaflet/dist/leaflet.css';
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
  title: 'MOUNTAINS | Mountain Navigation Learning',
  description: 'Interactive learning platform for mountain navigation — weather, avalanche safety, and thermal flying.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function MountainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`mountains-root ${darkerGrotesque.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
