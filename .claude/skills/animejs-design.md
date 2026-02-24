---
name: animejs-design
description: Create animated React/Next.js components using anime.js v4 as the animation engine. Use this skill when the user asks to build interactive UI components, animated landing pages, scroll-driven experiences, or any frontend work where they want anime.js animations instead of Framer Motion. Produces clean, minimal, documentation-grade designs inspired by the animejs.com aesthetic.
---

## Output Format

- React/Next.js components with `'use client'` directive and TypeScript
- Tailwind CSS for styling
- anime.js v4 for all animations via `import { animate, stagger, createTimeline, onScroll, splitText } from 'animejs'`
- Use `useRef` + `useEffect` for imperative anime.js calls; clean up with `.revert()` where applicable

## Animation Library

**anime.js v4 only.** Do NOT use Framer Motion, GSAP, or CSS `@keyframes` for primary animations.

Import from `'animejs'`:
```tsx
import { animate, stagger, createTimeline } from 'animejs';
import { onScroll } from 'animejs';
import { splitText } from 'animejs';
```

Refer to `references/animejs-v4-api.md` for the complete v4 API. Always verify function signatures, parameter names, and easing strings against that reference before writing animation code.

## Design Aesthetic

Inspired by animejs.com — clean, minimal, technically precise:

- **Layout**: Generous whitespace, centered content, clear visual hierarchy
- **Colors**: Flat palette, no heavy gradients. Dark theme (`zinc-950`/`zinc-900` backgrounds, `zinc-100`/`white` text) or light theme (`white`/`zinc-50` backgrounds, `zinc-900` text). One accent color for interactive elements
- **Typography**: Monospace for code/labels, sans-serif for body. Large headings, tight leading
- **Content as hero**: The text, data, or interactive element IS the design. No gratuitous decoration
- **Mood**: Professional, technical, confident. Think developer docs meets editorial design

## Animation Patterns

Use these anime.js patterns as building blocks:

### Page Load / Entrance
```tsx
// Staggered fade-in
animate('.item', {
  opacity: [0, 1],
  translateY: [20, 0],
  delay: stagger(80),
  duration: 800,
  ease: 'outExpo',
});
```

### Scroll-Triggered Reveals
```tsx
// Animate elements as they enter viewport
animate('.section', {
  opacity: [0, 1],
  translateY: [40, 0],
  duration: 1000,
  ease: 'outExpo',
  autoplay: onScroll({ target: '.section' }),
});
```

### Text Split Animations
```tsx
const { chars } = splitText('.heading', { chars: true });
animate(chars, {
  opacity: [0, 1],
  translateY: [20, 0],
  delay: stagger(30),
  duration: 600,
  ease: 'outExpo',
});
```

### Timeline Sequences
```tsx
const tl = createTimeline({ defaults: { duration: 600, ease: 'outExpo' } });
tl.add('.hero-title', { opacity: [0, 1], translateY: [30, 0] })
  .add('.hero-subtitle', { opacity: [0, 1], translateY: [20, 0] }, '-=400')
  .add('.hero-cta', { opacity: [0, 1], scale: [0.9, 1] }, '-=300');
```

### Hover / Interaction Feedback
```tsx
// Subtle scale on hover via onMouseEnter/onMouseLeave
animate(ref.current, { scale: 1.03, duration: 300, ease: 'outCirc' });
```

### Preferred Easings
- Entrances: `'outExpo'`, `'outCirc'`, `'outQuint'`
- Exits: `'inExpo'`, `'inCirc'`
- Symmetrical: `'inOutQuad'`, `'inOutCubic'`
- Bouncy: `'outBack'`, `'outElastic'`
- Spring: `spring({ bounce: 0.3 })`

## React Integration Pattern

```tsx
'use client';
import { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.item');

    animate(items, {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(60),
      duration: 700,
      ease: 'outExpo',
    });
  }, []);

  return (
    <div ref={containerRef}>
      {/* .item elements */}
    </div>
  );
}
```

## Anti-Patterns

- **No Framer Motion** — use anime.js for all animation
- **No heavy glassmorphism/gradients** unless explicitly requested
- **No decorative-only animation** — every animation should guide attention or communicate state
- **No anime() (v3 syntax)** — always use `animate()`, `createTimeline()`, etc.
- **No `easing:` parameter** — v4 uses `ease:` (string)
- **No `direction: 'alternate'`** — v4 uses `alternate: true`
- **No `endDelay`** — v4 uses `loopDelay`

## When Uncertain

Read `references/animejs-v4-api.md` for exact function signatures, parameter names, easing strings, and return types before writing any anime.js code.
