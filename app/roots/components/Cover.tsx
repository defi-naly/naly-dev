'use client';

import { useMemo } from 'react';

const TITLE_CHARS = ['n', 'a', 'l', 'y', '.', 'd', 'e', 'v'];
const THESIS_TEXT = 'the systems that matter are the ones nobody controls';
const THESIS_CHARS = THESIS_TEXT.split('');
const SUB_TEXT = 'I trace the patterns between them';
const SUB_CHARS = SUB_TEXT.split('');

// Dissolve timing (global progress ranges)
const TITLE_START = 0.02;
const TITLE_END = 0.065;
const THESIS_START = 0.04;
const THESIS_END = 0.11;
const SUB_START = 0.06;
const SUB_END = 0.12;
const CHAR_DISSOLVE_SPAN = 0.025;

// Particles per character
const TITLE_PARTICLES = 4;
const SUB_PARTICLES = 3;

/** Deterministic pseudo-random from two indices */
function seededRandom(a: number, b: number): number {
  return ((Math.sin(a * 127.1 + b * 311.7) * 43758.5453) % 1 + 1) % 1;
}

interface Particle {
  dx: number;
  dy: number;
  size: number;
  delay: number;
}

function generateParticles(charIndex: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const r1 = seededRandom(charIndex, i);
    const r2 = seededRandom(charIndex + 100, i);
    const r3 = seededRandom(charIndex, i + 200);
    const r4 = seededRandom(charIndex + 300, i + 50);
    particles.push({
      dx: (r1 - 0.5) * 80,
      dy: -(20 + r2 * 60),
      size: 1.5 + r3 * 1.5,
      delay: r4 * 0.3,
    });
  }
  return particles;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function charDissolve(
  progress: number,
  charIndex: number,
  charCount: number,
  rangeStart: number,
  rangeEnd: number,
): number {
  const staggerSpan = rangeEnd - rangeStart - CHAR_DISSOLVE_SPAN;
  const charStart = rangeStart + (charIndex / Math.max(charCount - 1, 1)) * staggerSpan;
  const charEnd = charStart + CHAR_DISSOLVE_SPAN;
  return clamp((progress - charStart) / (charEnd - charStart), 0, 1);
}

function particleOpacity(dissolve: number, delay: number): number {
  const adjusted = clamp((dissolve - delay) / (1 - delay), 0, 1);
  if (adjusted < 0.3) return adjusted / 0.3;
  if (adjusted < 0.6) return 1;
  return 1 - (adjusted - 0.6) / 0.4;
}

interface CoverProps {
  progress: number;
}

export function Cover({ progress }: CoverProps) {
  const titleParticles = useMemo(
    () => TITLE_CHARS.map((_, i) => generateParticles(i, TITLE_PARTICLES)),
    [],
  );
  const thesisParticles = useMemo(
    () => THESIS_CHARS.map((_, i) => generateParticles(i + 50, SUB_PARTICLES)),
    [],
  );
  const subParticles = useMemo(
    () => SUB_CHARS.map((_, i) => generateParticles(i + 150, SUB_PARTICLES)),
    [],
  );

  const scrollStarted = progress > 0.01;
  const fullyDissolved = progress > 0.14;

  return (
    <section className="cover">
      <div className="cover-text" style={fullyDissolved ? { visibility: 'hidden' } : undefined}>
        <h1 className="cover-name">
          {TITLE_CHARS.map((char, i) => {
            const dissolve = charDissolve(progress, i, TITLE_CHARS.length, TITLE_START, TITLE_END);
            const wrapOpacity = 1 - dissolve;

            return (
              <span key={i} className="cover-char-wrap" style={{ opacity: wrapOpacity }}>
                <span
                  className="cover-char"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    ...(scrollStarted ? { animation: 'none', opacity: 1, transform: 'none' } : {}),
                  }}
                >
                  {char}
                </span>
                {dissolve > 0 && titleParticles[i].map((p, pi) => {
                  const pOpacity = particleOpacity(dissolve, p.delay);
                  const travel = clamp((dissolve - p.delay) / (1 - p.delay), 0, 1);
                  return (
                    <span
                      key={pi}
                      className="cover-particle"
                      style={{
                        width: p.size,
                        height: p.size,
                        opacity: pOpacity,
                        transform: `translate(${p.dx * travel}px, ${p.dy * travel}px)`,
                      }}
                    />
                  );
                })}
              </span>
            );
          })}
        </h1>
        <p className="cover-thesis">
          {THESIS_CHARS.map((char, i) => {
            const dissolve = charDissolve(progress, i, THESIS_CHARS.length, THESIS_START, THESIS_END);
            const wrapOpacity = 1 - dissolve;

            return (
              <span key={i} className="cover-char-wrap" style={{ opacity: wrapOpacity }}>
                <span
                  className="cover-char-sub"
                  style={scrollStarted ? { animation: 'none', opacity: 1, transform: 'none' } : {}}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
                {dissolve > 0 && thesisParticles[i].map((p, pi) => {
                  const pOpacity = particleOpacity(dissolve, p.delay);
                  const travel = clamp((dissolve - p.delay) / (1 - p.delay), 0, 1);
                  return (
                    <span
                      key={pi}
                      className="cover-particle"
                      style={{
                        width: p.size,
                        height: p.size,
                        opacity: pOpacity,
                        transform: `translate(${p.dx * travel}px, ${p.dy * travel}px)`,
                      }}
                    />
                  );
                })}
              </span>
            );
          })}
        </p>
        <p className="cover-line">
          {SUB_CHARS.map((char, i) => {
            const dissolve = charDissolve(progress, i, SUB_CHARS.length, SUB_START, SUB_END);
            const wrapOpacity = 1 - dissolve;

            return (
              <span key={i} className="cover-char-wrap" style={{ opacity: wrapOpacity }}>
                <span
                  className="cover-char-sub"
                  style={scrollStarted ? { animation: 'none', opacity: 1, transform: 'none' } : {}}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
                {dissolve > 0 && subParticles[i].map((p, pi) => {
                  const pOpacity = particleOpacity(dissolve, p.delay);
                  const travel = clamp((dissolve - p.delay) / (1 - p.delay), 0, 1);
                  return (
                    <span
                      key={pi}
                      className="cover-particle"
                      style={{
                        width: p.size,
                        height: p.size,
                        opacity: pOpacity,
                        transform: `translate(${p.dx * travel}px, ${p.dy * travel}px)`,
                      }}
                    />
                  );
                })}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
