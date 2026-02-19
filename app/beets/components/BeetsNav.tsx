'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface BeetsNavProps {
  activePool?: 'reclamms' | 'weighted' | 'boosted';
}

export default function BeetsNav({ activePool }: BeetsNavProps) {
  return (
    <nav className="bloom-nav">
      <Link href="/beets" className="bloom-nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src="/beets/logo-mark.svg" alt="" width={28} height={28} />
        BEETS
      </Link>
      <div className="bloom-nav-links">
        <Link
          href="/beets/reclamms"
          className={`bloom-nav-link${activePool === 'reclamms' ? ' active' : ''}`}
        >
          reCLAMMs
        </Link>
        <Link
          href="/beets/weighted"
          className={`bloom-nav-link${activePool === 'weighted' ? ' active' : ''}`}
        >
          Weighted
        </Link>
        <Link
          href="/beets/boosted"
          className={`bloom-nav-link${activePool === 'boosted' ? ' active' : ''}`}
        >
          Boosted
        </Link>
        <a
          href="https://beets.fi"
          target="_blank"
          rel="noopener noreferrer"
          className="bloom-nav-cta"
        >
          Launch App <ArrowUpRight size={12} strokeWidth={2} />
        </a>
      </div>
    </nav>
  );
}
