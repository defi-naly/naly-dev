'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface MiniDashboardWrapperProps {
  title?: string;
  children: React.ReactNode;
  showContinue?: boolean;
  onContinue?: () => void;
  exploreLink?: string;
  exploreLinkText?: string;
}

export default function MiniDashboardWrapper({
  title,
  children,
  showContinue = false,
  onContinue,
  exploreLink,
  exploreLinkText = 'Explore Full Tool',
}: MiniDashboardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      {/* Optional Title */}
      {title && (
        <div className="mb-4">
          <h3 className="text-neutral-500 font-mono text-xs uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Bottom Actions */}
      {(showContinue || exploreLink) && (
        <div className="h-16 flex items-center justify-center gap-4">
          {exploreLink && (
            <Link
              href={exploreLink}
              target="_blank"
              className="flex items-center gap-2 text-neutral-500 hover:text-amber-500 font-mono text-xs transition-colors"
            >
              {exploreLinkText}
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
