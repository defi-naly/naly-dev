'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, PenLine, Image, Calendar, Clock } from 'lucide-react';

const NAV = [
  { label: 'Dashboard', href: '/hub', icon: LayoutDashboard },
  { label: 'New Post', href: '/hub/editor', icon: PenLine },
  { label: 'Media', href: '/hub/media', icon: Image },
  { label: 'Queue', href: '/hub/queue', icon: Clock },
  { label: 'Calendar', href: '/hub/calendar', icon: Calendar },
];

export default function HubSidebar() {
  const path = usePathname();

  const isActive = (href: string) =>
    href === '/hub' ? path === '/hub' : path.startsWith(href);

  return (
    <aside className="hub-sidebar">
      <div className="px-4 py-4 border-b border-[var(--hub-border)]">
        <Link href="/hub" className="flex items-center gap-2 no-underline">
          <span className="text-[15px] font-semibold tracking-tight text-[var(--hub-text)]">
            Hub
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`hub-nav-item ${active ? 'active' : ''}`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-[var(--hub-radius)] bg-[var(--hub-surface)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <Icon size={16} strokeWidth={1.75} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
