'use client';

import { motion } from 'motion/react';
import CustomCursor from '../components/CustomCursor';
import MotionReveal from '../components/MotionReveal';
import ScrollFade from '../components/ScrollFade';
import SectionHeader from '../components/SectionHeader';
import SectionDivider from '../components/SectionDivider';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import ContactForm from '../components/ContactForm';
import ProcessFlow from '../components/method/ProcessFlow';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
            <a href="/bloom#contact" className="bloom-nav-cta">Start a Sprint</a>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section className="bloom-hero" style={{ minHeight: '70vh' }}>
          <ScrollFade>
            <motion.h1
              className="bloom-wordmark"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              FOUNDATIONS
            </motion.h1>
            <motion.p
              className="bloom-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              THE NETWORK IS THE MOAT.
            </motion.p>
            <motion.p
              className="bloom-tagline-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.7' }}
            >
              AI will automate software. It won&apos;t automate people or capital. The only durable asset is a network — users, trust, distribution — that compounds faster than competitors can clone.
            </motion.p>
            <motion.p
              className="bloom-tagline-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'var(--bright)' }}
            >
              We build the foundations that get you there.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}
            >
              <a href="/bloom#contact" className="bloom-hero-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                Start a Sprint <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </motion.div>
          </ScrollFade>
        </section>

        <div className="bloom-container">

          {/* ─── 01 THE THESIS ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <SectionHeader number="01" title="The Thesis" />
            <MotionReveal>
              <div className="about-text">
                <h2 className="judgment-headline">Software is about to become free.</h2>
                <div className="thesis-body">
                  <p>
                    When anyone can build anything, the product isn&apos;t the moat. The network is. Users who bring users. Trust that compounds. Distribution you own.
                  </p>
                  <p>
                    The companies that survive the AI transition won&apos;t be the ones who built the best software. They&apos;ll be the ones who built the best networks.
                  </p>
                  <p>
                    We build the foundations that networks are built on.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── 02 THREE FOUNDATIONS ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <SectionHeader number="02" title="Three Foundations" />
            <MotionReveal>
              <h2 className="judgment-headline">Three foundations. One goal.</h2>
              <p className="section-subheading">
                The network is the moat. Distribution gets you there. Trust makes it stick. Judgment tells you which one to build.
              </p>
            </MotionReveal>

            {/* Distribution */}
            <MotionReveal>
              <div id="distribution" className="foundation-detail">
                <div className="foundation-detail-header">
                  <span className="edge-number">01</span>
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
                  <div className="foundation-proof">
                    <strong>Proof:</strong> Inside Labs — complete marketing site, 1 day. AI-augmented content workflows they own and operate.
                  </div>
                  <div className="foundation-sprint">Sprint: 1 week, fixed price</div>
                </div>
              </div>
            </MotionReveal>

            {/* Trust */}
            <MotionReveal>
              <div id="trust" className="foundation-detail">
                <div className="foundation-detail-header">
                  <span className="edge-number">02</span>
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
                  <div className="foundation-proof">
                    <strong>Proof:</strong> Balancer v3 — launched in direct partnership with Aave, DeFi&apos;s largest liquidity market. Trust earned at protocol level.
                  </div>
                  <div className="foundation-sprint">Sprint: 1–2 weeks, fixed price</div>
                </div>
              </div>
            </MotionReveal>

            {/* Judgment */}
            <MotionReveal>
              <div id="judgment" className="foundation-detail">
                <div className="foundation-detail-header">
                  <span className="edge-number">03</span>
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
                  <div className="foundation-proof">
                    <strong>Proof:</strong> Stader abandoned Fantom. 6M FTM in a dead contract. We acquired it, rebranded to stS, and built it into Sonic&apos;s largest LST — 290M S at peak. That&apos;s judgment.
                  </div>
                  <div className="foundation-sprint">Sprint: 1 week, fixed price</div>
                </div>
              </div>
            </MotionReveal>
          </section>

          {/* ─── 03 THE SPRINT MODEL ─── */}
          <SectionDivider />
          <section className="bloom-section partners-section">
            <SectionHeader number="03" title="The Sprint Model" />
            <MotionReveal>
              <h2 className="judgment-headline">Fixed scope. Fixed price. Foundation shipped.</h2>
              <p className="section-subheading">
                Not a retainer. Not a roadmap. Not a 90-day engagement. One sprint, one foundation, you own it. Then you build the network on top.
              </p>
            </MotionReveal>

            <ProcessFlow steps={[
              { id: 'identify', name: 'Identify', duration: 'Day 1',
                description: 'Which foundation is missing? Distribution, trust, or judgment? One conversation to scope the sprint around a single deliverable.' },
              { id: 'build', name: 'Build', duration: '1\u20134 weeks',
                description: 'AI-augmented execution at every step. What traditional teams quote in months, we ship in weeks. You get a working foundation \u2014 not a deck, not a roadmap.' },
              { id: 'ship', name: 'Ship & Own', duration: 'Delivered',
                description: 'You own it outright. AI workflows included. The foundation is laid. If there\u2019s a next sprint, we scope it based on what we learned from the first.' },
            ]} />
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section id="contact" className="cta-section">
            <MotionReveal>
              <div className="cta-content">
                <h2>The network is the moat. We build the <span className="highlight">foundations</span>.</h2>
                <p>
                  Tell us what&apos;s missing. We&apos;ll tell you if a sprint can get you there.
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
