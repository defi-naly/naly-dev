'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`je-sticky-cta ${visible ? 'visible' : ''}`}>
      <Link href="/jorge-events/contact">Check Availability</Link>
      <div className="je-sticky-cta-dates">2027 Season</div>
    </div>
  );
}
