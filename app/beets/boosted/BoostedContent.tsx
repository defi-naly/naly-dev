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
import { boostedFeatures } from '../data/boosted-features';

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
                <div className="about-text" style={{ textAlign: 'center' }}>
                  <h2>
                    IDLE LIQUIDITY IS{' '}
                    <span className="highlight">WASTED</span> CAPITAL.
                  </h2>
                  <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Most AMM liquidity sits idle — waiting for swaps that may
                    never come. Lending markets offer yield on the same assets,
                    but traditional LPs are forced to choose one or the other.
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
                    DUAL YIELD.{' '}
                    <span className="highlight">ZERO</span> IDLE CAPITAL.
                  </h2>
                  <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Boosted pools route unused liquidity to lending protocols
                    automatically. You earn swap fees on active capital and
                    lending yield on idle reserves — all from a single
                    position.
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
                Every dollar earning, around the clock.
              </h2>
            </MotionReveal>

            <FeatureGrid features={boostedFeatures} />
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
