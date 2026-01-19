import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'The Jackpot Age | naly.dev',
  description: 'Hyper-gamble your way to freedom and retire your bloodline.',
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
              <span className="font-mono text-xs text-neutral-500">Nov 16, 2025</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Markets</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Culture</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              The Jackpot Age
            </h1>
            <p className="text-xl text-neutral-400">
              Hyper-gamble your way to freedom and retire your bloodline.
            </p>
          </header>

          {/* Article content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <blockquote className="border-l-2 border-terminal-accent pl-6 italic text-neutral-300 my-8">
              "It's all just a number on the screen... until it isn't."
            </blockquote>

            <p className="text-neutral-300 leading-relaxed mb-6">
              What do people actually crave when they dream of financial freedom? Not abstract wealth, but the tangible experiences money enables. A ski holiday in the Alps, mortgage freedom, a new car, or simply time to discover life's purpose. Money functions as society's routing system, converting desire into reality through digital transactions.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Spark</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              A Vanity Fair piece profiling meme coin traders attempting to "retire their whole bloodline" sparked a crucial insight: <strong className="text-terminal-accent">"The path you take to make 'number go up' shapes you far more than the numbers themselves."</strong> How one accumulates wealth matters more than the final sum.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Meme House LA</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Picture an $18 million mansion hosting influencers and traders. Upstairs features Love Island-style content creation; downstairs contains traders livestreaming their P&L to audiences while DJs provide soundtrack. Residents explicitly pursue "retiring their whole bloodline" through memecoin speculation.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-6">
              One trader converts $30,000 into $1.7 million temporarily, only to lose everything when markets shift.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Economic Context</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Why does this gamble appeal to younger generations?
            </p>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Entry-level positions demand impossible experience levels</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Salaries can't cover basic housing</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">Employment offers no safety nets (healthcare, childcare, time off)</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">"The economic ladder got yeeted away"</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Hyper-gambling becomes less greed and more self-defense against systemic barriers.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Hidden Costs</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              While technically possible to strike it rich through volatility, hyper-gambling quietly erodes three critical freedom components:
            </p>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Time consumption:</strong> Every waking moment ties to market volatility and screen-watching
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Mental taxation:</strong> Nervous systems experience constant fight-or-flight oscillation between euphoria and despair
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Path dependency:</strong> Futures become contingent on low-probability outcomes
              </li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Everything depends on "just one more run"—meaning failure has no backup plan.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Generational Rewiring</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Money has always existed as screen numbers for this generation (Robinhood, Coinbase, MetaMask). Within memecoin environments, abstract digits gyrate wildly. This permanently recalibrates perception—traditional stocks feel glacial, conventional crypto seems boring, bonds appear laughable.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Alternative Framework</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Contrast this with a healthier mental model: treating "money as fuel for freedom" rather than expecting a single jackpot rescue.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-6">
              The superior approach:
            </p>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">Builds a compounding base layer that functions independent of cycles</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">Sizes volatile bets <em>atop</em> stability rather than <em>replacing</em> it</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">Stops expecting singular trades to solve systemic problems</li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">Designs systems reducing matrix dependency</li>
            </ul>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Conclusion</h2>
            <blockquote className="border-l-2 border-terminal-accent pl-6 italic text-neutral-300 my-8">
              "The money game isn't about finding the right lottery ticket. It's about building a life where you no longer need one."
            </blockquote>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Sustainable freedom emerges from systems design rather than spectacular wins—a deliberate contrast to the Meme House mentality consuming this generation.
            </p>

            <div className="mt-12 p-6 bg-terminal-surface border border-neutral-800 rounded-lg">
              <p className="text-neutral-400 text-sm font-mono">
                Originally published on{' '}
                <a
                  href="https://moneyverse.substack.com/p/the-jackpot-age"
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
