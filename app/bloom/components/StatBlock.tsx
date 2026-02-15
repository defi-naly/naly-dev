'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import MotionReveal from './MotionReveal';

interface StatBlockProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export default function StatBlock({ value, prefix = '', suffix = '', label, delay = 0 }: StatBlockProps) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || counted.current) return;
    counted.current = true;

    const duration = 2000;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      let eased: number;
      if (progress < 0.8) {
        eased = easeOutQuart(progress / 0.8) * 1.1;
      } else {
        const settle = (progress - 0.8) / 0.2;
        eased = 1.1 - 0.1 * settle;
      }

      const current = Math.min(Math.floor(value * eased), value);
      setDisplay(String(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(String(value));
      }
    };

    setTimeout(animate, delay);
  }, [isInView, value, delay]);

  return (
    <MotionReveal delay={delay / 1000}>
      <div ref={ref} className="stat-block">
        <div className="stat-value">
          {prefix}{display}{suffix}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </MotionReveal>
  );
}
