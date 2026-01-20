import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'How to Thrive in a Crisis | naly.dev',
  description: 'My investment strategy for the next 5 years.',
};

export default function ArticlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Writing</span>
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-neutral-500">Jan 19, 2025</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Strategy</span>
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-neutral-400 rounded">Investing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              How to Thrive in a Crisis
            </h1>
            <p className="text-xl text-neutral-400">
              My investment strategy for the next 5 years.
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-neutral-300 leading-relaxed mb-6">
              I'm not yet 30. I was shitting my nappy during the dot-com bubble and trading Pokémon cards during the GFC. My personal experience of the world, markets, and political dynamics is limited by the mere lifespan of a rabbit.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Yet, even in that brief period, I have noticed shifts in every factor that influences my life and the society around me. Financial instability, political polarisation, widening wealth divides, rising House Prices, currency debasement, and the ever-present rampage of money printing. There is a storm brewing, and you don't need fifty years of experience to feel the pressure starting to pop.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Still, that observation does not provide me with much. Maybe I have an inkling of insight to sense the world getting shitter, but I clearly don't have the experience to understand what that means, or more importantly, use that insight to predict where we could be heading and position myself accordingly.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              With little personal wisdom to pull from, I must look to history, books, and others with far more knowledge than I. Not because the past gives answers, but because, just like Nature, it leaves repeatable patterns that can provide foresight to where we may be heading.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6 italic border-l-2 border-neutral-700 pl-4">
              None of this is financial advice. It's simply my personal opinion and how I'm choosing to navigate these shifts. Everyone's circumstances are different; do your own research, think critically, and make the decisions that are right for you.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Digital Dissonance</h2>

            <p className="text-neutral-300 leading-relaxed mb-6">
              On the surface, everything works (and works rather well).
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Technology is advancing relentlessly. You can tap your phone and summon food, credit, lose your money on memecoins, create a virtual girlfriend, shit-talk a bot on X, build an APP with no coding experience, or order a car to your door in minutes. The interface is slick, the charts are green (for some), and the system functions well enough.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              But... there is some ominous cloud swirling above it all. It's like a continuous high-pitched mechanical ringing that signals, 'hmm, maybe we're advancing in some areas but stagnating in others.'
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Institutions feel brittle, traditional careers offer no security, money feels increasingly abstract while carrying more weight than ever. Technology is wildly powerful but also becoming fucking unhinged. Society is advancing technologically, but you would be wise to question if that's an accurate depiction for the progression of society.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Goal</h2>

            <p className="text-neutral-300 leading-relaxed mb-6">
              I don't want to tread water. Whether that's mentally, physically, economically, politically, or spiritually. I aim to prosper; to save wealth, be fit and healthy, and constantly adapt to my surroundings and learn. My ultimate goal is to grow, enable growth for those around me, and become unreliant on a system that is working against me.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              I don't want to play the game; I want to create a new one.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              To do that, I can't just rely on the ebb and flow of social changes and economic luck; I need a map. I need a strategy. I need to assess the market and society we are in and strategically position myself for where we may be heading next.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              On my search for answers to this question, two frameworks have provided insight into exactly that: <strong className="text-white">The Fourth Turning</strong> and <strong className="text-white">The Changing World Order</strong>.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Fourth Turning and The Changing World Order</h2>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Both these books offer one clear insight: Societies don't move in straight lines; they move in phases shaped by human memory, incentives, and the slow erosion of systems that outlive the people who built them.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Via looking back at History, both these books state that societies move in arcs roughly the length of a long human life, somewhere around eighty to a hundred years. Why? Because generational experience gradually ages out.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              People who have lived through a period of crisis often develop rules designed to prevent it from happening again. Those rules work, stability follows, yet, over time, as new generations grow up and replace the other, the reasons behind those rules fade into the background. Cycles aren't mystical; they emerge when a generation fades into the next and memory fades.
            </p>

            <blockquote className="border-l-2 border-terminal-accent pl-6 italic text-neutral-300 my-8">
              "Over the course of this book, I hope to persuade you of a more ancient yet also more optimistic doctrine: that our collective social life, as with so many rhythmic systems in nature, requires seasons of sudden change and radical uncertainty in order for us to thrive over time."
              <footer className="text-neutral-500 mt-2 not-italic">— Neil Howe, The Fourth Turning Is Here</footer>
            </blockquote>

            <p className="text-neutral-300 leading-relaxed mb-6">
              If these frameworks are correct, the conclusion is uncomfortable: <strong className="text-terminal-accent">We are no longer early.</strong>
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              We are not at the beginning of a cycle where risks are low, and the path is clear. We are approaching the climax.
            </p>

            <ul className="list-none space-y-4 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">According to The Fourth Turning:</strong> We are deep into Winter (Crisis). According to Howe, this era began with the Global Financial Crisis in 2008.
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">According to The Changing World Order:</strong> We are in Stage 5 (The Decline). The classic markers are flashing red: debts are too large to be paid back in hard currency, leading to money printing.
              </li>
            </ul>

            <p className="text-neutral-300 leading-relaxed mb-6">
              We are living through the friction point in the Human Cycle. The "Old World" (post-1945 institutions, debt-based growth, global cooperation) is dying, but the "New World" hasn't been born yet.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">Infinite leverage in an age of crisis</h2>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Fourth Turnings happen because the world changes faster than our ability to manage it. Historically, every major cycle change has been preceded by a massive technological shift that rendered the old social contract obsolete.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              What makes this cycle unique is the specific nature of our new technology. Artificial Intelligence represents a form of infinite leverage. It decouples output from human labor and radically compresses time. You can now write code, generate media, or deploy a fully functioning application in hours rather than months.
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The Paradox</h2>

            <p className="text-neutral-300 leading-relaxed mb-6">
              We are left with a massive contradiction. In the digital realm, we have "infinite leverage" - exponential speed and zero marginal cost. But this digital acceleration is colliding headfirst with <strong className="text-white">finite physics</strong>.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              Data centers need power. And while the code moves at the speed of light, the physical grid moves at the speed permitted by physics. This is the hard constraint that defines the next decade: <strong className="text-terminal-accent">You can print money, but you can't print energy.</strong>
            </p>

            <h2 className="text-xl font-medium text-white mt-12 mb-4">The framework I'm operating under</h2>

            <p className="text-neutral-300 leading-relaxed mb-6">
              The framework I'm choosing to operate under is simple: we're likely in the late stages of a Fourth Turning, a period where regime dynamics matter more than optimisation, and where correct positioning matters more than squeezing out the last few basis points of return.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              I am not interested in taking risks on assets that depend on continuity, stable policy, and long-term institutional trust. Those are "status quo" bets, and they have very little upside if the order bends.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              <strong className="text-white">Instead, I am taking aggressive risks on discontinuity.</strong>
            </p>

            <p className="text-neutral-300 leading-relaxed mb-6">
              I'm asking what offers the most asymmetric upside if the assumptions underneath the system shift, and that leads me to a barbell allocation focused on two specific themes: <strong className="text-terminal-accent">Sovereignty</strong> and <strong className="text-terminal-accent">Scarcity</strong>.
            </p>

            <h3 className="text-lg font-medium text-white mt-8 mb-4">Theme 1: Sovereignty (The Hedge)</h3>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">Gold:</strong> It anchors purchasing power when confidence in policy and paper promises erodes.
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">Bitcoin:</strong> A sovereign-neutral asset with no counterparty risk. It is an opt-out from monetary systems.
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-terminal-accent">
                <strong className="text-white">Privacy Assets:</strong> As financial infrastructure becomes more programmable and surveilled, assets that preserve autonomy become the ultimate hedge.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-8 mb-4">Theme 2: Scarcity & Modernization (The Growth)</h3>
            <ul className="list-none space-y-3 mb-6">
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Uranium & Energy Stocks:</strong> AI, electrification, and re-industrialisation all run into the same bottleneck: energy.
              </li>
              <li className="text-neutral-300 pl-4 border-l-2 border-neutral-700">
                <strong className="text-white">Ethereum & DeFi:</strong> A higher-risk, asymmetric bet on modernization and dollar-backed stablecoins as a geopolitical tool.
              </li>
            </ul>

            <p className="text-neutral-300 leading-relaxed mb-6">
              <strong className="text-terminal-accent">Survival first. Prosperity second.</strong>
            </p>

            <div className="mt-12 p-6 bg-terminal-surface border border-neutral-800 rounded-lg">
              <p className="text-neutral-400 text-sm font-mono">
                Originally published on{' '}
                <a href="https://moneyverse.substack.com/p/how-to-thrive-in-a-crisis" target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">
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
