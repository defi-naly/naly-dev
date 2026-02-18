'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import MotionReveal from './components/MotionReveal';
import ScrollFade from './components/ScrollFade';
import SectionDivider from './components/SectionDivider';
import { StaggerContainer, StaggerItem } from './components/StaggerContainer';
import BeetsNav from './components/BeetsNav';
import BeetsFooter from './components/BeetsFooter';
import PoolCard from './components/PoolCard';
import { poolTypes } from './data/pools';

export default function BeetsHub() {
  return (
    <div data-beets-bg="blue">
      {/* Background System */}
      <div className="beets-bg">
        <div className="beets-bg-grid" />
        <div className="beets-bg-noise" />
        <div className="beets-bg-vignette" />
      </div>

      <main className="bloom-main">
        <BeetsNav />

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
              <span className="accent">BEETS</span>
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
              The liquidity layer on Sonic.
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
              Three pool types. One vault. Powered by Balancer V3.
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
              <a href="#pools" className="bloom-hero-cta bloom-hero-cta-ghost">
                Explore Pools
              </a>
              <a
                href="https://beets.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="bloom-hero-cta bloom-hero-cta-primary"
              >
                Launch App <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </motion.div>
          </ScrollFade>
        </section>

        <div className="bloom-container">
          {/* ─── POOL TYPES ─── */}
          <SectionDivider />
          <section id="pools" className="bloom-section">
            <MotionReveal>
              <h2 className="judgment-headline">
                Three pools. One goal.
              </h2>
              <p className="section-subheading" style={{ marginBottom: '3rem' }}>
                Each pool solves a different liquidity problem. Pick the
                one that fits your strategy.
              </p>
            </MotionReveal>

            <div className="pool-cards-grid">
              {poolTypes.map((pool, i) => (
                <PoolCard key={pool.slug} pool={pool} index={i} />
              ))}
            </div>
          </section>

          {/* ─── INFRASTRUCTURE ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <MotionReveal>
              <h2 className="judgment-headline">
                Proven infrastructure. Audited code.
              </h2>
              <p className="section-subheading" style={{ marginBottom: '3rem' }}>
                Every Beets pool runs on the Balancer V3 vault — the most
                audited AMM architecture in DeFi.
              </p>
            </MotionReveal>

            <StaggerContainer className="about-stats">
              <StaggerItem>
                <motion.div
                  className="stat-block"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="stat-value">$3B+</div>
                  <div className="stat-label">Total Value Locked</div>
                  <div className="stat-sublabel">Across all Balancer deployments</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="stat-block"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="stat-value">6+</div>
                  <div className="stat-label">Security Audits</div>
                  <div className="stat-sublabel">Trail of Bits, Certora, and more</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="stat-block"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="stat-value">8</div>
                  <div className="stat-label">Chains</div>
                  <div className="stat-sublabel">Sonic, Ethereum, Arbitrum, and more</div>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>
                  YOUR LIQUIDITY.{' '}
                  <span className="highlight">YOUR STRATEGY.</span>
                </h2>
                <p>
                  Auto-adjusting ranges, custom-weight indexes,
                  or dual yield — pick a pool and start earning.
                </p>
                <div className="cta-buttons">
                  <a
                    href="https://beets.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-primary"
                  >
                    Launch App{' '}
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
