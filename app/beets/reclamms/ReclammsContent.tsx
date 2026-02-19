'use client';

import { motion } from 'motion/react';
import MotionReveal from '../components/MotionReveal';
import ScrollFade from '../components/ScrollFade';
import SectionHeader from '../components/SectionHeader';
import SectionDivider from '../components/SectionDivider';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import RangeVisualizer from '../components/RangeVisualizer';
import ProblemSolutionToggle from '../components/ProblemSolutionToggle';
import FeatureGrid from '../components/FeatureGrid';
import ComparisonTable from '../components/ComparisonTable';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import BeetsNav from '../components/BeetsNav';
import BeetsFooter from '../components/BeetsFooter';
import { ArrowRight, ArrowUpRight, RefreshCcw, Puzzle, Bot } from 'lucide-react';

export default function ReclammsContent() {
  return (
    <div data-beets-bg="green">
      {/* Background System */}
      <div className="beets-bg">
        <div className="beets-bg-grid" />
        <div className="beets-bg-noise" />
        <div className="beets-bg-vignette" />
      </div>

      <main className="bloom-main">
        <BeetsNav activePool="reclamms" />

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
              re<span className="accent">CLAMMs</span>
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
              Concentrated liquidity that manages itself.
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
              Auto-adjusting ranges. Fungible positions. Built on Balancer V3.
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
                Learn How It Works
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
                    CONCENTRATED LIQUIDITY IS{' '}
                    <span className="highlight">BROKEN</span> FOR REAL USERS.
                  </h2>
                </div>
              </div>
            </MotionReveal>

            <StaggerContainer className="pain-cards">
              <StaggerItem>
                <motion.div
                  className="pain-card"
                  whileHover={{ y: -4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <div className="pain-card-icon">
                    <RefreshCcw size={24} strokeWidth={1.5} />
                  </div>
                  <h4>Constant Management</h4>
                  <p>
                    Positions drift out of range and fees drop to zero.
                    Redeploying costs gas, takes time, and resets every price
                    move.
                  </p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="pain-card"
                  whileHover={{ y: -4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <div className="pain-card-icon">
                    <Puzzle size={24} strokeWidth={1.5} />
                  </div>
                  <h4>NFT Positions</h4>
                  <p>
                    Can&apos;t compose it. Can&apos;t collateralize it. Your LP
                    is locked in a non-fungible NFT that no other protocol
                    accepts.
                  </p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="pain-card"
                  whileHover={{ y: -4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <div className="pain-card-icon">
                    <Bot size={24} strokeWidth={1.5} />
                  </div>
                  <h4>JIT Attacks</h4>
                  <p>
                    Bots sandwich your swaps with just-in-time liquidity. You
                    provide the capital — they extract the profit. No defense,
                    no recourse.
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
                <div className="about-text" >
                  <h2>
                    AUTO-ADJUSTING RANGES.{' '}
                    <span className="highlight">ZERO</span> MANAGEMENT.
                  </h2>
                  <p >
                    reCLAMMs ranges track the market price on-chain. Your
                    liquidity stays concentrated where trades happen — earning
                    fees without intervention.
                  </p>
                </div>
              </div>
            </MotionReveal>

            <RangeVisualizer />
          </section>

          {/* ─── 03 THE COMPARISON ─── */}
          <SectionDivider />
          <section id="toggle" className="bloom-section">
            <SectionHeader number="03" title="The Gap" />

            <MotionReveal>
              <h2 className="judgment-headline">
                Same capital. Different outcome.
              </h2>
            </MotionReveal>

            <ProblemSolutionToggle />
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
                Everything concentrated liquidity was supposed to be.
              </h2>
            </MotionReveal>

            <FeatureGrid />
          </section>

          {/* ─── 05 COMPARISON TABLE ─── */}
          <SectionDivider />
          <section id="compare" className="bloom-section">
            <SectionHeader number="05" title="Comparison" />

            <MotionReveal>
              <h2 className="judgment-headline">
                How reCLAMMs stacks up.
              </h2>
            </MotionReveal>

            <ComparisonTable />
          </section>

          {/* ─── 06 ARCHITECTURE ─── */}
          <SectionDivider />
          <section id="architecture" className="bloom-section">
            <SectionHeader number="06" title="Architecture" />

            <MotionReveal>
              <h2 className="judgment-headline">
                Audited infrastructure. Proven at scale.
              </h2>
              <p className="section-subheading" style={{ marginBottom: '2rem' }}>
                reCLAMMs is a pool module on the Balancer V3 vault — audited
                by Trail of Bits, Certora, and more.
              </p>
            </MotionReveal>

            <ArchitectureDiagram />
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>
                  YOUR LIQUIDITY.{' '}
                  <span className="highlight">ON AUTOPILOT.</span>
                </h2>
                <p>
                  Deploy once and earn fees. No rebalancing. No monitoring.
                  reCLAMMs handles the rest.
                </p>
                <div className="cta-buttons">
                  <a
                    href="https://beets.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-primary"
                  >
                    Start LPing on Beets{' '}
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
