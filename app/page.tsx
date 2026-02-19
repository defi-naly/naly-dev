import './roots/roots.css';
import { RootsBodyClass } from './roots/components/RootsBodyClass';
import RootsPageContent from './roots/page';

export const metadata = {
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

export default function HomePage() {
  return (
    <>
      <RootsBodyClass />
      <RootsPageContent />
    </>
  );
}
