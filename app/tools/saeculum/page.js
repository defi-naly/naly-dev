import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SaeculumViz from './saeculum-viz';

export const metadata = {
  title: 'Saeculum | naly.dev',
  description: 'Generational cycle analysis and historical pattern recognition.',
};

export default function SaeculumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-6">
              Saeculum
            </h1>

            {/* About this tool */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 max-w-2xl">
              <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">About this tool</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Based on Strauss-Howe generational theory, this visualization tracks the ~80-year cycle of
                American history. We&apos;re currently in the Fourth Turning (Crisis era, 2008–2030)—the same
                phase as the Civil War, Great Depression, and WWII. Explore how gold, debt, inequality,
                and polarization behave across seasons.
              </p>
            </div>
          </div>

          {/* Visualization */}
          <div className="border border-neutral-800 rounded-lg overflow-hidden">
            <SaeculumViz />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
