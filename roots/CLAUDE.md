# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Vite dev server (hot reload)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Serve production build locally
```

## What This Is

A scroll-driven interactive portfolio — three chapters (DeFi & Privacy, Paragliding, Sovereignty & Systems) connected by a thesis that they're the same pattern seen from different angles. Each chapter has a full-screen Three.js visualization that animates in response to scroll position, followed by prose content.

## Architecture

### Scroll → Progress → Machine

The core pattern: each chapter is a `<section>` with generous scroll height. Inside is a `sticky` container holding a Three.js `<Canvas>`. `useScrollProgress` maps the section's scroll position to a `progress` float (0–1). That progress value is the **single prop** driving all Machine animation.

```
Section → useScrollProgress → progress (0..1) → Machine component → Three.js animation
```

Machines don't use `@react-three/drei` controls or cameras — they receive `progress` and animate everything imperatively inside `useFrame`. The Canvas `frameloop` is set to `'never'` when out of viewport via `useInView` for performance.

### Component Tree

```
App
├── GrainOverlay          (SVG feTurbulence filter, fixed)
├── SideNav / MobileNav   (dot navigation)
├── Cover                 (hero: TorusKnotScene + animated "naly" text)
├── Chapter × 3           (defi, paragliding, sovereignty)
│   └── sticky div (100vh)
│       ├── Canvas → Machine
│       ├── AnnotationOverlay
│       ├── ChapterProse
│       └── ChapterExtras
└── Footer
```

### Machines (`src/components/machines/`)

Each Machine is a self-contained Three.js scene driven by a single `progress` prop. They tell a narrative arc through scroll.

- **DefiMachine** — "One becomes many." A single genesis node fades in, gets wrapped in a privacy shell, then shrinks to join a growing peer network. Every node gets its own shielding. Mesh edges connect neighbors into a breathing organic network, then dissolve. The key idea: genesis doesn't stay special — it joins as an equal peer. Double-shielding (inner + outer wireframe shells) on every node. The network should feel alive — noise-driven drift, breathing.

- **ParaglidingMachine** — Invisible forces made visible. Terrain with a thermal bowl, converging surface air, a rising thermal column, and a glider reading the system. Nature as data visualization: streamlines show convergence at the base and rising air in the core. The glider orbits and climbs, banking into the turn. Each element reveals in sequence to build understanding.

- **SovereigntyMachine** — Star-to-mesh morph. A hub-and-spoke network transforms into a distributed mesh. The membrane IS the hub — not a separate node. Star topology shows centralized fragility (hub tension, single point of failure). The morph to mesh topology demonstrates distributed resilience. Random node failures show the network routing around damage. The membrane fades as authority distributes.

All machines use `smoothstep` for phase transitions and seeded random for deterministic positions across renders.

### Annotation System

`AnnotationOverlay` renders HTML labels over the Canvas via absolute `%` coordinates. Each annotation has a progress range — it fades in/out as scroll enters/exits that window. Annotations are defined in `App.tsx`'s `annotationMap`, not inside the Machines. They're sparse labels, not explanations.

### Content Layer

Below each sticky visualization, `ChapterProse` renders prose from `domains.ts`. Paragraphs reveal on scroll via `IntersectionObserver`. `ChapterExtras` renders projects and cross-domain "root" links.

### Domain Data (`src/data/domains.ts`)

All content is data-driven. `Domain` objects define: id, number, title, subtitle, color, body paragraphs, aside quote, projects list, and root links. `Connection` objects define the thesis linking each domain pair.

## Hooks & Utilities

- `useScrollProgress(ref)` → `number` (0–1) from section scroll position
- `useInView(ref, threshold?)` → `boolean` via IntersectionObserver
- `useReducedMotion()` → `boolean` from `prefers-reduced-motion` media query
- `useActiveSection(ids)` → `string | null` — id of first visible section
- `noise.ts` → `createNoise2D`, `createNoise3D`, `fbm` (simplex noise + fractal Brownian motion)

## Design System

Light mode, warm paper background (`#f2efe8`), dark ink text (`#1a1916`). JetBrains Mono only (weights 200–500). No Tailwind — plain CSS with custom properties. Domain accent colors: green (defi), blue (paragliding), purple (sovereignty).

Three.js visuals use ink color at low opacity for a pencil-sketch aesthetic — wireframe edges, not filled meshes. Film grain overlay via SVG `<feTurbulence>`.

## Design Principles

- **Wireframes over solids.** Sketch aesthetic, not 3D product viz. Low-opacity wireframe edges evoke pencil on paper.
- **Single `progress` prop.** Scroll is the only input. Everything in a Machine is derived from one 0–1 float. No internal state, no timers, no interaction handlers.
- **Organic motion.** Noise-driven drift, breathing, gentle oscillation. Nothing should ever be static — even "idle" states have subtle life.
- **Narrative arc.** Each machine tells a story with beginning, middle, end. Not a demo of a thing — a transformation that unfolds.
- **Sparse annotations.** Labels, not explanations. The visualization should communicate; annotations name what you're seeing.
- **Show, don't tell.** The prose lives below the visualization, not on top of it. The 3D scene earns attention first.

## Key Patterns

- **No animation library** — CSS `@keyframes` for cover, CSS transitions for reveals, Three.js `useFrame` for machines. No Framer Motion.
- **No state management** — scroll position is the only "state" that matters, derived from DOM measurements.
- **`prefers-reduced-motion`** — CSS disables animations; `useReducedMotion` hook available for JS-level checks.
- **Simplex noise** — seeded 2D/3D noise + FBM for terrain generation and organic drift.
- **Performance** — Canvas `frameloop="never"` when off-screen, `dpr={[1, 2]}` for retina, instanced meshes for repeated geometry.

## Available Skills (`.claude/skills/`)

- **`canvas-design`** — Create static visual art (.png/.pdf) from design philosophies.
- **`animejs-design`** — Create animated React/Next.js components using anime.js v4.
- **`visual-design`** — Visual design guidance and principles.
- **`brand-identity`** — Brand identity design guidance.
- **`infographic-design`** — Create data-driven infographics and visual explanations.

## Tech Stack

React 19, TypeScript, Vite 7, Three.js + @react-three/fiber (no drei beyond Canvas).
