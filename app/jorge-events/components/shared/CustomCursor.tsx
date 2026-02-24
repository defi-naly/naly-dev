'use client';

import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'view' | 'play';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add('je-custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest<HTMLElement>('[data-cursor]');
      if (closest) {
        const val = closest.getAttribute('data-cursor') as CursorState;
        setState(val || 'hover');
      } else if (
        target.closest('a, button, [role="button"], input, textarea, select, label')
      ) {
        setState('hover');
      } else {
        setState('default');
      }
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.15);
      current.current.y = lerp(current.current.y, pos.current.y, 0.15);
      if (dot) {
        dot.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove('je-custom-cursor-active');
    };
  }, []);

  // Don't render on touch devices (SSR safe)
  return (
    <div
      ref={dotRef}
      className={`je-cursor je-cursor-${state}`}
      aria-hidden="true"
    >
      {state === 'view' && <span className="je-cursor-label">View</span>}
      {state === 'play' && <span className="je-cursor-label">Play</span>}
    </div>
  );
}
