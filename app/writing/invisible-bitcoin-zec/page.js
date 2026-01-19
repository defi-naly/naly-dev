import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Invisible Bitcoin: A ZEC Investment Thesis | naly.dev',
  description: "Why Crypto's Most Overlooked Asset Might Be Its Most Important.",
};

export default function ArticlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Writing</span>
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-neutral-500">Oct 12, 2025</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Crypto</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Zcash</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              Invisible Bitcoin: A ZEC Investment Thesis
            </h1>
            <p className="text-xl text-neutral-400">
              Why Crypto's Most Overlooked Asset Might Be Its Most Important.
            </p>
          </header>

          {/* Article content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-xl font-medium text-white mt-12 mb-4">Executive Summary</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              This thesis positions ZEC as addressing a critical gap: Bitcoin offers scarce, self-custodial money but lacks privacy. Zcash combines both attributes through zero-knowledge cryptography, making it relevant in an era of expanding surveillance and programmable money systems.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Think of Zcash as <strong className="text-terminal-accent">"what Bitcoin would be if no one could see it."</strong>
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">1. Ideology</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Privacy concerns trace back to Bitcoin's earliest adopters. Hal Finney warned that Bitcoin's transparent ledger compromised fungibility. Zooko Wilcox later developed Zcash to solve this, implementing zk-SNARKs—allowing transaction validation without revealing sender, receiver, or amount details.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">2. Origin Story</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Zcash's "The Ceremony" launched the protocol through a globally distributed cryptographic setup involving Edward Snowden (operating under a pseudonym). This theatrical, security-focused approach cemented the project's credibility within privacy-conscious communities.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">3. Technology</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Zcash pioneered zk-SNARK implementation on a live blockchain. Users can employ transparent addresses (like Bitcoin) or shielded addresses (fully private). Current data shows over 25% of circulating ZEC sits in the shielded pool, with adoption accelerating through improved wallets like Zashi.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">4. Competitors</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Monero offers stronger absolute privacy but faces regulatory challenges and exchange delistings. Tornado Cash demonstrated how privacy systems operating entirely outside regulatory frameworks face dismantling. Zcash's hybrid model—allowing selective disclosure through viewing keys—provides regulatory resilience while maintaining cryptographic strength.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">5. Tokenomics</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              ZEC mirrors Bitcoin's architecture precisely:
            </p>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">21 million maximum supply</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">Four-year halving cycles</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">No ICO or premine</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">Two halvings behind Bitcoin's maturity curve</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mb-6">
              ZEC recently achieved an all-time high market capitalization (~$4.46B) despite unit prices remaining below 2017-2021 peaks, suggesting organic accumulation rather than speculative bubbles.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">6. Macro Relevance</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Global surveillance infrastructure is intensifying. CBDCs, capital controls, and transaction traceability are becoming standard. Bitcoin hedges against monetary debasement but not surveillance. Zcash addresses both concerns, serving those seeking financial invisibility as traditional privacy channels (real estate, offshore structures) close.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">7. Risks and Headwinds</h2>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Regulatory pressure remains real; privacy assets face ongoing scrutiny</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Usability historically lagged, though improving rapidly</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Ecosystem coordination between the Electric Coin Company and Zcash Foundation has occasionally fragmented</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Privacy remains optional rather than default, limiting network-wide anonymity benefits</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Competition from zk-rollups and modular privacy layers intensifies</li>
            </ul>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">8. Investment Case</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              The analysis frames ZEC as a rare asymmetric opportunity:
            </p>
            <blockquote className="border-l-2 border-terminal-accent pl-6 italic text-neutral-300 my-8">
              "Zcash is not just another digital asset"—it serves a foundational purpose protecting financial autonomy.
            </blockquote>
            <p className="text-neutral-300 leading-relaxed mb-6">
              The timing aligns with Bitcoin's institutional adoption phase, positioning ZEC as a natural secondary allocation.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Offshore wealth globally totals approximately $10 trillion. If privacy-focused assets captured just 1% of that pool, implied ZEC valuations could exceed $2,200 per coin; at 5-10%, valuations reach $31,000-$62,000.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Conclusion</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Zcash doesn't compete with Bitcoin but complements it. As surveillance intensifies and financial visibility becomes mandatory, private money transitions from luxury to necessity. ZEC's mature cryptography, Bitcoin-like scarcity model, and improving usability position it as infrastructure for the "invisible asset" era.
            </p>

            <div className="mt-12 p-6 bg-terminal-surface border border-neutral-800 rounded-lg">
              <p className="text-neutral-400 text-sm font-mono">
                Originally published on{' '}
                <a
                  href="https://moneyverse.substack.com/p/invisible-bitcoin-a-zec-investment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-accent hover:underline"
                >
                  MoneyVerse Substack
                </a>
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
