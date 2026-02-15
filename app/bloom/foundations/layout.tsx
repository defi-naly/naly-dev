import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foundations | BLOOM — Distribution, Trust, Judgment',
  description:
    'Three foundations that survive when AI commoditizes software. Distribution, Trust, and Judgment — delivered as fixed-scope sprints.',
};

export default function FoundationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
