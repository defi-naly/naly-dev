import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { writing } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Writing | naly.dev',
  description: 'Long-form analysis and economic commentary.',
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

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

          {/* Articles list */}
          <div className="space-y-4">
            {writing.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="group block p-6 bg-terminal-surface border border-neutral-800 rounded-lg hover:border-neutral-700 hover:bg-neutral-900/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-neutral-500">
                        {formatDate(article.date)}
                      </span>
                      <div className="flex gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="text-lg font-medium text-white mb-2 group-hover:text-terminal-accent transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-sm text-neutral-400">
                      {article.description}
                    </p>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-terminal-accent transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-12 p-6 bg-terminal-surface border border-neutral-800 rounded-lg text-center">
            <p className="text-neutral-400 mb-4">
              Want more? Subscribe to the newsletter for weekly insights.
            </p>
            <a
              href="https://moneyverse.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-accent text-terminal-bg font-mono text-sm rounded hover:bg-terminal-accent/90 transition-colors"
            >
              Subscribe to MoneyVerse
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
