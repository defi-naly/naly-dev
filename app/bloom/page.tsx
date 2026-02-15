'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import MotionReveal from './components/MotionReveal';
import ScrollFade from './components/ScrollFade';
import SectionHeader from './components/SectionHeader';
import SectionDivider from './components/SectionDivider';
import StatBlock from './components/StatBlock';
import PortfolioTimeline from './components/PortfolioTimeline';
import JudgmentToggle from './components/JudgmentToggle';
import { StaggerContainer, StaggerItem } from './components/StaggerContainer';
import ContactForm from './components/ContactForm';
import { ArrowRight } from 'lucide-react';
import ProcessFlow from './components/method/ProcessFlow';

// Lazy load Three.js component
const WireframeMesh = dynamic(() => import('./components/WireframeMesh'), {
  ssr: false,
});

const portfolio = [
  {
    name: 'TIPZ',
    status: 'live' as const,
    statusLabel: 'OWN PRODUCT',
    description:
      'Privacy-first micro-tipping for creators using Zcash shielded addresses. Cross-chain payments via NEAR Intents. Every feature answers: does this increase network density?',
    stats: [
      { value: '4', label: 'Chains' },
      { value: '5', label: 'Wallets' },
    ],
    tags: ['Trust'],
    milestones: [
      { year: '2024', event: 'Research & architecture design' },
      { year: '2025', event: 'Cross-chain payments via NEAR Intents' },
      { year: 'NOW', event: 'Live with ETH, USDC, SOL support', highlight: true },
    ],
    techBadges: ['Next.js', 'Supabase', 'Zcash', 'NEAR Intents'],
    link: 'https://tipz.cash',
  },
  {
    name: 'BALANCER',
    status: 'legacy' as const,
    statusLabel: 'OPERATED',
    description:
      'Launched Balancer v3 in direct partnership with Aave, DeFi\u2019s largest liquidity market. Trusted at protocol level to ship critical infrastructure.',
    stats: [
      { value: '$1.5B', label: 'Peak TVL' },
      { value: '$120B', label: 'Volume' },
    ],
    tags: ['Trust'],
    milestones: [
      { year: '2020', event: 'Launch on Ethereum mainnet' },
      { year: '2021', event: '$1.5B TVL peak achieved' },
      { year: '2022', event: 'Multi-chain expansion (Polygon, Arbitrum)' },
      { year: '2023', event: 'v3 architecture shipped' },
    ],
    techBadges: ['Solidity', 'React', 'The Graph', 'TypeScript'],
    link: 'https://balancer.fi',
  },
  {
    name: 'BEETS',
    status: 'legacy' as const,
    statusLabel: 'OPERATED',
    description:
      'Built the largest exchange on Sonic from zero. Product, contracts, validators, liquid staking. First protocol to be both #1 DEX and #1 LST on a single network.',
    stats: [
      { value: '$250M', label: 'Peak TVL' },
      { value: '$1.4B', label: 'Volume' },
    ],
    tags: ['Full Stack'],
    milestones: [
      { year: '2021', event: 'Launched on Fantom as Beethoven X' },
      { year: '2022', event: '$250M TVL peak' },
      { year: '2023', event: 'New pool architectures introduced' },
      { year: '2024', event: 'Migration to Sonic network' },
    ],
    techBadges: ['Solidity', 'Next.js', 'GraphQL'],
    link: 'https://beets.fi',
  },
];

