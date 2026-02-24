'use client';

import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StickyCTA from '../components/shared/StickyCTA';
import MotionReveal from '../components/shared/MotionReveal';
import SectionLabel from '../components/shared/SectionLabel';
import { services } from '../data/services';

// Reorder: Photography | Both (recommended, center) | Cinematography
const displayOrder = [services[0], services[2], services[1]];

export default function ServicesPage() {
  return (
    <>
      <Header />

      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">Services &amp; Pricing</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Our Packages
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="je-body" style={{ marginTop: '1rem' }}>
              Every wedding is different &mdash; these are our starting points.
              We&apos;ll create a custom proposal that fits your day.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-services-grid">
          {displayOrder.map((service) => (
            <MotionReveal key={service.title} className="je-services-grid-item">
              <div className={`je-service-card ${service.recommended ? 'je-service-card-recommended' : ''}`}>
                {service.recommended && (
                  <span className="je-service-card-badge">Most couples choose this</span>
                )}
                <h2 className="je-service-card-title">{service.title}</h2>
                <p className="je-service-card-price">{service.price}</p>
                <p className="je-body" style={{ marginBottom: '1.5rem' }}>{service.description}</p>
                <MotionReveal>
                  <SectionLabel text="What&rsquo;s Included" />
                </MotionReveal>
                <ul className="je-service-card-list">
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                  <Link href={`/jorge-events/contact?service=${service.slug}`} className="je-btn je-btn-ghost">
                    Enquire about this package
                  </Link>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container-narrow" style={{ textAlign: 'center' }}>
          <MotionReveal>
            <p className="je-editorial" style={{ fontSize: 'var(--je-text-xl)', color: 'var(--je-text)', lineHeight: 1.4 }}>
              &ldquo;The film made us cry. Our parents cried. Even our wedding planner cried.
              It&apos;s the most precious thing we own.&rdquo;
            </p>
            <p className="je-caption" style={{ marginTop: '1.5rem' }}>
              Charlotte &amp; Hugo &mdash; Le Manoir aux Quat&apos;Saisons, Spring 2024
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Bespoke note */}
      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container-narrow" style={{ textAlign: 'center' }}>
          <MotionReveal>
            <hr className="je-divider" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }} />
            <p className="je-editorial" style={{ fontSize: 'var(--je-text-xl)', color: 'var(--je-text)' }}>
              Every wedding is unique. Tell us about yours and we&apos;ll create a custom proposal.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="je-section">
        <div className="je-container">
          <MotionReveal>
            <div className="je-cta">
              <p className="je-cta-scarcity">
                Preferred dates fill quickly during peak season
              </p>
              <h2 className="je-heading je-heading-lg">
                Your date won&apos;t wait.
              </h2>
              <p className="je-body" style={{ marginTop: '1.5rem' }}>
                We recommend getting in touch 12&ndash;18 months ahead of your
                wedding date.
              </p>
              <div className="je-cta-buttons" style={{ marginTop: '2.5rem' }}>
                <Link href="/jorge-events/contact" className="je-btn je-btn-dark">
                  Check Availability for 2027
                </Link>
                <Link href="/jorge-events/portfolio" className="je-btn je-btn-ghost">
                  View Our Work
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
