import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swiss Liquidity Gateway — Investment Deck',
  description: 'CHF Stablecoin Infrastructure for Aave v4',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
