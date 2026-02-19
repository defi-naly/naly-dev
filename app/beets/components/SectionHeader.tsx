'use client';

import MotionReveal from './MotionReveal';

interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <MotionReveal>
      <div className="section-header">
        <span className="section-tag">{number}</span>
        <h2 className="section-title">{title}</h2>
      </div>
    </MotionReveal>
  );
}
