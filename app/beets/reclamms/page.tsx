import { Metadata } from 'next';
import ReclammsContent from './ReclammsContent';

export const metadata: Metadata = {
  title: 'reCLAMMs | Concentrated Liquidity That Manages Itself',
  description:
    'Auto-adjusting concentrated liquidity on Beets. No rebalancing. No oracles. Fungible ERC-20 positions. Built on Balancer V3.',
  openGraph: {
    title: 'reCLAMMs | Concentrated Liquidity That Manages Itself',
    description:
      'Auto-adjusting concentrated liquidity on Beets. No rebalancing. No oracles. Fungible ERC-20 positions. Built on Balancer V3.',
    siteName: 'Beets',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'reCLAMMs | Concentrated Liquidity That Manages Itself',
    description:
      'Auto-adjusting concentrated liquidity on Beets. No rebalancing. No oracles. Fungible ERC-20 positions. Built on Balancer V3.',
  },
};

export default function ReclammsPage() {
  return <ReclammsContent />;
}
