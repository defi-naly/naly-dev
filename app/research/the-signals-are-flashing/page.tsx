'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignalStatusBar from '@/components/research/SignalStatusBar';
import EmbeddedTool from '@/components/research/EmbeddedTool';
import ExecutiveSummary from '@/components/research/ExecutiveSummary';
import DebtMetricsGrid from '@/components/research/DebtMetricsGrid';
import LineChartEmbed from '@/components/research/LineChartEmbed';
import SaeculumTimelineEmbed from '@/components/research/SaeculumTimelineEmbed';
import DecayCalculatorEmbed from '@/components/research/DecayCalculatorEmbed';
import ResearchFooter from '@/components/research/ResearchFooter';

// Import Fork components
import CrisisCard from '@/components/tools/the-fork/CrisisCard';
import CrisisDetail from '@/components/tools/the-fork/CrisisDetail';
import ScenarioToggle from '@/components/tools/the-fork/ScenarioToggle';
import ProjectionPanel from '@/components/tools/the-fork/ProjectionPanel';
import { useState } from 'react';

// Fork data
const CRISES = [
  {
    id: '1933',
    year: '1933',
    type: 'RESTRUCTURE' as const,
    title: 'Gold Revaluation',
    description: 'FDR revalued gold from $20.67 to $35. Dollar devalued 40% overnight.',
    why: 'Debt deflation crushing the economy. Banks failing.',
    assets: {
      gold: { '1y': { return: 69, note: 'Reval' }, '3y': { return: 69, note: 'Fixed' }, '5y': { return: 69, note: 'Reval' } },
      stocks: { '1y': { return: -45, note: 'Crash' }, '3y': { return: 20, note: 'Recovery' }, '5y': { return: 105, note: 'Recovery' } },
      bonds: { '1y': { return: 8, note: 'Safe' }, '3y': { return: 15, note: 'Gains' }, '5y': { return: 20, note: 'Gains' } },
      cash: { '1y': { return: -40, note: 'Devalued' }, '3y': { return: -40, note: 'Flat' }, '5y': { return: -40, note: 'Devalued' } },
    },
    takeaway: 'Hard assets won. Cash holders lost 40% overnight.',
  },
  {
    id: '1940s',
    year: '1940s',
    type: 'PRINT' as const,
    title: 'WW2 Debt Inflation',
    description: 'Fed printed to finance WW2. Yields capped. Inflation ran hot.',
    why: "Couldn't raise taxes enough. Inflate it away.",
    assets: {
      gold: { '1y': { return: 0, note: 'Fixed' }, '3y': { return: 0, note: 'Fixed' }, '5y': { return: 0, note: 'Fixed' } },
      stocks: { '1y': { return: 12, note: 'War boost' }, '3y': { return: 35, note: 'Growing' }, '5y': { return: 60, note: '+25% real' } },
      bonds: { '1y': { return: -3, note: 'Real loss' }, '3y': { return: -8, note: 'Eroding' }, '5y': { return: -15, note: 'Real terms' } },
      cash: { '1y': { return: -6, note: 'Inflation' }, '3y': { return: -15, note: 'Eroding' }, '5y': { return: -30, note: 'Real terms' } },
    },
    takeaway: 'Slow bleed. Savers crushed over a decade.',
  },
  {
    id: '1971',
    year: '1971',
    type: 'RESTRUCTURE' as const,
    title: 'Nixon Shock',
    description: 'Nixon closed the gold window. Dollar floated freely.',
    why: "Foreign nations redeeming dollars for gold.",
    assets: {
      gold: { '1y': { return: 45, note: 'Unpegged' }, '3y': { return: 150, note: 'Soaring' }, '5y': { return: 257, note: '$35→$125' } },
      stocks: { '1y': { return: 15, note: 'Pop' }, '3y': { return: -5, note: 'Bear' }, '5y': { return: 45, note: '0% real' } },
      bonds: { '1y': { return: -5, note: 'Inflation' }, '3y': { return: -12, note: 'Eroding' }, '5y': { return: -20, note: 'Real terms' } },
      cash: { '1y': { return: -8, note: 'Weakening' }, '3y': { return: -20, note: 'Falling' }, '5y': { return: -35, note: 'Real terms' } },
    },
    takeaway: 'Gold exploded. Stocks flat real. Cash destroyed.',
  },
  {
    id: '2008',
    year: '2008',
    type: 'PRINT' as const,
    title: 'QE Era',
    description: 'Fed launched QE. Near-zero rates for a decade.',
    why: 'Banking system collapsing. "Too big to fail."',
    assets: {
      gold: { '1y': { return: 25, note: 'Safe haven' }, '3y': { return: 40, note: 'Peak' }, '5y': { return: 30, note: 'Steady' } },
      stocks: { '1y': { return: -45, note: 'Crash' }, '3y': { return: 40, note: 'Recovery' }, '5y': { return: 180, note: '+160% real' } },
      bonds: { '1y': { return: 10, note: 'Flight' }, '3y': { return: 18, note: 'QE boost' }, '5y': { return: 25, note: 'QE boost' } },
      cash: { '1y': { return: -2, note: 'Low infl' }, '3y': { return: -5, note: 'Eroding' }, '5y': { return: -10, note: 'Real terms' } },
    },
    takeaway: 'Everything up. Cash still lost. QE inflated all assets.',
  },
];

