import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './jorge-events.css';
import { Metadata } from 'next';
import SmoothScroll from './components/shared/SmoothScroll';
import CustomCursor from './components/shared/CustomCursor';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'Jorge Events | Luxury Wedding Photography & Cinematography',
    template: '%s | Jorge Events',
  },
  description:
    'Documentary wedding storytelling by a National Geographic Grand Prize winner and Vogue-published photographer. Based in the UK, available worldwide.',
  keywords: [
    'luxury wedding photographer UK',
    'documentary wedding photographer',
    'wedding cinematographer UK',
    'London wedding photographer',
    'fine art wedding photography',
  ],
  authors: [{ name: 'Jorge Events' }],
  openGraph: {
    title: 'Jorge Events | Luxury Wedding Photography & Cinematography',
    description:
      'Documentary wedding storytelling by a National Geographic Grand Prize winner and Vogue-published photographer.',
    siteName: 'Jorge Events',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jorge Events | Luxury Wedding Photography & Cinematography',
    description:
      'Documentary wedding storytelling by a National Geographic Grand Prize winner and Vogue-published photographer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JorgeEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorantGaramond.variable} ${outfit.variable} je-site`}>
      <SmoothScroll>
        {children}
      </SmoothScroll>
      <CustomCursor />
    </div>
  );
}
