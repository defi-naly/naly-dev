'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import StickyCTA from '../../components/shared/StickyCTA';
import MotionReveal from '../../components/shared/MotionReveal';
import { galleries } from '../../data/galleries';
import { portfolioImages } from '../../data/images';

export default function GalleryStoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const gallery = galleries.find((g) => g.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!gallery) {
    return (
      <>
        <Header />
        <section className="je-page-hero">
          <div className="je-container">
            <h1 className="je-heading je-heading-xl">Gallery not found</h1>
            <Link href="/jorge-events/portfolio" className="je-btn je-btn-ghost" style={{ marginTop: '2rem', display: 'inline-block' }}>
              Back to Portfolio
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Story Hero */}
      <section className="je-gallery-story-hero">
        <img
          src={portfolioImages[galleries.indexOf(gallery) % portfolioImages.length]}
          alt={`${gallery.names} wedding at ${gallery.venue}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="je-gallery-story-hero-overlay">
          <div className="je-container">
            <MotionReveal>
              <h1 className="je-gallery-story-names">{gallery.names}</h1>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <p className="je-gallery-story-venue">
                {gallery.venue} &middot; {gallery.location}
              </p>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section style={{ paddingTop: '1rem' }}>
        <div className="je-container">
          <nav className="je-breadcrumbs">
            <Link href="/jorge-events">Home</Link>
            <span>/</span>
            <Link href="/jorge-events/portfolio">Portfolio</Link>
            <span>/</span>
            <span>{gallery.names}</span>
          </nav>
        </div>
      </section>

      {/* Story Text */}
      <section className="je-section" style={{ paddingTop: 'clamp(2rem, 4vh, 3rem)' }}>
        <div className="je-gallery-story-body je-container-narrow">
          <MotionReveal>
            <p className="je-body je-body-lg">{gallery.excerpt}</p>
          </MotionReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container">
          <div className="je-gallery-masonry">
            {gallery.images.map((_, idx) => (
              <div
                key={idx}
                className={idx % 5 === 0 ? 'je-gallery-masonry-full' : ''}
                onClick={() => setLightboxIndex(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={portfolioImages[idx % portfolioImages.length]}
                  alt={`${gallery.names} wedding photo ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: idx % 5 === 0 ? undefined : undefined,
                    aspectRatio: idx % 5 === 0 ? '2 / 1' : '3 / 4',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {gallery.testimonial && (
        <section className="je-section">
          <div className="je-container-narrow">
            <MotionReveal>
              <div className="je-testimonial-featured">
                <p className="je-testimonial-quote">
                  &ldquo;{gallery.testimonial.quote}&rdquo;
                </p>
                <p className="je-testimonial-attribution">
                  <span className="je-testimonial-name">
                    {gallery.testimonial.attribution}
                  </span>
                </p>
              </div>
            </MotionReveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="je-section">
        <div className="je-container">
          <MotionReveal>
            <div className="je-cta">
              <h2 className="je-heading je-heading-lg">
                Let Us Tell Your Story
              </h2>
              <div className="je-cta-buttons" style={{ marginTop: '2rem' }}>
                <Link href="/jorge-events/contact" className="je-btn je-btn-accent">
                  Get in Touch
                </Link>
                <Link href="/jorge-events/portfolio" className="je-btn je-btn-ghost">
                  More Weddings
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <StickyCTA />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="je-lightbox" onClick={() => setLightboxIndex(null)}>
          <button
            className="je-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          {lightboxIndex > 0 && (
            <button
              className="je-lightbox-nav je-lightbox-prev"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15,4 7,12 15,20" />
              </svg>
            </button>
          )}
          {lightboxIndex < gallery.images.length - 1 && (
            <button
              className="je-lightbox-nav je-lightbox-next"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9,4 17,12 9,20" />
              </svg>
            </button>
          )}
          <img
            src={portfolioImages[lightboxIndex % portfolioImages.length]}
            alt={`${gallery.names} wedding photo ${lightboxIndex + 1}`}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
