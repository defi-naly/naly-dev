'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className={`je-mobile-menu ${open ? 'open' : ''}`}>
      <button
        className="je-mobile-menu-close"
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </button>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="je-mobile-menu-link"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/jorge-events/contact"
        className="je-btn je-btn-dark"
        onClick={onClose}
        style={{ marginTop: '1rem' }}
      >
        Check Availability
      </Link>
    </div>
  );
}
