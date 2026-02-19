'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, RefreshCcw, Scale, Puzzle } from 'lucide-react';
import MotionReveal from '../components/MotionReveal';
import ScrollFade from '../components/ScrollFade';
import SectionHeader from '../components/SectionHeader';
import SectionDivider from '../components/SectionDivider';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import WeightVisualizer from '../components/WeightVisualizer';
import ProblemSolutionToggle from '../components/ProblemSolutionToggle';
import FeatureGrid from '../components/FeatureGrid';
import ComparisonTable from '../components/ComparisonTable';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import BeetsNav from '../components/BeetsNav';
import BeetsFooter from '../components/BeetsFooter';
import { weightedFeatures } from '../data/weighted-features';
import { weightedToggleCards } from '../data/weighted-toggle';
import { weightedComparisonColumns, weightedComparisonRows } from '../data/weighted-comparison';
import { weightedLayers, weightedDetails } from '../data/weighted-architecture';

export default function WeightedContent() {
  return (
    <div data-beets-bg="orange">
      {/* Background System */}
      <div className="beets-bg">
        <div className="beets-bg-grid" />
        <div className="beets-bg-noise" />
        <div className="beets-bg-vignette" />
      </div>

      <main className="bloom-main">
        <BeetsNav activePool="weighted" />

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
              Weighted<span className="accent"> Pools</span>
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
              Custom-weight index funds on-chain.
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
              Up to 8 tokens. Any ratio. Self-rebalancing. Powered by Balancer V3.
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
                Create a Pool <ArrowUpRight size={14} strokeWidth={2} />
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
                    MANUAL REBALANCING{' '}
                    <span className="highlight">KILLS</span> RETURNS.
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
                    <RefreshCcw size={24} strokeWidth={1.5} />
                  </div>
                  <h4>Constant Rebalancing</h4>
                  <p>
                    Portfolios drift from target weights with every price
                    move. Rebalancing costs gas, creates taxable events, and
                    most people never bother.
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
                    <Scale size={24} strokeWidth={1.5} />
                  </div>
                  <h4>50/50 Only</h4>
                  <p>
                    Standard AMMs lock you into equal weight pairs. No way to
                    express conviction with 80/20 splits or build multi-asset
                    index portfolios.
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
                    <Puzzle size={24} strokeWidth={1.5} />
                  </div>
                  <h4>Fragmented Positions</h4>
                  <p>
                    A 5-asset portfolio means 4+ separate LP positions across
                    multiple pools. More gas, more complexity, more things to
                    track and manage.
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
                    SET YOUR WEIGHTS.{' '}
                    <span className="highlight">THE MARKET</span> REBALANCES.
                  </h2>
                  <p>
                    Define your target allocation — 80/20, 60/20/20, or equal
                    splits — and the pool enforces it. Arbitrageurs rebalance
                    for you and pay swap fees in the process.
                  </p>
                </div>
              </div>
            </MotionReveal>

            <WeightVisualizer />
          </section>

          {/* ─── 03 THE GAP ─── */}
          <SectionDivider />
          <section id="gap" className="bloom-section">
            <SectionHeader number="03" title="The Gap" />

            <MotionReveal>
              <h2 className="judgment-headline">
                Same portfolio. Different outcome.
              </h2>
            </MotionReveal>

            <ProblemSolutionToggle
              cards={weightedToggleCards}
              offLabel="Manual Portfolio"
              onLabel="Weighted Pool"
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
                Portfolio management on autopilot.
              </h2>
            </MotionReveal>

            <FeatureGrid features={weightedFeatures} />
          </section>

          {/* ─── 05 COMPARISON TABLE ─── */}
          <SectionDivider />
          <section id="compare" className="bloom-section">
            <SectionHeader number="05" title="Comparison" />

            <MotionReveal>
              <h2 className="judgment-headline">
                How weighted pools stack up.
              </h2>
            </MotionReveal>

            <ComparisonTable
              columns={weightedComparisonColumns}
              rows={weightedComparisonRows}
            />
          </section>

          {/* ─── 06 ARCHITECTURE ─── */}
          <SectionDivider />
          <section id="architecture" className="bloom-section">
            <SectionHeader number="06" title="Architecture" />

            <MotionReveal>
              <h2 className="judgment-headline">
                Audited math. Proven at scale.
              </h2>
              <p className="section-subheading" style={{ marginBottom: '2rem' }}>
                Weighted pools use a generalized constant product formula — the
                same math that powers index funds, enforced by smart contract.
              </p>
            </MotionReveal>

            <ArchitectureDiagram
              layers={weightedLayers}
              details={weightedDetails}
            />
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>
                  YOUR INDEX.{' '}
                  <span className="highlight">YOUR RULES.</span>
                </h2>
                <p>
                  Create a weighted pool with any tokens at any ratio. Earn swap
                  fees while arbitrageurs rebalance for you.
                </p>
                <div className="cta-buttons">
                  <a
                    href="https://beets.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-primary"
                  >
                    Create a Pool{' '}
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
