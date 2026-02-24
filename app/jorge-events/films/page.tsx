'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StickyCTA from '../components/shared/StickyCTA';
import VideoLightbox from '../components/video/VideoLightbox';
import MotionReveal from '../components/shared/MotionReveal';
import { films } from '../data/films';
import { portfolioImages } from '../data/images';

export default function FilmsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <Header />

      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">Cinematography</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Our Films
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="je-body" style={{ marginTop: '1rem' }}>
              Wedding cinematography that captures the movement, the music, and the emotion
              that photographs alone cannot.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
            {films.map((film, idx) => (
              <MotionReveal key={film.slug} delay={idx * 0.1}>
                <div className="je-video-card">
                  <div
                    className="je-video-card-poster"
                    onClick={() => setActiveVideo(film.vimeoId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveVideo(film.vimeoId)}
                  >
                    <img
                      src={portfolioImages[idx % portfolioImages.length]}
                      alt={`${film.names} wedding film`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="je-video-card-play">
                      <button className="je-film-play-btn" aria-label={`Play ${film.names} film`}>
                        <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
                          <polygon points="6,3 20,12 6,21" fill="#FAFAF8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="je-video-card-info">
                    <div className="je-video-card-names">{film.names}</div>
                    <div className="je-video-card-venue">
                      {film.venue}, {film.location}
                    </div>
                    <p className="je-body" style={{ marginTop: '0.75rem', fontSize: 'var(--je-text-sm)' }}>
                      {film.excerpt}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="je-section">
        <div className="je-container">
          <MotionReveal>
            <div className="je-cta">
              <h2 className="je-heading je-heading-lg">
                Let Us Capture Your Day in Motion
              </h2>
              <p className="je-body" style={{ marginTop: '1.5rem' }}>
                Our cinematography packages can be booked alongside photography
                or as a standalone service.
              </p>
              <div className="je-cta-buttons" style={{ marginTop: '2.5rem' }}>
                <Link href="/jorge-events/contact" className="je-btn je-btn-accent">
                  Check Availability
                </Link>
                <Link href="/jorge-events/services" className="je-btn je-btn-ghost">
                  View Packages
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <StickyCTA />

      {activeVideo && (
        <VideoLightbox
          vimeoId={activeVideo}
          open={true}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
