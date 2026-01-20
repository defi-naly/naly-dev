import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { writing } from '@/data/projects';
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

function Timestamp() {
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return <span className="text-zinc-500 font-mono text-sm">[{formatted}]</span>;
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <p className="font-mono text-sm text-zinc-500">
              <span className="text-emerald-500">~/naly/research</span> $ ls -la
            </p>
            <Timestamp />
          </div>

          {/* Hero */}
          <div className="border border-zinc-800 mb-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">System</span>
            </div>
            <div className="p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-mono text-white mb-2">
                Research
              </h1>
              <p className="text-zinc-500 font-mono text-sm">
                Data-driven analysis with interactive tools embedded inline. The tools ARE the content.
              </p>
            </div>
          </div>

          {/* Featured */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Featured</span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                LIVE DATA
              </span>
            </div>
            <Link href="/research/the-signals-are-flashing" className="block p-4 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-mono text-white">The Signals Are Flashing</div>
                <div className="text-xs font-mono text-zinc-600">READ →</div>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 mb-3">
                January 2026 • 12 min read
              </div>
              <div className="text-sm font-mono text-zinc-500 mb-3">
                Four independent indicators are converging on the same conclusion.
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 border border-zinc-800">The Line</span>
                <span className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 border border-zinc-800">Saeculum</span>
                <span className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 border border-zinc-800">Decay</span>
                <span className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 border border-zinc-800">The Fork</span>
              </div>
            </Link>
          </div>

          {/* Articles */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Archive</span>
            </div>
            <div className="divide-y divide-zinc-800">
              {writing.map((article) => (
                <Link
                  key={article.id}
                  href={article.href}
                  className="block p-4 hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-mono text-white">{article.title}</div>
                    <div className="text-[10px] font-mono text-zinc-700">{formatDate(article.date)}</div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600 mb-2">
                    {article.description}
                  </div>
                  <div className="flex gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-700"
                      >
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="border border-zinc-800 border-t-0">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Subscribe</span>
            </div>
            <a
              href="https://moneyverse.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono text-white mb-1">MoneyVerse Newsletter</div>
                  <div className="text-[10px] font-mono text-zinc-600">Weekly insights on markets & macro</div>
                </div>
                <div className="text-xs font-mono text-zinc-600">SUBSCRIBE →</div>
              </div>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
