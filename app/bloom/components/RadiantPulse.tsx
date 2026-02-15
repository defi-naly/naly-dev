'use client';

import { useEffect, useRef, useState } from 'react';

interface PulseRing {
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  strokeWidth: number;
}

interface AccentColor {
  r: number;
  g: number;
  b: number;
}

const getAccentColor = (): AccentColor => {
  const rgb = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-rgb')
    .trim();
  if (rgb) {
    const [r, g, b] = rgb.split(',').map((n) => parseInt(n.trim(), 10));
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b };
    }
  }
  // Fallback to dark mode default
  return { r: 212, g: 168, b: 85 };
};

export default function RadiantPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<PulseRing[]>([]);
  const animationRef = useRef<number>(0);
  const accentColorRef = useRef<AccentColor>({ r: 212, g: 168, b: 85 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize accent color from CSS
    accentColorRef.current = getAccentColor();

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          accentColorRef.current = getAccentColor();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const CENTER_OFFSET_X = 0.75; // Position pulse at 75% from left
    const CENTER_OFFSET_Y = 0.3;  // Position pulse at 30% from top

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createRing = (delay: number = 0): PulseRing => ({
      radius: delay,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.8,
      opacity: 0.6,
      speed: 0.3 + Math.random() * 0.2,
      strokeWidth: 1 + Math.random() * 0.5,
    });

    const initializeRings = () => {
      ringsRef.current = [];
      // Create staggered rings
      for (let i = 0; i < 5; i++) {
        ringsRef.current.push(createRing(i * 120));
      }
    };

    const drawRing = (ring: PulseRing, centerX: number, centerY: number) => {
      if (!ctx || ring.radius <= 0) return;

      const color = accentColorRef.current;
      const fadeStart = ring.maxRadius * 0.3;
      const opacity = ring.radius > fadeStart
        ? ring.opacity * (1 - (ring.radius - fadeStart) / (ring.maxRadius - fadeStart))
        : ring.opacity * Math.min(1, ring.radius / 50);

      if (opacity <= 0.01) return;

      ctx.beginPath();
      ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.15})`;
      ctx.lineWidth = ring.strokeWidth;
      ctx.stroke();

      // Inner glow ring
      if (ring.radius > 20) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.08})`;
        ctx.lineWidth = ring.strokeWidth * 3;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const centerX = window.innerWidth * CENTER_OFFSET_X;
      const centerY = window.innerHeight * CENTER_OFFSET_Y;
      const color = accentColorRef.current;

      // Draw static concentric circles (always visible)
      for (let i = 1; i <= 8; i++) {
        const radius = i * 80;
        const opacity = 0.03 - (i * 0.003);
        if (opacity > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw and update animated rings
      if (!prefersReducedMotion) {
        for (const ring of ringsRef.current) {
          drawRing(ring, centerX, centerY);
          ring.radius += ring.speed;

          // Reset ring when it reaches max
          if (ring.radius > ring.maxRadius) {
            ring.radius = 0;
            ring.speed = 0.3 + Math.random() * 0.2;
            ring.strokeWidth = 1 + Math.random() * 0.5;
          }
        }
      }

      // Draw center point
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializeRings();
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      initializeRings();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="radiant-pulse-canvas"
      aria-hidden="true"
    />
  );
}
