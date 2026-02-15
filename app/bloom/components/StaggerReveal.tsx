'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export default function StaggerReveal({
  children,
  className = '',
  threshold = 0.2,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('revealed');
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`stagger-reveal ${className}`}>
      {children}
    </div>
  );
}
