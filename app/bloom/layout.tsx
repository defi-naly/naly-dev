import './bloom.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLOOM | DeFi Venture Studio',
  description: 'We make DeFi bloom. Finding friction. Building solutions. Creating infrastructure that lets decentralized finance flourish.',
  openGraph: {
    title: 'BLOOM | DeFi Venture Studio',
    description: 'We make DeFi bloom. Finding friction. Building solutions.',
    url: 'https://app.naly.dev/bloom',
    siteName: 'BLOOM',
    type: 'website',
  },
};

export default function BloomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
