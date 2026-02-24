'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { galleryImages } from './data/images';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LogoBar from './components/social-proof/LogoBar';
import FeaturedTestimonial from './components/testimonials/FeaturedTestimonial';
import VideoLightbox from './components/video/VideoLightbox';
import StickyCTA from './components/shared/StickyCTA';
import MotionReveal from './components/shared/MotionReveal';
import SectionLabel from './components/shared/SectionLabel';
import ParallaxImage from './components/shared/ParallaxImage';
import ImageReveal from './components/shared/ImageReveal';
import { images } from './data/images';

function GalleryScroll({ images: imgs }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    el.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = '';
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="je-gallery-scroll"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Wedding photograph ${i + 1}`}
          draggable={false}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Unmute on first scroll
  useEffect(() => {
    const unmute = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.5;
        setMuted(false);
      }
    };
    window.addEventListener('scroll', unmute, { once: true, passive: true });
    return () => window.removeEventListener('scroll', unmute);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  // Parallax for film teaser
  const filmRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: filmProgress } = useScroll({
    target: filmRef,
    offset: ['start end', 'end start'],
  });
  const filmY = useTransform(filmProgress, [0, 1], ['-10px', '10px']);
  const filmScale = useTransform(filmProgress, [0, 0.5], [1.05, 1]);

  return (
    <>
      <Header />

      {/* ============ 1. HERO ============ */}
      <section className="je-hero">
        <div className="je-hero-video">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/jorge-events/photos/16-ceremony-wide.jpg"
            className="je-hero-video-el"
            src="/jorge-events/hero.mp4"
          />
        </div>
        <div className="je-hero-overlay" />
        <div className="je-hero-content">
          <MotionReveal delay={0.2} variant="clip">
            <p className="je-hero-subtitle">Documentary Wedding Storytelling</p>
          </MotionReveal>
          <MotionReveal delay={0.4} variant="split">
            <h1 className="je-hero-title">
              Jorge<br />Events
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.6}>
            <p className="je-hero-credential">
              National Geographic Grand Prize Winner &nbsp;|&nbsp; Vogue Published
            </p>
          </MotionReveal>
          <MotionReveal delay={0.8}>
            <Link href="/jorge-events/contact" className="je-btn je-btn-ghost je-btn-ghost-hero" style={{ marginTop: '2rem' }}>
              Check Availability
            </Link>
          </MotionReveal>
        </div>
        {/* Sound toggle */}
        <button
          className="je-hero-sound-toggle"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </section>

      {/* ============ 2. CREDENTIAL BAR ============ */}
      <LogoBar />

      {/* ============ 3. FEATURED STORY ============ */}
      <section className="je-section">
        <div className="je-container">
          <div className="je-featured-story">
            <div className="je-featured-story-image" data-cursor="view">
              <img
                src={images.coupleEmbrace}
                alt="Couple in an emotional embrace on their wedding day"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <MotionReveal delay={0.2}>
                <p className="je-featured-story-quote">
                  &ldquo;We didn&apos;t expect to cry looking at photographs. But there
                  we were &mdash; sitting on the kitchen floor at midnight, holding each
                  other, living the whole day again.&rdquo;
                </p>
                <p className="je-featured-story-attribution">
                  Sophie &amp; James &mdash; Aynhoe Park, Summer 2024
                </p>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. PORTFOLIO — GALLERY SCROLL ============ */}
      <section className="je-section" style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="je-container">
          <MotionReveal variant="clip">
            <SectionLabel text="Selected Work" />
          </MotionReveal>
          <MotionReveal delay={0.1} variant="split">
            <h2 className="je-heading je-heading-lg" style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              Recent Weddings
            </h2>
          </MotionReveal>
        </div>

        <GalleryScroll images={galleryImages} />

        <div className="je-container">
          <MotionReveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vh, 3rem)' }}>
              <Link href="/jorge-events/portfolio" className="je-view-all-link">
                View All Weddings
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* ============ 5. CINEMATOGRAPHY TEASER ============ */}
      <section className="je-section" style={{ padding: 0 }}>
        <div
          ref={filmRef}
          className="je-film-teaser"
          onClick={() => setVideoOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setVideoOpen(true)}
          data-cursor="play"
        >
          <motion.div className="je-film-teaser-bg" style={{ y: filmY, scale: filmScale }}>
            <img src={images.moment} alt="Wedding film still" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
          <div className="je-film-teaser-overlay" />
          <div className="je-film-play">
            <button className="je-film-play-btn" aria-label="Play film">
              <svg viewBox="0 0 24 24">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </button>
            <span className="je-film-play-label">Watch Our Latest Film</span>
            <span className="je-film-play-detail">Sophie &amp; James &mdash; Aynhoe Park</span>
          </div>
        </div>
        <VideoLightbox
          vimeoId="000000000"
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
        />
      </section>

      {/* ============ 6. PHILOSOPHY ============ */}
      <section className="je-section">
        <div className="je-container">
          <div className="je-philosophy">
            <div className="je-philosophy-text">
              <MotionReveal variant="clip">
                <SectionLabel text="Our Approach" />
              </MotionReveal>
              <MotionReveal delay={0.1} variant="split">
                <h2 className="je-heading je-heading-lg">
                  Brother and sister.<br />Twenty-seven years of<br />seeing together.
                </h2>
              </MotionReveal>
              <MotionReveal delay={0.2}>
                <p className="je-body" style={{ marginTop: '1.5rem' }}>
                  Before they were photographers, Jojo and George were the kids who noticed the
                  same things &mdash; the way light hit a doorframe, the look on their
                  grandmother&apos;s face before she laughed. They&apos;ve spent their whole lives
                  watching the world through the same window, just from different angles.
                </p>
              </MotionReveal>
              <MotionReveal delay={0.3}>
                <p className="je-body">
                  That&apos;s why they photograph weddings. Not for the portraits or the
                  details &mdash; but because a wedding is a family witnessing someone
                  they love step into a new life. And witnessing the people they love?
                  They&apos;ve been doing that their whole lives.
                </p>
              </MotionReveal>
              <MotionReveal delay={0.4}>
                <Link href="/jorge-events/about" className="je-btn je-btn-ghost" style={{ marginTop: '2rem', display: 'inline-block' }}>
                  Our Story
                </Link>
              </MotionReveal>
            </div>
            <div className="je-philosophy-image" data-cursor="view">
              <ParallaxImage
                src={images.aboutPortrait}
                alt="Jojo and George — Jorge Events"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. TESTIMONIALS ============ */}
      <section className="je-section">
        <div className="je-container">
          <MotionReveal variant="clip">
            <SectionLabel text="Kind Words" />
          </MotionReveal>
          <FeaturedTestimonial />
        </div>
      </section>

      {/* ============ 8. CTA ============ */}
      <section className="je-section" style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="je-container">
          <MotionReveal>
            <div className="je-cta">
              <h2 className="je-heading je-heading-lg">
                Your love story is worth telling well.
              </h2>
              <p className="je-body" style={{ marginTop: '1.5rem' }}>
                The way you look at each other when you think nobody&apos;s watching. The
                tears your father tries to hide. The laugh that only your best friend
                understands. These moments deserve someone who knows how to hold them.
              </p>
              <p className="je-cta-scarcity" style={{ marginTop: '1.5rem' }}>
                We photograph 15 weddings per year &mdash; only a handful of dates remain for 2027
              </p>
              <div className="je-cta-buttons" style={{ marginTop: '2.5rem' }}>
                <Link href="/jorge-events/contact" className="je-btn je-btn-accent">
                  Check Availability for 2027
                </Link>
                <Link href="/jorge-events/services" className="je-btn je-btn-ghost">
                  View Services &amp; Pricing
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* ============ 9. FOOTER ============ */}
      <Footer />

      {/* Sticky CTA */}
      <StickyCTA />
    </>
  );
}
