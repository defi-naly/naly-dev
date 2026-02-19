import { Metadata } from 'next';
import BoostedContent from './BoostedContent';

export const metadata: Metadata = {
  title: 'Boosted Pools | Dual Yield Liquidity on Beets',
  description:
    'Earn swap fees and lending yield simultaneously. Boosted pools route idle liquidity to lending markets automatically. Built on Balancer V3, deployed on Sonic.',
  openGraph: {
    title: 'Boosted Pools | Dual Yield Liquidity on Beets',
    description:
      'Earn swap fees and lending yield simultaneously. Boosted pools route idle liquidity to lending markets automatically. Built on Balancer V3, deployed on Sonic.',
    siteName: 'Beets',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boosted Pools | Dual Yield Liquidity on Beets',
    description:
      'Earn swap fees and lending yield simultaneously. Boosted pools route idle liquidity to lending markets automatically. Built on Balancer V3, deployed on Sonic.',
  },
};

export default function BoostedPage() {
  return <BoostedContent />;
}
