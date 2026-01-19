import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Writing | naly.dev',
  description: 'Long-form analysis and economic commentary.',
};

export default function WritingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-sm text-terminal-accent">~/naly/writing</span>
              <span className="font-mono text-sm text-neutral-500">$</span>
              <span className="font-mono text-sm text-neutral-400">ls *.md</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              Writing
            </h1>
            <p className="text-neutral-400 max-w-xl">
              Long-form analysis, economic commentary, and explorations 
              at the intersection of data and narrative.
            </p>
          </div>

          {/* Empty state */}
          <div className="border border-dashed border-neutral-800 rounded-lg p-12 text-center">
            <FileText className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <h2 className="font-mono text-lg text-neutral-400 mb-2">
              Coming Soon
            </h2>
            <p className="font-mono text-sm text-neutral-600 max-w-sm mx-auto">
              Articles and essays are being written. 
              Check back soon for new content.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              IN PROGRESS
            </div>
          </div>

          {/* Future article list structure hint */}
          <div className="mt-12 p-4 bg-terminal-surface border border-neutral-800 rounded">
            <code className="font-mono text-xs text-neutral-500">
              {`// Future structure:`}
              <br />
              {`// - Create /data/posts.js for article metadata`}
              <br />
              {`// - Create /app/writing/[slug]/page.js for individual posts`}
              <br />
              {`// - Use MDX or a CMS for content management`}
            </code>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
