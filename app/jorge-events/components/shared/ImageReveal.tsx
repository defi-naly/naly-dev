'use client';

import { useRef, useEffect, useState } from 'react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  aspectRatio,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'curtain-in' | 'curtain-out' | 'done'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('curtain-in');
          setTimeout(() => setPhase('curtain-out'), 400);
          setTimeout(() => setPhase('done'), 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`je-image-reveal ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Accent curtain */}
      <div className={`je-image-reveal-curtain je-image-reveal-curtain-${phase}`} />
      {/* Image underneath */}
      <div className={`je-image-reveal-inner ${phase === 'curtain-out' || phase === 'done' ? 'revealed' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
