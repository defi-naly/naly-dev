'use client';

import Link from 'next/link';

export default function BeetsFooter() {
  return (
    <footer className="bloom-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/beets/logo-mark.svg" alt="" width={28} height={28} />
            BEETS
          </h2>
          <p>
            The liquidity layer on Sonic. Weighted pools, boosted pools, and
            reCLAMMs — built on Balancer V3.
          </p>
        </div>
        <div className="footer-col">
          <h4>Pools</h4>
          <Link href="/beets/reclamms">reCLAMMs</Link>
          <Link href="/beets/weighted">Weighted</Link>
          <Link href="/beets/boosted">Boosted</Link>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <a
            href="https://docs.beets.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
          <a
            href="https://discord.gg/beets"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <a
            href="https://twitter.com/beethoven_x"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <div className="footer-col">
          <h4>Ecosystem</h4>
          <a
            href="https://beets.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Beets
          </a>
          <a
            href="https://balancer.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Balancer
          </a>
          <a
            href="https://soniclabs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sonic
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Beets</p>
      </div>
    </footer>
  );
}
