import { Inter } from 'next/font/google';
import './hub.css';
import type { Metadata } from 'next';
import HubSidebar from './components/HubSidebar';
import { HubProviders } from './components/HubProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hub',
  robots: 'noindex, nofollow',
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} hub-shell`}>
      <HubProviders>
        <HubSidebar />
        <div className="hub-main">
          {children}
        </div>
      </HubProviders>
    </div>
  );
}