const PROJECTIONS = {
  print: {
    description: 'Based on historical average of print scenarios (1940s, 2008)',
    assets: {
      cash: { '1y': { return: -4, note: 'Inflation' }, '3y': { return: -12, note: 'Erodes' }, '5y': { return: -20, note: 'Melts' } },
      bonds: { '1y': { return: -2, note: 'Neg real' }, '3y': { return: -6, note: 'Neg real' }, '5y': { return: -10, note: 'Neg real' } },
      stocks: { '1y': { return: 10, note: 'Nominal' }, '3y': { return: 30, note: 'Nominal' }, '5y': { return: 50, note: 'Flat real' } },
      realEstate: { '1y': { return: 6, note: 'Nominal' }, '3y': { return: 18, note: 'Nominal' }, '5y': { return: 30, note: 'Nominal' } },
      gold: { '1y': { return: 12, note: 'Hedge' }, '3y': { return: 35, note: 'Hedge' }, '5y': { return: 60, note: 'Hedge' } },
      bitcoin: { '1y': { return: 30, note: 'Scarcity' }, '3y': { return: 80, note: 'Scarcity' }, '5y': { return: 150, note: 'Scarcity' } },
    },
    takeaway: 'Slow bleed. Assets inflate. Cash melts. Wealth gap widens.',
  },
  restructure: {
    description: 'Based on historical average of restructure scenarios (1933, 1971)',
    assets: {
      cash: { '1y': { return: -30, note: 'Devalued' }, '3y': { return: -35, note: 'Partial' }, '5y': { return: -40, note: 'New equilibrium' } },
      bonds: { '1y': { return: -20, note: 'Haircuts' }, '3y': { return: -25, note: 'Restruc' }, '5y': { return: -30, note: 'Haircuts' } },
      stocks: { '1y': { return: -30, note: 'Crash' }, '3y': { return: 10, note: 'Recovery' }, '5y': { return: 40, note: 'Crash→recover' } },
      realEstate: { '1y': { return: -10, note: 'Uncertain' }, '3y': { return: 0, note: 'Stable' }, '5y': { return: 10, note: 'Mixed' } },
      gold: { '1y': { return: 80, note: 'Flight' }, '3y': { return: 150, note: 'Reval' }, '5y': { return: 200, note: 'Reval' } },
      bitcoin: { '1y': { return: 100, note: 'Neutral' }, '3y': { return: 200, note: 'Neutral' }, '5y': { return: 300, note: 'Neutral' } },
    },
    takeaway: 'Sharp reset. Hard assets explode. Dollar holders wiped fast.',
  },
};

function ForkDashboardEmbed() {
  const [selectedCrisis, setSelectedCrisis] = useState('1933');
  const [scenario, setScenario] = useState<'print' | 'restructure'>('print');
  const [timePeriod, setTimePeriod] = useState<'1y' | '3y' | '5y'>('5y');
  const [historicalTimePeriod, setHistoricalTimePeriod] = useState<'1y' | '3y' | '5y'>('5y');

  const currentCrisis = CRISES.find(c => c.id === selectedCrisis);

  return (
    <div className="space-y-6">
      {/* Crisis cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CRISES.map((crisis) => (
          <CrisisCard
            key={crisis.id}
            year={crisis.year}
            type={crisis.type}
            title={crisis.title}
            isSelected={selectedCrisis === crisis.id}
            onClick={() => setSelectedCrisis(crisis.id)}
          />
        ))}
      </div>

      {/* Crisis detail */}
      {currentCrisis && (
        <CrisisDetail
          crisis={currentCrisis}
          timePeriod={historicalTimePeriod}
          onTimePeriodChange={setHistoricalTimePeriod}
        />
      )}

      {/* Scenario toggle */}
      <ScenarioToggle selected={scenario} onSelect={setScenario} />

      {/* Projections */}
      <ProjectionPanel
        scenario={scenario}
        projection={PROJECTIONS[scenario]}
        timePeriod={timePeriod}
        onTimePeriodChange={setTimePeriod}
      />
    </div>
  );
}

