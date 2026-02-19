'use client';

import { useMemo } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Domain } from '../data/domains';

export function MobileNav({ domains }: { domains: Domain[] }) {
  const ids = useMemo(() => domains.map((d) => d.id), [domains]);
  const active = useActiveSection(ids);

  return (
    <nav className="mobile-nav">
      {domains.map((domain) => {
        const isActive = active === domain.id;
        return (
          <button
            key={domain.id}
            className={`mobile-nav-dot${isActive ? ' active' : ''}`}
            style={{
              background: isActive ? domain.color : undefined,
            }}
            onClick={() => {
              document.getElementById(domain.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            title={domain.title}
            aria-label={`Scroll to ${domain.title}`}
          />
        );
      })}
    </nav>
  );
}
