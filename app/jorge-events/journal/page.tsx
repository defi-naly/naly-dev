'use client';

import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StickyCTA from '../components/shared/StickyCTA';
import MotionReveal from '../components/shared/MotionReveal';
import { StaggerContainer, StaggerItem } from '../components/shared/StaggerContainer';
import { journalPosts } from '../data/journal';
import { portfolioImages } from '../data/images';

export default function JournalPage() {
  return (
    <>
      <Header />

      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">The Journal</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem' }}>
              Stories, Guides &amp; Behind the Lens
            </h1>
          </MotionReveal>
        </div>
      </section>

      <section className="je-section" style={{ paddingTop: 0 }}>
        <div className="je-container">
          <StaggerContainer className="je-journal-grid">
            {journalPosts.map((post, i) => (
              <StaggerItem key={post.slug}>
                <Link href={`/jorge-events/journal/${post.slug}`} className="je-journal-card">
                  <div className="je-journal-card-image">
                    <img
                      src={portfolioImages[i % portfolioImages.length]}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <p className="je-journal-card-category">{post.category}</p>
                  <h2 className="je-journal-card-title">{post.title}</h2>
                  <p className="je-journal-card-excerpt">{post.excerpt}</p>
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
