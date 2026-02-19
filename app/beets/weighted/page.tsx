import { Metadata } from 'next';
import WeightedContent from './WeightedContent';

export const metadata: Metadata = {
  title: 'Weighted Pools | Custom-Weight Index Funds on Beets',
  description:
    'Create custom-weight index pools with up to 8 tokens. Self-rebalancing, composable ERC-20 positions. Built on Balancer V3, deployed on Sonic.',
  openGraph: {
    title: 'Weighted Pools | Custom-Weight Index Funds on Beets',
    description:
      'Create custom-weight index pools with up to 8 tokens. Self-rebalancing, composable ERC-20 positions. Built on Balancer V3, deployed on Sonic.',
    siteName: 'Beets',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weighted Pools | Custom-Weight Index Funds on Beets',
    description:
      'Create custom-weight index pools with up to 8 tokens. Self-rebalancing, composable ERC-20 positions. Built on Balancer V3, deployed on Sonic.',
  },
};

export default function WeightedPage() {
  return <WeightedContent />;
}
