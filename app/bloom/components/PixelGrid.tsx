'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Pixel {
  x: number;
  y: number;
  opacity: number;
  targetOpacity: number;
  fadeSpeed: number;
  cycleTimer: number;
  cycleDuration: number;
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

export default function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const accentColorRef = useRef<AccentColor>({ r: 212, g: 168, b: 85 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const GRID_COLS = 12;
    const GRID_ROWS = 10;
    const PIXEL_SIZE = 3;
    const PIXEL_GAP = 60;
    const GLOW_SIZE = 8;

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

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const initializePixels = () => {
      pixelsRef.current = [];

      // Calculate grid offset to center it
      const totalWidth = (GRID_COLS - 1) * PIXEL_GAP;
      const totalHeight = (GRID_ROWS - 1) * PIXEL_GAP;
      const offsetX = (window.innerWidth - totalWidth) / 2;
      const offsetY = (window.innerHeight - totalHeight) / 2;

      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const x = offsetX + col * PIXEL_GAP;
          const y = offsetY + row * PIXEL_GAP;

          // Random initial state
          const initialOpacity = prefersReducedMotion ? 0.3 : Math.random() * 0.4;
          const cycleDuration = 2000 + Math.random() * 4000; // 2-6 seconds

          pixelsRef.current.push({
            x,
            y,
            opacity: initialOpacity,
            targetOpacity: prefersReducedMotion ? 0.3 : Math.random() > 0.5 ? 0.6 : 0.1,
            fadeSpeed: 0.01 + Math.random() * 0.02,
            cycleTimer: Math.random() * cycleDuration,
            cycleDuration,
          });
        }
      }
    };

    const drawPixel = (pixel: Pixel) => {
      if (!ctx) return;

      const color = accentColorRef.current;

      // Draw glow
      const gradient = ctx.createRadialGradient(
        pixel.x, pixel.y, 0,
        pixel.x, pixel.y, GLOW_SIZE
      );
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${pixel.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, GLOW_SIZE, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw core pixel
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, PIXEL_SIZE, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${pixel.opacity})`;
      ctx.fill();
    };

    const updatePixel = (pixel: Pixel, deltaTime: number) => {
      if (prefersReducedMotion) return;

      // Update cycle timer
      pixel.cycleTimer += deltaTime;

      // Check if it's time to pick a new target
      if (pixel.cycleTimer >= pixel.cycleDuration) {
        pixel.cycleTimer = 0;
        pixel.cycleDuration = 2000 + Math.random() * 4000;
        pixel.targetOpacity = Math.random() > 0.5 ? 0.5 + Math.random() * 0.3 : 0.05 + Math.random() * 0.15;
      }

      // Smoothly interpolate to target opacity
      const diff = pixel.targetOpacity - pixel.opacity;
      pixel.opacity += diff * pixel.fadeSpeed;
    };

    let lastTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = lastTime ? currentTime - lastTime : 16;
      lastTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw all pixels
      for (const pixel of pixelsRef.current) {
        updatePixel(pixel, deltaTime);
        drawPixel(pixel);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializePixels();

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initializePixels();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pixel-grid-canvas"
      aria-hidden="true"
    />
  );
}
