'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StickyCTA from '../components/shared/StickyCTA';
import MotionReveal from '../components/shared/MotionReveal';
import { faqItems } from '../data/faq';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <>
      <Header />

      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">FAQ</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Frequently Asked Questions
            </h1>
          </MotionReveal>
        </div>
      </section>

      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container" style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqItems.map((item, idx) => (
            <MotionReveal key={idx} delay={idx * 0.05}>
              <div className={`je-faq-item ${openIndex === idx ? 'open' : ''}`}>
                <button
                  className="je-faq-trigger"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="je-faq-question">{item.question}</span>
                  <svg className="je-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className="je-faq-answer">
                  <div className="je-faq-answer-inner">
                    {item.answer}
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="je-section">
        <div className="je-container">
          <MotionReveal>
            <div className="je-cta">
              <h2 className="je-heading je-heading-lg">
                Still Have Questions?
              </h2>
              <p className="je-body" style={{ marginTop: '1.5rem' }}>
                We are always happy to chat. Get in touch and we will answer
                anything not covered here.
              </p>
              <div className="je-cta-buttons" style={{ marginTop: '2.5rem' }}>
                <Link href="/jorge-events/contact" className="je-btn je-btn-accent">
                  Get in Touch
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </>
  );
}
