'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getDueCardCount, loadKnowledge } from '../lib/knowledge';

export default function MountainsNav() {
  const pathname = usePathname();
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    const state = loadKnowledge();
    setDueCount(getDueCardCount(state));
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <nav className="mt-nav">
      <Link href="/mountains" className="mt-nav-logo">
        Mountains
      </Link>
      <div className="mt-nav-links">
        <Link
          href="/mountains/review"
          className={`mt-nav-link ${isActive('/mountains/review') ? 'active' : ''}`}
          data-domain="review"
        >
          Review
          {dueCount > 0 && (
            <span className="mt-nav-badge">{dueCount}</span>
          )}
        </Link>
        <Link
          href="/mountains/learn"
          className={`mt-nav-link ${isActive('/mountains/learn') ? 'active' : ''}`}
        >
          Learn
        </Link>
        <Link
          href="/mountains/scenarios"
          className={`mt-nav-link ${isActive('/mountains/scenarios') ? 'active' : ''}`}
        >
          Scenarios
        </Link>
        <Link
          href="/mountains/field"
          className={`mt-nav-link ${isActive('/mountains/field') ? 'active' : ''}`}
        >
          Field
        </Link>
      </div>
    </nav>
  );
}
