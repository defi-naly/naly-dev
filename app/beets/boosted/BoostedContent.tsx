'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Battery, Split, Gauge } from 'lucide-react';
import MotionReveal from '../components/MotionReveal';
import ScrollFade from '../components/ScrollFade';
import SectionHeader from '../components/SectionHeader';
import SectionDivider from '../components/SectionDivider';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import BoostedVisualizer from '../components/BoostedVisualizer';
import ProblemSolutionToggle from '../components/ProblemSolutionToggle';
import FeatureGrid from '../components/FeatureGrid';
import ComparisonTable from '../components/ComparisonTable';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import BeetsNav from '../components/BeetsNav';
import BeetsFooter from '../components/BeetsFooter';
import { boostedFeatures } from '../data/boosted-features';
import { boostedToggleCards } from '../data/boosted-toggle';
import { boostedComparisonColumns, boostedComparisonRows } from '../data/boosted-comparison';
import { boostedLayers, boostedDetails } from '../data/boosted-architecture';

export default function BoostedContent() {
  return (
    <div data-beets-bg="red">
      {/* Background System */}
      <div className="beets-bg">
        <div className="beets-bg-grid" />
        <div className="beets-bg-noise" />
        <div className="beets-bg-vignette" />
      </div>

      <main className="bloom-main">
        <BeetsNav activePool="boosted" />

        {/* ─── HERO ─── */}
        <section className="bloom-hero">
          <ScrollFade>
            <motion.h1
              className="bloom-wordmark"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Boosted<span className="accent"> Pools</span>
            </motion.h1>
            <motion.p
              className="bloom-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Idle liquidity earns yield automatically.
            </motion.p>
            <motion.p
              className="bloom-tagline-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Swap fees plus lending yield. One position. Zero wasted capital.
            </motion.p>
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a href="#problem" className="bloom-hero-cta bloom-hero-cta-ghost">
                How It Works
              </a>
              <a
                href="https://beets.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="bloom-hero-cta bloom-hero-cta-primary"
              >
                LP on Beets <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </motion.div>
          </ScrollFade>
        </section>

        <div className="bloom-container">
          {/* ─── 01 THE PROBLEM ─── */}
          <SectionDivider />
          <section id="problem" className="bloom-section">
            <SectionHeader number="01" title="The Problem" />

            <MotionReveal>
              <div className="about-grid">
                <div className="about-text">
                  <h2>
                    IDLE LIQUIDITY IS{' '}
                    <span className="highlight">WASTED</span> CAPITAL.
                  </h2>
                </div>
              </div>
            </MotionReveal>

            <StaggerContainer className="pain-cards">
              <StaggerItem>
                <motion.div
                  className="pain-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="pain-card-icon">
                    <Battery size={24} strokeWidth={1.5} />
                  </div>
                  <h4>80%+ Sits Idle</h4>
                  <p>
                    In a standard AMM, most liquidity waits for swaps that
                    never come. That capital earns zero yield while sitting
                    in the pool contract.
                  </p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="pain-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="pain-card-icon">
                    <Split size={24} strokeWidth={1.5} />
                  </div>
                  <h4>LP or Lend — Pick One</h4>
                  <p>
                    Splitting capital between AMM pools and lending protocols
                    means multiple positions, multiple gas costs, and
                    constant rebalancing.
                  </p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="pain-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="pain-card-icon">
                    <Gauge size={24} strokeWidth={1.5} />
                  </div>
                  <h4>Manual Yield Chasing</h4>
                  <p>
                    Moving capital between protocols to chase the best rate
                    costs gas and attention. By the time you act, the
                    opportunity has moved.
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </section>

          {/* ─── 02 THE SOLUTION ─── */}
          <SectionDivider />
          <section id="solution" className="bloom-section">
            <SectionHeader number="02" title="The Solution" />

            <MotionReveal>
              <div className="about-grid">
                <div className="about-text">
                  <h2>
                    DUAL YIELD.{' '}
                    <span className="highlight">ZERO</span> IDLE CAPITAL.
                  </h2>
                  <p>
                    Boosted pools route unused liquidity to lending protocols
                    automatically. You earn swap fees on active capital and
                    lending yield on idle reserves — all from a single
                    position.
                  </p>
                </div>
              </div>
            </MotionReveal>

            <BoostedVisualizer />
          </section>

          {/* ─── 03 THE GAP ─── */}
          <SectionDivider />
          <section id="gap" className="bloom-section">
            <SectionHeader number="03" title="The Gap" />

            <MotionReveal>
              <h2 className="judgment-headline">
                Same capital. Different yield.
              </h2>
            </MotionReveal>

            <ProblemSolutionToggle
              cards={boostedToggleCards}
              offLabel="Standard AMM"
              onLabel="Boosted Pool"
            />
          </section>

          {/* ─── 04 FEATURES ─── */}
          <SectionDivider />
          <section id="features" className="bloom-section">
            <SectionHeader number="04" title="Features" />

            <MotionReveal>
              <h2
                className="judgment-headline"
                style={{ marginBottom: '3rem' }}
              >
                Every dollar earning, around the clock.
              </h2>
            </MotionReveal>

            <FeatureGrid features={boostedFeatures} />
          </section>

          {/* ─── 05 COMPARISON TABLE ─── */}
          <SectionDivider />
          <section id="compare" className="bloom-section">
            <SectionHeader number="05" title="Comparison" />

            <MotionReveal>
              <h2 className="judgment-headline">
                How boosted pools stack up.
              </h2>
            </MotionReveal>

            <ComparisonTable
              columns={boostedComparisonColumns}
              rows={boostedComparisonRows}
            />
          </section>

          {/* ─── 06 ARCHITECTURE ─── */}
          <SectionDivider />
          <section id="architecture" className="bloom-section">
            <SectionHeader number="06" title="Architecture" />

            <MotionReveal>
              <h2 className="judgment-headline">
                Native yield at the vault level.
              </h2>
              <p className="section-subheading" style={{ marginBottom: '2rem' }}>
                Boosted pools use the Balancer V3 vault&apos;s ERC-4626 buffer
                layer to route idle liquidity to lending markets — no external
                keepers, no per-user overhead.
              </p>
            </MotionReveal>

            <ArchitectureDiagram
              layers={boostedLayers}
              details={boostedDetails}
            />
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>
                  MAXIMUM YIELD.{' '}
                  <span className="highlight">MINIMUM EFFORT.</span>
                </h2>
                <p>
                  One deposit. Swap fees plus lending yield. Boosted pools put
                  every dollar of liquidity to work.
                </p>
                <div className="cta-buttons">
                  <a
                    href="https://beets.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-primary"
                  >
                    Start Earning{' '}
                    <ArrowRight size={16} strokeWidth={2} />
                  </a>
                  <a
                    href="https://docs.beets.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-secondary"
                  >
                    Read the Docs
                  </a>
                  <a
                    href="https://discord.gg/beets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-secondary"
                  >
                    Join Discord
                  </a>
                </div>
              </div>
            </MotionReveal>
          </section>
        </div>

        <BeetsFooter />
      </main>
    </div>
  );
}
