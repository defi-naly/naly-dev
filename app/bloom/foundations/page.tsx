'use client';

import { motion } from 'motion/react';
import CustomCursor from '../components/CustomCursor';
import MotionReveal from '../components/MotionReveal';
import StatBlock from '../components/StatBlock';

import SectionDivider from '../components/SectionDivider';

import ContactForm from '../components/ContactForm';
import ProcessFlow from '../components/method/ProcessFlow';
import { ArrowLeft, Globe, Shield, Compass } from 'lucide-react';

export default function FoundationsPage() {
  return (
    <>
      {/* Background */}
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
            <a href="/bloom" className="bloom-nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={12} strokeWidth={1.5} />
              Back
            </a>
            <a href="/bloom/diagnostic" className="bloom-nav-link">Diagnostic</a>
            <a href="#contact" className="bloom-nav-cta">Start a Sprint</a>
          </div>
        </nav>

        {/* ─── HERO (thesis folded in) ─── */}
        <div className="diag-container" style={{ minHeight: 'auto', paddingBottom: 0 }}>
          <motion.div
            className="diag-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="diag-title">What survives when software is free</h1>
            <p className="diag-subtitle">
              AI will commoditize every product. The companies that survive won&apos;t be the ones who built the best software — they&apos;ll be the ones who built the best networks. We build the foundations that networks are built on.
            </p>
          </motion.div>
        </div>

        <div className="bloom-container">

          {/* ─── TRUST SIGNALS ─── */}
          <SectionDivider />
          <section className="bloom-section stats-section">
            <div className="about-stats">
              <StatBlock prefix="$" value={120} suffix="B" label="Protocol Volume" sublabel="Through custom AMM innovation" delay={0} />
              <StatBlock value={48} suffix="x" label="Liquidity Growth" sublabel="No new incentive token required" delay={200} />
              <StatBlock value={78} suffix="%" label="Market Dominance" sublabel="Via established social capital" delay={400} />
            </div>
            <MotionReveal>
              <p className="stats-bridge">
                We built these numbers in DeFi — protocols that move billions through network effects alone. The economics transfer. Distribution, trust, and compounding work the same way in every domain.
              </p>
            </MotionReveal>
          </section>

          {/* ─── THREE FOUNDATIONS ─── */}
          <SectionDivider />
          <section className="bloom-section stats-section">
            <MotionReveal>
              <h2 className="judgment-headline">Three foundations. One goal.</h2>
              <p className="stats-bridge">
                Distribution gets you there. Trust makes it stick. Judgment tells you what to build.
              </p>
            </MotionReveal>

            {/* Distribution */}
            <MotionReveal>
              <div id="distribution" className="foundation-detail">
                <div className="foundation-detail-header">
                  <Globe size={20} strokeWidth={1.5} className="foundation-icon" />
                  <h3>Distribution</h3>
                  <p className="edge-tagline">How the network finds you.</p>
                </div>
                <div className="foundation-detail-body">
                  <p>
                    You can&apos;t build a network nobody knows about. We build distribution that converts — sites, content systems, launch infrastructure — with AI workflows built in so you can operate without us.
                  </p>
                  <div className="foundation-deliverables">
                    <h4>Deliverables</h4>
                    <ul>
                      <li>Marketing sites with AI-assisted content workflows</li>
                      <li>Landing pages with built-in optimization</li>
                      <li>Content systems you run without a team</li>
                      <li>SEO architecture with automated monitoring</li>
                    </ul>
                  </div>
                  <div className="foundation-proof foundation-proof-highlight">
                    <strong>Proof:</strong> Balancer — complete rebrand and marketing site for the v3 protocol launch. Distribution they own and operate.
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* Trust */}
            <MotionReveal>
              <div id="trust" className="foundation-detail">
                <div className="foundation-detail-header">
                  <Shield size={20} strokeWidth={1.5} className="foundation-icon" />
                  <h3>Trust</h3>
                  <p className="edge-tagline">Why the network stays.</p>
                </div>
                <div className="foundation-detail-body">
                  <p>
                    Networks don&apos;t grow without trust. We build brand, positioning, and social proof systems — the infrastructure that turns visitors into users and users into advocates.
                  </p>
                  <div className="foundation-deliverables">
                    <h4>Deliverables</h4>
                    <ul>
                      <li>Brand identity with AI-ready asset systems</li>
                      <li>Positioning strategy encoded into templates</li>
                      <li>Case study frameworks you replicate</li>
                      <li>Social proof systems that scale</li>
                    </ul>
                  </div>
                  <div className="foundation-proof foundation-proof-highlight">
                    <strong>Proof:</strong> Balancer v3 — launched in direct partnership with Aave, DeFi&apos;s largest liquidity market. Trust earned at protocol level.
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* Judgment */}
            <MotionReveal>
              <div id="judgment" className="foundation-detail">
                <div className="foundation-detail-header">
                  <Compass size={20} strokeWidth={1.5} className="foundation-icon" />
                  <h3>Judgment</h3>
                  <p className="edge-tagline">What network to build.</p>
                </div>
                <div className="foundation-detail-body">
                  <p>
                    AI builds anything. Knowing what to build is the hard part. We encode judgment into your operations — decision frameworks, workflows, and dashboards that run continuously.
                  </p>
                  <div className="foundation-deliverables">
                    <h4>Deliverables</h4>
                    <ul>
                      <li>AI workflow design integrated into your stack</li>
                      <li>Decision frameworks that run continuously</li>
                      <li>Competitive dashboards with live monitoring</li>
                      <li>Positioning docs that update as market shifts</li>
                    </ul>
                  </div>
                  <div className="foundation-proof foundation-proof-highlight">
                    <strong>Proof:</strong> Stader abandoned Fantom. 6M FTM in a dead contract. We acquired it, rebranded to stS, and built it into Sonic&apos;s largest LST — 290M S at peak. That&apos;s judgment.
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* Mid-page CTA */}
            <MotionReveal>
              <div className="mid-cta">
                <p className="mid-cta-text">Know which foundation you need?</p>
                <a href="#contact" className="bloom-hero-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                  Start a Sprint
                </a>
              </div>
            </MotionReveal>
          </section>

          {/* ─── HOW WE WORK ─── */}
          <SectionDivider />
          <section className="bloom-section partners-section">
            <MotionReveal>
              <h2 className="judgment-headline">How we work</h2>
              <p className="section-subheading">
                We learn your system before we touch it. Then we rebuild the foundation with AI-augmented workflows baked in — and hand you the keys.
              </p>
            </MotionReveal>

            <ProcessFlow steps={[
              { id: 'understand', name: 'Understand', duration: 'Week 1',
                description: 'Deep dive into your existing system — users, data flows, dependencies, pain points. No assumptions.' },
              { id: 'map', name: 'Map', duration: 'Week 1',
                description: 'Clean architecture of what exists and what needs to change. Every decision documented.' },
              { id: 'analyze', name: 'Analyze', duration: 'Week 2',
                description: 'Identify the foundation gaps — where the system breaks, where AI can replace manual work, where value compounds.' },
              { id: 'implement', name: 'Implement', duration: 'Weeks 2–4',
                description: 'AI-augmented build on the new system. Every workflow designed to run without us.' },
              { id: 'ship', name: 'Ship & Own', duration: 'Delivered',
                description: 'You own it. Fully operational, documented, and handed to your team. The foundation compounds from here.' },
            ]} />
          </section>

          {/* ─── THE INVESTMENT ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <MotionReveal>
              <div className="investment-section">
                <h2 className="investment-headline">The Investment</h2>
                <p className="investment-subline">One sprint. One foundation. $15,000.</p>

                <div className="investment-comparison">
                  <div className="investment-row">
                    <span className="investment-row-label">Agencies quote this in months.</span>
                    <span className="investment-row-cost">$45,000 – $150,000</span>
                  </div>
                  <div className="investment-row">
                    <span className="investment-row-label">Consultants deliver decks.</span>
                    <span className="investment-row-cost">$200–500/hr, nothing ships</span>
                  </div>
                  <div className="investment-row">
                    <span className="investment-row-label">Freelancers lack the strategic layer.</span>
                    <span className="investment-row-cost">$6,000 – $10,000</span>
                  </div>
                  <div className="investment-row investment-row-bloom">
                    <span className="investment-row-label">BLOOM ships a working foundation in one week.</span>
                    <span className="investment-row-cost">$15,000</span>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── FOUNDATION STACK ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <MotionReveal>
              <h2 className="judgment-headline">Foundation Stack</h2>
              <p className="section-subheading" style={{ marginBottom: '3rem' }}>
                Most companies are weak on two or three foundations. Stack sprints and save.
              </p>
              <div className="pricing-tiers">
                <div className="pricing-tier">
                  <div className="pricing-tier-label">Single</div>
                  <div className="pricing-tier-name">1 Sprint</div>
                  <div className="pricing-tier-price">$15,000</div>
                  <div className="pricing-tier-savings">&nbsp;</div>
                  <p className="pricing-tier-desc">One foundation. One week. You own it.</p>
                </div>
                <div className="pricing-tier">
                  <div className="pricing-tier-label">Double</div>
                  <div className="pricing-tier-name">2 Sprints</div>
                  <div className="pricing-tier-price">$28,000</div>
                  <div className="pricing-tier-savings">Save $2,000</div>
                  <p className="pricing-tier-desc">Two foundations. Consecutive weeks. Compounding momentum.</p>
                </div>
                <div className="pricing-tier pricing-tier-featured">
                  <div className="pricing-tier-label">Full Stack</div>
                  <div className="pricing-tier-name">3 Sprints</div>
                  <div className="pricing-tier-price">$40,000</div>
                  <div className="pricing-tier-savings">Save $5,000</div>
                  <p className="pricing-tier-desc">All three foundations. Three weeks. The complete network base.</p>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section id="contact" className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>One sprint. One foundation. <span className="highlight">You own it</span>.</h2>
                <p>
                  Tell us which foundation is missing. We&apos;ll tell you if a sprint can get you there.
                </p>
                <ContactForm />
                <p className="cta-subtext">We respond within 48 hours. No decks. No proposals. Just the problem and the deliverable.</p>
              </div>
            </MotionReveal>
          </section>
        </div>

        {/* Footer */}
        <footer className="bloom-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>BLOOM</h2>
              <p>Network foundations. AI-native. Operator-built.</p>
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
