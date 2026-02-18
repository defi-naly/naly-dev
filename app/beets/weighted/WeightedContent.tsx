'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import MotionReveal from '../components/MotionReveal';
import ScrollFade from '../components/ScrollFade';
import SectionHeader from '../components/SectionHeader';
import SectionDivider from '../components/SectionDivider';
import FeatureGrid from '../components/FeatureGrid';
import BeetsNav from '../components/BeetsNav';
import BeetsFooter from '../components/BeetsFooter';
import { weightedFeatures } from '../data/weighted-features';

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
                <div className="about-text" style={{ textAlign: 'center' }}>
                  <h2>
                    MANUAL REBALANCING{' '}
                    <span className="highlight">KILLS</span> RETURNS.
                  </h2>
                  <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Traditional portfolios drift from target allocations.
                    Rebalancing costs gas, creates taxable events, and demands
                    constant attention. The overhead eats into returns.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── 02 THE SOLUTION ─── */}
          <SectionDivider />
          <section id="solution" className="bloom-section">
            <SectionHeader number="02" title="The Solution" />

            <MotionReveal>
              <div className="about-grid">
                <div className="about-text" style={{ textAlign: 'center' }}>
                  <h2>
                    SET YOUR WEIGHTS.{' '}
                    <span className="highlight">THE MARKET</span> REBALANCES.
                  </h2>
                  <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Define your target allocation — 80/20, 60/20/20, or equal
                    splits — and the pool enforces it. Arbitrageurs rebalance
                    for you and pay swap fees in the process. Your portfolio
                    stays on target while generating yield.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── 03 FEATURES ─── */}
          <SectionDivider />
          <section id="features" className="bloom-section">
            <SectionHeader number="03" title="Features" />

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
