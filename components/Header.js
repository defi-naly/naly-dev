'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import TerminalNav from './TerminalNav';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
  { label: 'Learn', href: '/learn' },
  { label: 'Writing', href: '/writing' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg/80 backdrop-blur-sm border-b border-neutral-800">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Terminal Navigation */}
          <TerminalNav />

          {/* Navigation */}
          <ul className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative px-3 py-2 text-sm transition-colors"
                  >
                    <span className={isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-px bg-terminal-accent"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* LIVE indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
