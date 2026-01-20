'use client';

import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="6" x2="12" y2="18" />
    </svg>
  );
}

export function VaultIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <line x1="7" y1="6" x2="7" y2="3" />
      <line x1="17" y1="6" x2="17" y2="3" />
      <circle cx="12" cy="13" r="3" />
      <line x1="12" y1="11" x2="12" y2="15" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

export function PrinterIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <rect x="4" y="8" width="16" height="10" rx="1" />
      <path d="M8 8V4h8v4" />
      <path d="M8 14h8v6H8z" />
      <circle cx="16" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

export function ChartUpIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <polyline points="4,18 10,12 14,16 20,6" />
      <polyline points="16,6 20,6 20,10" />
    </svg>
  );
}

export function HouseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <rect x="9" y="14" width="6" height="6" />
    </svg>
  );
}

export function DollarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <rect x="4" y="5" width="16" height="14" rx="1" />
      <path d="M12 9v6" />
      <path d="M9.5 10.5c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <path d="M6 6h15l-1.5 9H7.5L6 6z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export function BarChartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <line x1="4" y1="20" x2="4" y2="14" />
      <line x1="9" y1="20" x2="9" y2="8" />
      <line x1="14" y1="20" x2="14" y2="11" />
      <line x1="19" y1="20" x2="19" y2="4" />
    </svg>
  );
}

export function BitcoinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8h4c1.1 0 2 .9 2 2s-.9 2-2 2H9" />
      <path d="M9 12h4.5c1.1 0 2 .9 2 2s-.9 2-2 2H9" />
      <line x1="9" y1="8" x2="9" y2="16" />
      <line x1="10.5" y1="6" x2="10.5" y2="8" />
      <line x1="13.5" y1="6" x2="13.5" y2="8" />
      <line x1="10.5" y1="16" x2="10.5" y2="18" />
      <line x1="13.5" y1="16" x2="13.5" y2="18" />
    </svg>
  );
}

export function GoldBarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <path d="M5 17h14l2-6H3l2 6z" />
      <path d="M7 11l2-6h6l2 6" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16" cy="14" r="1.5" />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
    >
      <path d="M8 4h8v8a4 4 0 0 1-8 0V4z" />
      <path d="M8 8H5a2 2 0 0 1 0-4h3" />
      <path d="M16 8h3a2 2 0 0 0 0-4h-3" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
    </svg>
  );
}
