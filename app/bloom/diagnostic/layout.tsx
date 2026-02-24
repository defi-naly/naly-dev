import { Metadata } from 'next';
import './diagnostic.css';

export const metadata: Metadata = {
  title: 'Diagnostic | BLOOM — Find Your Missing Foundation',
  description:
    'Score your organization across 3 foundations. Find where you\'re exposed — and which sprint closes the gap. Free, ~5 minutes.',
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
