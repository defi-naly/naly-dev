import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { writing } from '@/data/projects';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Research | naly.dev',
  description: 'Data-driven analysis and economic research.',
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal header */}
          <div className="mb-8">
            <p className="font-mono text-sm text-zinc-500 mb-4">
              <span className="text-emerald-500">~/naly/research</span> $ ls -la
            </p>
          </div>

          {/* Page header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
              Research
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              Data-driven analysis with interactive tools embedded inline.
              The tools ARE the content.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Featured</span>
            </div>
            <Link
              href="/research/the-signals-are-flashing"
              className="group block p-6 sm:p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 rounded-lg hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-400 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE DATA
                    </span>
                    <span className="font-mono text-xs text-neutral-500">
                      January 2026 · 12 min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-medium text-white mb-3 group-hover:text-amber-400 transition-colors">
                    The Signals Are Flashing
                  </h2>

                  <p className="text-sm sm:text-base text-neutral-400 mb-4">
                    Four independent indicators are converging on the same conclusion.
                    Interactive analysis with live tools embedded inline.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-400 rounded">The Line</span>
                    <span className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-400 rounded">Saeculum</span>
                    <span className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-400 rounded">Decay</span>
                    <span className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-400 rounded">The Fork</span>
                  </div>
                </div>

                <ArrowUpRight className="w-6 h-6 text-amber-500/50 group-hover:text-amber-400 transition-colors flex-shrink-0" />
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-600">MORE RESEARCH</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Other articles */}
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
