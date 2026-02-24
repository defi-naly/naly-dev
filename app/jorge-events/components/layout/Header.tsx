'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MobileMenu from '../navigation/MobileMenu';

const navLinks = [
  { href: '/jorge-events/about', label: 'About' },
  { href: '/jorge-events/portfolio', label: 'Portfolio' },
  { href: '/jorge-events/films', label: 'Films' },
  { href: '/jorge-events/services', label: 'Services' },
  { href: '/jorge-events/journal', label: 'Journal' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Update progress bar
      if (progressRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`je-header ${scrolled ? 'je-header-scrolled' : ''}`}>
        <div className="je-header-inner">
          <Link href="/jorge-events" className="je-logo">
            Jorge Events
          </Link>
          <nav className="je-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="je-nav-link">
                {link.label}
              </Link>
            ))}
{/* CTA removed — sticky bottom-right CTA handles this */}
          </nav>
          <button
            className="je-menu-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {/* Scroll progress line */}
        <div className="je-header-progress">
          <div ref={progressRef} className="je-header-progress-bar" />
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
