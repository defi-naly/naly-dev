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
import { ExternalLink, ArrowRight, ArrowDown } from 'lucide-react';
import ProcessFlow from './components/method/ProcessFlow';

// Lazy load Three.js component
const WireframeMesh = dynamic(() => import('./components/WireframeMesh'), {
  ssr: false,
});

const portfolio = [
  {
    name: 'TIPZ',
    status: 'live' as const,
    statusLabel: 'PRIMARY BET',
    description:
      'The network effects bet. Privacy-first micro-tipping for creators using Zcash shielded addresses. Every feature answers one question: does this increase network density? Cross-chain payments via NEAR Intents, real-time notifications, creator tools, browser extension.',
    stats: [
      { value: '4', label: 'Chains Supported' },
      { value: '5', label: 'Wallet Integrations' },
    ],
    tags: ['Payments', 'Cross-Chain', 'Creator Tools'],
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
      'Contributed to the architecture of a protocol handling $120B in volume. Smart contracts, complex financial logic, multi-chain deployment across Ethereum, Polygon, and Arbitrum.',
    stats: [
      { value: '$1.5B', label: 'Peak TVL' },
      { value: '$120B', label: 'Total Volume' },
    ],
    tags: ['Smart Contracts', 'Multi-Chain', 'Protocol'],
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
      'Built the largest exchange on a new blockchain from zero. Product, contracts, validators, liquid staking — the full stack. First and only protocol to be both the #1 DEX and #1 LST on a single network.',
    stats: [
      { value: '$250M', label: 'Peak TVL' },
      { value: '$1.4B', label: 'All-Time Volume' },
    ],
    tags: ['Full Stack', 'From Zero', 'Sonic'],
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
            <a href="/bloom/method" className="bloom-nav-link">Method</a>
            <a href="/bloom/diagnostic" className="bloom-nav-link">Diagnostic</a>
            <a href="#contact" className="bloom-nav-cta">Contact</a>
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
              AI won&apos;t save your company. Judgment will. We&apos;re the venture studio that brings both.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <a href="/bloom/diagnostic" className="bloom-hero-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                Take the Diagnostic <ArrowRight size={14} strokeWidth={1.5} />
              </a>
              <a href="#proof" className="bloom-hero-cta bloom-hero-cta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                See the Proof <ArrowDown size={14} strokeWidth={1.5} />
              </a>
            </motion.div>
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
                    THE WINDOW IS <span className="highlight">CLOSING</span>.
                  </h2>
                  <div className="thesis-body">
                    <p>
                      AI will automate software. The gap between Human+AI and pure AI is shrinking — 12 to 24 months, maybe less. Most companies are scrambling to add AI tools. We&apos;re asking a different question.
                    </p>
                    <p>
                      What assets can you own that still matter when AI builds everything? Network effects. Distribution. Judgment. Trust. The answer isn&apos;t building faster — it&apos;s building things that compound.
                    </p>
                  </div>
                </div>
              </MotionReveal>
              <MotionReveal>
                <p className="section-subheading">We convert the current advantage into assets that last.</p>
              </MotionReveal>
              <div className="about-stats">
                <StatBlock value={100} suffix="%" label="Ship Rate" delay={0} />
                <StatBlock value={5} label="Products Shipped" delay={200} />
                <StatBlock value={10} suffix="x" label="Output per Person" delay={400} />
              </div>
            </div>
          </section>

          {/* ─── 02 THE PROOF ─── */}
          <SectionDivider />
          <section id="proof" className="bloom-section">
            <SectionHeader number="02" title="The Proof" />
            <JudgmentToggle />
            {/* Mid-page CTA — captures desire at peak after toggle interaction */}
            <MotionReveal>
              <div className="mid-cta">
                <p className="mid-cta-text">Think you know where your system breaks?</p>
                <a href="/bloom/diagnostic" className="bloom-hero-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                  Score Your Organization <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </MotionReveal>
          </section>

          {/* ─── 03 WHAT WE'VE BUILT ─── */}
          <SectionDivider />
          <section id="work" className="bloom-section">
            <SectionHeader number="03" title="What We've Built" />
            <div className="build-intro">
              <MotionReveal>
                <h2 className="judgment-headline">
                  Anyone can build a product now — the hard part is building one that works.
                </h2>
              </MotionReveal>
            </div>
            <PortfolioTimeline items={portfolio} />
          </section>

          {/* ─── 04 THE EDGE ─── */}
          <SectionDivider />
          <section id="edge" className="bloom-section">
            <SectionHeader number="04" title="The Edge" />
            <h2 className="judgment-headline">Everyone has access to the tools. Few know what to build with them.</h2>
            <StaggerContainer className="edge-grid">
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="edge-number">01</span>
                  <h4>Judgment Compounds</h4>
                  <p>AI made building fast. It didn&apos;t make building the right thing fast. Judgment is the only asset that appreciates when everything else gets automated.</p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="edge-number">02</span>
                  <h4>Small Team, Full Leverage</h4>
                  <p>Every team member operates at the frontier. No managers managing managers. No committees. The window where small teams outperform large ones has never been wider — and it&apos;s closing.</p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="edge-number">03</span>
                  <h4>Network Effects or Nothing</h4>
                  <p>Products without moats are features someone will clone. We only build things with network effects, compounding distribution, or structural advantages. Everything else is a waste of the window.</p>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="edge-item"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="edge-number">04</span>
                  <h4>Own What Compounds</h4>
                  <p>Every engagement produces a durable asset — products, frameworks, distribution, relationships. We don&apos;t trade time for money. If it doesn&apos;t compound, we don&apos;t do it.</p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </section>

          {/* ─── 05 SELECTIVE PARTNERS ─── */}
          <SectionDivider />
          <section id="partners" className="bloom-section partners-section">
            <SectionHeader number="05" title="How We Work" />

            {/* Full-width intro */}
            <div className="partners-intro">
              <MotionReveal>
                <h2 className="partners-headline">
                  We selectively partner with companies <span className="highlight">worth amplifying</span>.
                </h2>
              </MotionReveal>
            </div>

            {/* Timeline: Process steps */}
            <ProcessFlow steps={[
              { id: 'discovery', name: 'Discovery', duration: '~1 week',
                description: 'We map where the durable assets are \u2014 network effects, distribution, trust \u2014 and whether AI will capture them or just accelerate the wrong things.' },
              { id: 'build', name: 'Build', duration: '2\u20134 weeks',
                description: 'Fixed scope. Working software that builds toward something durable. Not a roadmap \u2014 an asset. AI-augmented execution means we ship what traditional teams quote in months.' },
              { id: 'validate', name: 'Validate', duration: '90 days',
                description: 'Do the assets actually compound? Network density growing, distribution widening, trust deepening \u2014 or just metrics moving. If it\u2019s not compounding, we walk away together.' },
            ]} />

            {/* Method CTA */}
            <MotionReveal>
              <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <a
                  href="/bloom/method"
                  className="bloom-hero-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  See the Full Methodology <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </MotionReveal>

            {/* Current Partners */}
            <MotionReveal>
              <div className="current-partners">
                <span className="current-partners-label">Current Partners</span>
                <div className="current-partners-logos">
                  <a href="https://insidelabs.tech" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                    <span className="partner-logo-text">INSIDE LABS</span>
                    <ExternalLink size={11} strokeWidth={1.5} />
                  </a>
                  <a href="https://soniclabs.com" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                    <span className="partner-logo-text">SONIC</span>
                    <ExternalLink size={11} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section id="contact" className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>Ready to <span className="highlight">build something durable</span>?</h2>
                <p>
                  Tell us what you&apos;re building. We&apos;ll tell you honestly whether we can help.
                </p>
                <ContactForm />
                <p className="cta-subtext">No decks. No proposals. Just the problem and the people.</p>
              </div>
            </MotionReveal>
          </section>
        </div>

        {/* Footer */}
        <footer className="bloom-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>BLOOM</h2>
              <p>Software venture studio. AI-native. Operator-built.</p>
            </div>
            <div className="footer-col">
              <h4>Studio</h4>
              <a href="#thesis">Thesis</a>
              <a href="#partners">Partners</a>
              <a href="/bloom/method">Method</a>
              <a href="/bloom/diagnostic">Diagnostic</a>
            </div>
            <div className="footer-col">
              <h4>Portfolio</h4>
              <a href="https://tipz.cash" target="_blank" rel="noopener noreferrer">TIPZ</a>
              <a href="https://balancer.fi" target="_blank" rel="noopener noreferrer">Balancer</a>
              <a href="https://beets.fi" target="_blank" rel="noopener noreferrer">Beets</a>
            </div>
            <div className="footer-col">
              <h4>Partners</h4>
              <a href="https://insidelabs.tech" target="_blank" rel="noopener noreferrer">Inside Labs</a>
              <a href="https://soniclabs.com" target="_blank" rel="noopener noreferrer">Sonic</a>
            </div>
            <div className="footer-col">
              <h4>Links</h4>
              <a href="https://twitter.com/bloomstudio" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="#contact">Contact</a>
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
