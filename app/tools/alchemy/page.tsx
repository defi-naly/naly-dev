import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import AlchemyChart from '@/components/tools/alchemy/AlchemyChart';

export const metadata: Metadata = {
  title: 'Alchemy | naly.dev',
  description: 'Track the transformation of value between digital assets and precious metals. Crypto vs Commodities divergence since 2017.',
  openGraph: {
    title: 'Alchemy — Digital meets Physical',
    description: 'Track the transformation of value between digital assets and precious metals.',
  },
};

export default function AlchemyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            <span>←</span>
            <span>Back to Tools</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-mono font-light text-white">
                Alchemy
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-400 rounded">
                LIVE
              </span>
            </div>
            <p className="text-lg font-mono text-zinc-400">
              Digital meets Physical
            </p>
          </div>

          {/* About section */}
          <div className="mb-10 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <p className="text-sm font-mono text-zinc-400 leading-relaxed">
              Track the transformation of value. When crypto outperforms precious metals,
              digital alchemy is working. When metals lead, the old gold still shines.
              Extreme divergences historically signal mean reversion.
            </p>
          </div>

          {/* Chart component */}
          <AlchemyChart />
        </div>
      </main>

      <Footer />
    </div>
  );
}
