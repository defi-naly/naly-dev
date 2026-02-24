'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import StickyCTA from '../../components/shared/StickyCTA';
import MotionReveal from '../../components/shared/MotionReveal';
import { journalPosts } from '../../data/journal';

export default function JournalPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Header />
        <section className="je-page-hero">
          <div className="je-container">
            <h1 className="je-heading je-heading-xl">Post not found</h1>
            <Link href="/jorge-events/journal" className="je-btn je-btn-ghost" style={{ marginTop: '2rem', display: 'inline-block' }}>
              Back to Journal
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Simple markdown-ish rendering: split by ## headings and paragraphs
  const blocks = post.content.split('\n\n').filter(Boolean);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="je-page-hero">
        <div className="je-container">
          <MotionReveal>
            <p className="je-caption">{post.category}</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="je-heading je-heading-xl" style={{ marginTop: '1rem', maxWidth: 800, marginInline: 'auto' }}>
              {post.title}
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="je-caption" style={{ marginTop: '1rem' }}>
              {new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section style={{ paddingTop: 0 }}>
        <div className="je-container-narrow">
          <nav className="je-breadcrumbs">
            <Link href="/jorge-events">Home</Link>
            <span>/</span>
            <Link href="/jorge-events/journal">Journal</Link>
            <span>/</span>
            <span>{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="je-section" style={{ paddingTop: 'clamp(1rem, 2vh, 2rem)' }}>
        <div className="je-container-narrow">
          {blocks.map((block, idx) => {
            if (block.startsWith('## ')) {
              return (
                <MotionReveal key={idx} delay={idx * 0.03}>
                  <h2
                    className="je-heading je-heading-md"
                    style={{ marginTop: '2.5rem', marginBottom: '1rem' }}
                  >
                    {block.replace('## ', '')}
                  </h2>
                </MotionReveal>
              );
            }
            return (
              <MotionReveal key={idx} delay={idx * 0.03}>
                <p className="je-body je-body-lg" style={{ marginBottom: '1.25rem' }}>
                  {block}
                </p>
              </MotionReveal>
            );
          })}
        </div>
      </section>

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
                <Link href="/jorge-events/journal" className="je-btn je-btn-ghost">
                  More from the Journal
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
