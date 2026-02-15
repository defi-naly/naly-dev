import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Method | BLOOM — Map the System, Then Change It',
  description:
    'Map the system, then change it. Four pillars, three stages, real outcomes.',
  openGraph: {
    title: 'Method | BLOOM — Map the System, Then Change It',
    description:
      'Map the system, then change it. Four pillars, three stages, real outcomes.',
    siteName: 'BLOOM',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Method | BLOOM — Map the System, Then Change It',
    description:
      'Map the system, then change it. Four pillars, three stages, real outcomes.',
    images: ['/og.png'],
  },
};

export default function MethodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
