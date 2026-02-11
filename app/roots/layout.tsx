import './roots.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dylan Adams | The Root System',
  description: 'Four domains, one root system. Finance, DeFi, paragliding, alpine — everything connects.',
  openGraph: {
    title: 'Dylan Adams | The Root System',
    description: 'Four domains, one root system.',
    url: 'https://app.naly.dev/roots',
    siteName: 'naly.dev',
    type: 'website',
  },
};

export default function RootsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
