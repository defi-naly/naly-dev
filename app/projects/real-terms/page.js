import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'TruValue | naly.dev',
  description: 'See assets in their true value. Interactive visualization of inflation-adjusted economic data.',
};

export default function TruValuePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded">
                <span className="w-1 h-1 rounded-full bg-terminal-accent animate-pulse" />
                LIVE
              </span>
              <span className="text-xs font-mono text-neutral-500">Dashboard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              TruValue
            </h1>
            <p className="text-neutral-400 max-w-2xl">
              See assets in their true value. Interactive visualization of inflation-adjusted economic data.
            </p>
          </div>

          {/* Dashboard iframe */}
          <div className="border border-neutral-800 rounded-lg overflow-hidden">
            <iframe
              src="https://truvalue.lovable.app/"
              className="w-full h-[800px] border-0"
              title="TruValue Dashboard"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