export default function SignalsArticle() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />
      <SignalStatusBar />

      <main className="flex-1 pt-8 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research</span>
          </Link>

          {/* Terminal header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="font-mono text-sm text-zinc-500 mb-6">
              <span className="text-emerald-500">~/naly/research</span> $ cat the-signals-are-flashing.md
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
              The Signals Are Flashing
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 mb-4">
              A data-driven analysis of market positioning
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-mono text-zinc-500">January 2026</span>
              <span className="text-zinc-700">·</span>
              <span className="font-mono text-zinc-500">12 min read</span>
              <span className="text-zinc-700">·</span>
              <span className="inline-flex items-center gap-1 font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Updated live
              </span>
            </div>
          </motion.div>

          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-zinc max-w-none mb-12"
          >
            <p className="text-lg text-zinc-300 leading-relaxed">
              Four independent indicators are converging on the same conclusion: we are late in a debt cycle,
              approaching a decision point that will reshape asset prices for the next decade.
            </p>
          </motion.div>

          <ExecutiveSummary />

          <div className="my-8 p-4 bg-zinc-900/50 border-l-2 border-terminal-accent rounded-r-lg">
            <p className="text-zinc-300 font-medium">
              This isn't speculation. It's math.
            </p>
          </div>

          {/* Part 1: The Line */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              Part 1: The Line Is Bending
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none mb-8">
              <p>
                The S&P 500 priced in gold—what we call "The Line"—measures equity strength relative
                to hard money. When this ratio drops below 1.50, it signals a regime shift.
              </p>

              <p className="text-amber-400 font-mono text-xl">
                Current reading: 1.55
              </p>

              <p>
                In 2025, something unusual happened. Gold rose 60%. The S&P rose 16%. Both went up—but
                gold went up <em>faster</em>. This compression to 1.55 matches levels last seen during
                the March 2020 pandemic crash.
              </p>

              <p>
                But here's what makes today different: in March 2020, the ratio compressed because stocks
                crashed. Today, it's compressing because gold is surging <em>while stocks are rising</em>.
              </p>
            </div>

            <EmbeddedTool title="THE LINE — LIVE" toolPath="/tools/the-line" liveIndicator>
              <LineChartEmbed />
            </EmbeddedTool>

            <div className="prose prose-invert prose-zinc max-w-none mt-8">
              <p>
                Central banks bought gold at record levels throughout 2024-2025. China, India, Japan, Turkey,
                and Poland have all significantly increased reserves. The dollar fell 11% in the first half
                of 2025—the biggest decline in 50+ years.
              </p>

              <p className="text-zinc-400 italic">
                The smart money is hedging. Against what?
              </p>
            </div>
          </section>

          {/* Part 2: Saeculum */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              Part 2: The Cycle Says We're Late
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none mb-8">
              <p>
                We track generational cycles using the Fourth Turning framework. Every ~80 years,
                societies move through four seasons: High → Awakening → Unraveling → Crisis.
              </p>

              <p className="text-amber-400 font-mono text-xl">
                Current position: Year 17 of the Crisis era (2008-2030)
              </p>
            </div>

            <EmbeddedTool title="SAECULUM — CYCLE POSITION" toolPath="/tools/saeculum" liveIndicator>
              <SaeculumTimelineEmbed />
            </EmbeddedTool>

            <div className="prose prose-invert prose-zinc max-w-none mt-8">
              <p>
                The last Crisis era was 1929-1945. Before that, 1860-1865. Before that, 1773-1794.
                Each ended with a resolution that reset the institutional order—and the monetary system.
              </p>

              <p>
                The 2008 financial crisis was the <em>beginning</em> of this era, not the climax.
              </p>
            </div>
          </section>

          {/* Part 3: Debt Math */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              Part 3: The Math Doesn't Work
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none mb-6">
              <p>
                Let's look at the debt situation in real terms.
              </p>
            </div>

            <DebtMetricsGrid />

            <div className="prose prose-invert prose-zinc max-w-none mt-8">
              <p>
                Interest on the debt is now the second-largest line item in the federal budget—larger
                than Medicare, larger than defense. By 2026, interest costs will reach 3.2% of GDP,
                eclipsing the previous high set in 1991.
              </p>

              <p>
                And here's the trap: if the Fed raises rates to fight inflation, interest costs explode.
                If they cut rates to reduce interest costs, inflation returns. There's no clean exit.
              </p>

              <p>
                Janet Yellen warned in January 2026 that <span className="text-amber-400">"the preconditions
                for fiscal dominance are clearly strengthening."</span>
              </p>

              <p className="text-zinc-400 italic">
                In plain English: when the math doesn't work, the currency pays the price.
              </p>
            </div>
          </section>

          {/* Part 4: Decay */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              Part 4: Your Money Is Already Melting
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none mb-8">
              <p>
                Enter your birth year. Watch what happens.
              </p>
            </div>

            <EmbeddedTool title="DECAY — CALCULATOR" toolPath="/tools/decay">
              <DecayCalculatorEmbed />
            </EmbeddedTool>

            <div className="prose prose-invert prose-zinc max-w-none mt-8">
              <p>
                If you were born in 1990, the dollar has lost 53% of its purchasing power in your lifetime.
                If you were born in 1970, it's lost 85%.
              </p>

              <p className="text-red-400 font-mono text-xl">
                $100 in 1971 → $17 today (in purchasing power)
              </p>

              <p>
                This isn't a future risk. It's an ongoing process that accelerates during periods of fiscal stress.
              </p>
            </div>
          </section>

          {/* Part 5: The Fork */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              Part 5: The Fork Ahead
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none mb-8">
              <p>
                Governments facing unsustainable debt have two options. Every time. Throughout history.
              </p>

              <p>
                <span className="text-emerald-400 font-medium">PRINT:</span> Inflate the debt away.
                Let the currency absorb the adjustment.
              </p>

              <p>
                <span className="text-amber-400 font-medium">RESTRUCTURE:</span> Reset the system.
                Revalue currencies against hard assets.
              </p>

              <p>
                Explore the historical precedents below—then see what each path implies for the next five years.
              </p>
            </div>

            <EmbeddedTool title="THE FORK — INTERACTIVE" toolPath="/tools/the-fork" liveIndicator>
              <ForkDashboardEmbed />
            </EmbeddedTool>
          </section>

          {/* Bottom Line */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              The Bottom Line
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none">
              <p>
                The signals from The Line, Saeculum, TruValue, and the debt math are all pointing the same
                direction. This doesn't mean crash tomorrow. It means the conditions are set for a significant
                repricing of what money is worth.
              </p>

              <p>
                The S&P/Gold ratio at 1.55 tells us the market is already starting to figure this out.
                Central banks are accumulating gold. The dollar is weakening. The debt trajectory is unsustainable.
              </p>

              <p className="text-amber-400">
                You can wait for confirmation. Or you can notice that confirmation is what happens <em>after</em> the repricing.
              </p>
            </div>
          </section>

          {/* What To Watch */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-6">
              What To Watch
            </h2>

            <div className="prose prose-invert prose-zinc max-w-none mb-6">
              <p>
                These are the triggers that could accelerate the timeline:
              </p>
            </div>

            <div className="space-y-3">
              {[
                { num: 1, title: 'The Line breaks 1.50', desc: 'Signals regime shift in progress' },
                { num: 2, title: 'Treasury auction fails or tails badly', desc: 'Foreign buyers stepping back' },
                { num: 3, title: 'Fed forced to restart QE', desc: 'Confirms print path' },
                { num: 4, title: 'Major currency or debt crisis abroad', desc: 'Flight to safety (or from dollars)' },
                { num: 5, title: 'Gold revaluation talk from officials', desc: 'Restructure path enters Overton window' },
              ].map((item) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.num * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-mono text-sm shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <ResearchFooter />
        </article>
      </main>

      <Footer />
    </div>
  );
}