export default function BloomPage() {
  return (
    <>
      {/* Background System */}
      <div className="bloom-bg">
        <div className="bloom-bg-grid" />
        <div className="bloom-bg-noise" />
        <div className="bloom-bg-vignette" />
      </div>

      <CustomCursor />

      <main className="bloom-main">
        {/* Navigation */}
        <nav className="bloom-nav">
          <a href="/bloom" className="bloom-nav-logo">
            BLOOM
          </a>
          <div className="bloom-nav-links">
            <a href="/bloom/foundations" className="bloom-nav-link">Foundations</a>
            <a href="/bloom/diagnostic" className="bloom-nav-link">Diagnostic</a>
            <a href="#contact" className="bloom-nav-cta">Start a Sprint</a>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section className="bloom-hero">
          <WireframeMesh />
          <ScrollFade>
            <motion.h1
              className="bloom-wordmark"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              BLOOM
            </motion.h1>
            <motion.p
              className="bloom-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              AI won&apos;t save your company. Judgment will.
            </motion.p>
            <motion.p
              className="bloom-tagline-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Foundations for networks worth building.
            </motion.p>
          </ScrollFade>
        </section>

        <div className="bloom-container">

          {/* ─── 01 THE THESIS ─── */}
          <SectionDivider />
          <section id="thesis" className="bloom-section">
            <SectionHeader number="01" title="The Thesis" />

            <div className="about-grid">
              <MotionReveal>
                <div className="about-text">
                  <h2>
                    THE NETWORK IS THE <span className="highlight">MOAT</span>.
                  </h2>
                  <div className="thesis-body">
                    <p>
                      AI will automate software. The gap between Human+AI and pure AI is 12–24 months, maybe less. When anyone can build anything, the product isn&apos;t the moat.
                    </p>
                    <p>
                      The network is.
                    </p>
                    <p>
                      Users who bring users. Trust that compounds. Distribution you own. These survive when software becomes free.
                    </p>
                    <p>
                      This is why we&apos;re selective about who we partner with.
                    </p>
                  </div>
                </div>
              </MotionReveal>
              <div className="about-stats">
                <StatBlock value={100} suffix="%" label="Shipped" delay={0} />
                <StatBlock value={5} label="Products Live" delay={200} />
                <StatBlock value={0} label="Dead Products" delay={400} />
              </div>
            </div>
          </section>

          {/* ─── 02 THE WORK ─── */}
          <SectionDivider />
          <section id="work" className="bloom-section">
            <SectionHeader number="02" title="The Work" />

            <div className="build-intro">
              <MotionReveal>
                <h2 className="judgment-headline">
                  Anyone can build now. The hard part is knowing what&apos;s worth building.
                </h2>
                <p className="section-subheading">These are the ones we chose.</p>
              </MotionReveal>
            </div>
            <PortfolioTimeline items={portfolio} />
          </section>

          {/* ─── 03 THE PROOF ─── */}
          <SectionDivider />
          <section id="proof" className="bloom-section">
            <SectionHeader number="03" title="The Proof" />

            <JudgmentToggle />
          </section>

          {/* ─── 04 FOUNDATIONS ─── */}
          <SectionDivider />
          <section id="foundations" className="bloom-section">
            <SectionHeader number="04" title="Foundations" />

            <MotionReveal>
              <h2 className="judgment-headline">Three foundations. One goal.</h2>
              <p className="section-subheading" style={{ marginBottom: '2rem' }}>
                Distribution, trust, and judgment. The three forces that survive when software becomes free.
              </p>
            </MotionReveal>
            <StaggerContainer className="edge-grid edge-grid-3">
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h4>Distribution</h4>
                  <p className="edge-tagline">How the network finds you.</p>
                  <p>Your website is your distribution. Sites that convert, built to be owned and operated by you — not dependent on us.</p>
                  <div className="edge-proof">Proof: Inside Labs — complete site, 1 day</div>
                  <div className="edge-sprint">Sprint: 1 week</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h4>Trust</h4>
                  <p className="edge-tagline">Why the network stays.</p>
                  <p>Trust is the moat your competitors can&apos;t copy. Earned through rigor. Proven at protocol level. It compounds — every delivery builds on the last.</p>
                  <div className="edge-proof">Proof: Balancer v3 — launched with Aave</div>
                  <div className="edge-sprint">Sprint: 1–2 weeks</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h4>Judgment</h4>
                  <p className="edge-tagline">What network to build.</p>
                  <p>AI builds anything. Knowing what to build is the hard part. We encode judgment into your operations.</p>
                  <div className="edge-proof">Proof: Acquired abandoned LST at 6M FTM. Built to 290M S.</div>
                  <div className="edge-sprint">Sprint: 1 week</div>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
            <MotionReveal>
              <div className="mid-cta">
                <p className="mid-cta-text">Not sure which foundation you&apos;re missing?</p>
                <a href="/bloom/diagnostic" className="bloom-hero-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                  Take the Diagnostic <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </MotionReveal>
          </section>

          {/* ─── 05 HOW WE WORK ─── */}
          <SectionDivider />
          <section id="how-we-work" className="bloom-section partners-section">
            <SectionHeader number="05" title="How We Work" />


            <div className="partners-intro">
              <MotionReveal>
                <h2 className="partners-headline">
                  Sprints, not <span className="highlight">engagements</span>.
                </h2>
                <p className="section-subheading">
                  Fixed scope. Fixed price. Shipped foundation — not a roadmap. You own it. You operate it.
                </p>
              </MotionReveal>
            </div>

            <ProcessFlow steps={[
              { id: 'identify', name: 'Identify', duration: 'Day 1',
                description: 'Which foundation is missing? One conversation to scope the sprint around a single deliverable.' },
              { id: 'build', name: 'Build', duration: '1\u20134 weeks',
                description: 'AI-augmented execution at every step. You get a working foundation — not a deck, not a roadmap.' },
              { id: 'ship', name: 'Ship & Own', duration: 'Delivered',
                description: 'You own it outright. AI workflows included. The foundation is laid. Now build the network on top.' },
            ]} />

            <MotionReveal>
              <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <a
                  href="/bloom/foundations"
                  className="bloom-hero-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  See All Foundations <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </MotionReveal>
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section id="contact" className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>Ready to ship the <span className="highlight">foundation</span>?</h2>
                <p>
                  Tell us what&apos;s missing. We&apos;ll tell you honestly if a sprint can get you there.
                </p>
                <ContactForm />
                <p className="cta-subtext">No decks. No proposals. Just the problem and the deliverable.</p>
              </div>
            </MotionReveal>
          </section>
        </div>

        {/* Footer */}
        <footer className="bloom-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>BLOOM</h2>
              <p>Network foundations. AI-native. Selective partners.</p>
            </div>
            <div className="footer-col">
              <h4>Studio</h4>
              <a href="#thesis">Thesis</a>
              <a href="#work">Work</a>
              <a href="/bloom/foundations">Foundations</a>
              <a href="/bloom/diagnostic">Diagnostic</a>
            </div>
            <div className="footer-col">
              <h4>Portfolio</h4>
              <a href="https://insidelabs.tech" target="_blank" rel="noopener noreferrer">Inside Labs</a>
              <a href="https://tipz.cash" target="_blank" rel="noopener noreferrer">TIPZ</a>
              <a href="https://balancer.fi" target="_blank" rel="noopener noreferrer">Balancer</a>
              <a href="https://beets.fi" target="_blank" rel="noopener noreferrer">Beets</a>
            </div>
            <div className="footer-col">
              <h4>Foundations</h4>
              <a href="/bloom/foundations#distribution">Distribution</a>
              <a href="/bloom/foundations#trust">Trust</a>
              <a href="/bloom/foundations#judgment">Judgment</a>
            </div>
            <div className="footer-col">
              <h4>Links</h4>
              <a href="https://twitter.com/bloomstudio" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="#contact">Start a Sprint</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 BLOOM</p>
          </div>
        </footer>
      </main>
    </>
  );
}
