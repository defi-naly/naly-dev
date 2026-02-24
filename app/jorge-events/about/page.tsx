'use client';

import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LogoBar from '../components/social-proof/LogoBar';
import StatsRow from '../components/social-proof/StatsRow';
import StickyCTA from '../components/shared/StickyCTA';
import MotionReveal from '../components/shared/MotionReveal';
import SectionLabel from '../components/shared/SectionLabel';
import ParallaxImage from '../components/shared/ParallaxImage';
import { images } from '../data/images';

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal variant="clip">
            <p className="je-caption">About Us</p>
          </MotionReveal>
          <MotionReveal delay={0.1} variant="split">
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Siblings. Storytellers. Witnesses.
            </h1>
          </MotionReveal>
        </div>
      </section>

      {/* Hero Image — parallax */}
      <section style={{ padding: 0 }}>
        <div className="je-container" data-cursor="view">
          <ParallaxImage
            src={images.aboutCover}
            alt="Jojo and George at work"
            aspectRatio="2.4 / 1"
          />
        </div>
      </section>

      {/* Narrative */}
      <section className="je-section">
        <div className="je-container-narrow">
          <MotionReveal variant="clip">
            <SectionLabel text="Our Story" />
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="je-body je-body-lg" style={{ marginTop: '2rem' }}>
              Before they were photographers, they were brother and sister. Growing up,
              Jojo and George were the kids who noticed the same things &mdash; the way
              afternoon light pooled on the kitchen tiles, the exact moment their grandfather&apos;s
              eyes softened before he told a story. They didn&apos;t know it then, but they were
              already learning to see together.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="je-body je-body-lg" style={{ marginTop: '1.5rem' }}>
              Jojo picked up a camera at nineteen &mdash; a borrowed Nikon, when she was
              supposed to be studying politics. Within two years she was shooting for wire
              agencies in the Middle East. By twenty-five she had covered conflicts, elections,
              and human stories across four continents. In 2007, she won the National Geographic
              Grand Prize for documentary photography. It didn&apos;t change her direction &mdash; it
              confirmed what she&apos;d already felt: that her life would be spent bearing
              witness to other people&apos;s stories.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <p className="je-body je-body-lg" style={{ marginTop: '1.5rem' }}>
              George came to images through a different door &mdash; cinematography, then
              the still frame. His editorial work has appeared in Vogue, Tatler, and
              across Conde Nast. Where Jojo reads emotion in a room, George reads light.
              Where she moves toward the tears, he moves toward the architecture of the
              moment. They see differently, but they see the same things.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="je-body je-body-lg" style={{ marginTop: '1.5rem' }}>
              In 2019, they stopped working apart and started working together. The logic
              was simple: they&apos;d spent twenty-seven years watching the world side by side.
              Why wouldn&apos;t they photograph it that way?
            </p>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <p className="je-body je-body-lg" style={{ marginTop: '1.5rem' }}>
              They chose weddings because a wedding is a family witnessing someone they
              love step into a new life. And witnessing the people they love &mdash; reading
              the room, feeling the shift, knowing when the moment is about to break open &mdash;
              that&apos;s something Jojo and George have been practising since long before
              they picked up cameras. They just didn&apos;t have a name for it yet.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Featured In */}
      <LogoBar />

      {/* Stats */}
      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container">
          <StatsRow />
        </div>
      </section>

      {/* CTA */}
      <section className="je-section" style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="je-container">
          <MotionReveal>
            <div className="je-cta">
              <p className="je-cta-scarcity">
                15 weddings per year &mdash; limited availability
              </p>
              <h2 className="je-heading je-heading-lg">
                Your wedding deserves our full attention.
              </h2>
              <p className="je-body" style={{ marginTop: '1.5rem' }}>
                We photograph a limited number of weddings each year so every couple
                receives the care their story deserves. If our work speaks to you,
                we&apos;d love to hear from you.
              </p>
              <div className="je-cta-buttons" style={{ marginTop: '2.5rem' }}>
                <Link href="/jorge-events/contact" className="je-btn je-btn-accent">
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
