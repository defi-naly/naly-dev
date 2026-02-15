'use client';

import MethodHero from '../components/method/MethodHero';
import SectionHeader from '../components/SectionHeader';
import SectionDivider from '../components/SectionDivider';
import MotionReveal from '../components/MotionReveal';
import PillarGrid from '../components/method/PillarGrid';
import ProcessFlow from '../components/method/ProcessFlow';
import MethodCTA from '../components/method/MethodCTA';
import MethodProblemToggle from '../components/method/MethodProblemToggle';
import { pillars, stages } from '../data/method';
import './method.css';

export default function MethodPage() {
  return (
    <>
      {/* Background System */}
      <div className="bloom-bg">
        <div className="bloom-bg-grid" />
        <div className="bloom-bg-noise" />
        <div className="bloom-bg-vignette" />
      </div>

      <main className="bloom-main">
        {/* Navigation */}
        <nav className="bloom-nav">
          <a href="/bloom" className="bloom-nav-logo">
            BLOOM
          </a>
          <div className="bloom-nav-links">
            <a href="/bloom/method" className="bloom-nav-link" style={{ color: 'var(--bright)' }}>Method</a>
            <a href="/bloom/diagnostic" className="bloom-nav-link">Diagnostic</a>
            <a href="/bloom#contact" className="bloom-nav-cta">Contact</a>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <MethodHero />

        <div className="bloom-container">

          {/* ─── 01 THE PROBLEM ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <SectionHeader number="01" title="The Problem" />
            <div className="method-problem">
              <MotionReveal>
                <h2 className="method-problem-headline">
                  Most AI integration is <span className="highlight">adding tools to broken systems</span>.
                </h2>
              </MotionReveal>
              <MotionReveal delay={0.1}>
                <p className="method-problem-subline">The difference is where you intervene.</p>
              </MotionReveal>
            </div>
            <MethodProblemToggle />
          </section>

          {/* ─── 02 FOUR PILLARS ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <SectionHeader number="02" title="Four Pillars" />
            <PillarGrid pillars={pillars} />
          </section>

          {/* ─── 03 THE PROCESS ─── */}
          <SectionDivider />
          <section className="bloom-section">
            <SectionHeader number="03" title="The Process" />
            <ProcessFlow steps={stages.map(s => ({ id: s.id, name: s.name, duration: s.duration, description: s.description }))} />
          </section>

          {/* ─── CTA ─── */}
          <SectionDivider />
          <section id="contact" className="cta-section method-cta-section">
            <MethodCTA />
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
              <a href="/bloom#thesis">Thesis</a>
              <a href="/bloom#partners">Partners</a>
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
