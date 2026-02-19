import localFont from 'next/font/local';
import './beets.css';
import { Metadata } from 'next';

const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Beets | DeFi Liquidity on Sonic',
  description:
    'The liquidity layer on Sonic. Weighted pools, boosted pools, and reCLAMMs — built on Balancer V3.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Beets | DeFi Liquidity on Sonic',
    description:
      'The liquidity layer on Sonic. Weighted pools, boosted pools, and reCLAMMs — built on Balancer V3.',
    siteName: 'Beets',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beets | DeFi Liquidity on Sonic',
    description:
      'The liquidity layer on Sonic. Weighted pools, boosted pools, and reCLAMMs — built on Balancer V3.',
  },
};

export default function BeetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={satoshi.variable}>
      <link rel="preload" href="/beets/bg-blue.webp" as="image" type="image/webp" />
      {children}
    </div>
  );
}
