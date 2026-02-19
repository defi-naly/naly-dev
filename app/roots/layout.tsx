import './roots.css';
import { Metadata } from 'next';
import { RootsBodyClass } from './components/RootsBodyClass';

export const metadata: Metadata = {
  title: 'Naly',
  description: 'DeFi, digital sovereignty, natural systems — three domains, one portfolio.',
  openGraph: {
    title: 'Naly',
    description: 'DeFi, digital sovereignty, natural systems — three domains, one portfolio.',
    url: 'https://naly.dev',
    siteName: 'naly.dev',
    type: 'website',
  },
};

export default function RootsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RootsBodyClass />
      {children}
    </>
  );
}
