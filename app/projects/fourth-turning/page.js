import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FourthTurningViz from './fourth-turning-viz';

export const metadata = {
  title: 'The Fourth Turning | naly.dev',
  description: 'Generational cycle analysis and historical pattern recognition.',
};

export default function FourthTurningPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          {/* Visualization */}
          <div className="border border-neutral-800 rounded-lg overflow-hidden">
            <FourthTurningViz />
          </div>

          {/* Context section */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <h2 className="text-lg font-medium text-white mb-4">About This Project</h2>
            <div className="prose prose-invert prose-sm max-w-none text-neutral-400">
              <p>
                Based on the generational theory proposed by Strauss and Howe, this
                visualization explores historical cycles and their potential implications
                for understanding current events.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
