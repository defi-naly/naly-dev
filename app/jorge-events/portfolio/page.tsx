'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StickyCTA from '../components/shared/StickyCTA';
import MotionReveal from '../components/shared/MotionReveal';
import { StaggerContainer, StaggerItem } from '../components/shared/StaggerContainer';
import { galleries, GalleryCategory } from '../data/galleries';
import { portfolioImages } from '../data/images';

type FilterOption = 'all' | GalleryCategory;

const filters: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Weddings', value: 'wedding' },
  { label: 'Editorial', value: 'editorial' },
  { label: 'Events', value: 'event' },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filtered = activeFilter === 'all'
    ? galleries
    : galleries.filter((g) => g.category === activeFilter);

  return (
    <>
      <Header />

      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">Portfolio</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Our Work
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="je-body" style={{ marginTop: '1rem' }}>
              Every wedding is a story. Here are some of the ones we have been honoured to tell.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container">
          {/* Filter Bar */}
          <MotionReveal>
            <div className="je-filter-bar">
              {filters.map((f) => (
                <button
                  key={f.value}
                  className={`je-filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </MotionReveal>

          {/* Gallery Grid */}
          <StaggerContainer className="je-portfolio-grid" key={activeFilter}>
            {filtered.map((gallery, i) => (
              <StaggerItem key={gallery.slug}>
                <Link href={`/jorge-events/portfolio/${gallery.slug}`} className="je-portfolio-card">
                  <div className="je-portfolio-card-image">
                    <img
                      src={portfolioImages[i % portfolioImages.length]}
                      alt={`${gallery.names} at ${gallery.venue}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="je-portfolio-card-info">
                    <div className="je-portfolio-card-names">{gallery.names}</div>
                    <div className="je-portfolio-card-venue">
                      {gallery.venue}, {gallery.location}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </>
  );
}
