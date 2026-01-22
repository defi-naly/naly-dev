# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo containing two projects:
- **naly.dev** (root) - Interactive financial dashboards, economic analysis, and "The Money Game" educational feature
- **TIPZ** (`/tipz`) - Private micro-tipping browser extension for X/Substack creators using Zcash

## Build Commands

### Main Site (naly.dev)
```bash
npm run dev      # Dev server on port 3000
npm run build    # Production build
npm run lint     # ESLint
```

### TIPZ Web (`/tipz/web`)
```bash
npm run dev      # Dev server
npm run build    # Production build
```

### TIPZ Extension (`/tipz/extension`)
```bash
npm run dev      # Plasmo dev with hot reload
npm run build    # Build extension
npm run package  # Package for Chrome Web Store
```

## Architecture

### Main Site Structure
- `/app` - Next.js 14 App Router pages
  - `/learn/game` - The Money Game (8-chapter interactive education)
  - `/tools` - Interactive tools (decay, echo, saeculum, the-fork, the-line, truvalue)
  - `/research` - Long-form analysis content
  - `/api` - API routes (echo-metrics, tickers, the-line)
- `/components` - React components by feature
  - `/learn/chapters` - Chapter implementations (BarterGame, GoldComparison, etc.)
- `/data` - Static data (chapters.ts, echoes.json, purchasing-power.json)
- `/lib` - Utilities including FRED API integration

### TIPZ Structure
- `/tipz/web` - Next.js 16 web app with Supabase backend
- `/tipz/extension` - Plasmo browser extension with content scripts for X/Substack
- `/tipz/supabase` - Database migrations

### The Money Game Architecture
- Single-page game with state machine: title → playing → end
- 8 sequential chapters, each self-contained component receiving `onComplete` callback
- Progress saved to localStorage with `STORAGE_KEY`
- ChapterWrapper provides consistent layout
- Chapter data defined in `/data/chapters.ts`

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **Database**: Supabase (TIPZ only)
- **Extension**: Plasmo framework
- **Web3**: ethers.js, WalletConnect

## Design System

"Bloomberg Terminal" aesthetic - dark mode, monospace, data-dense.

**Colors** (Tailwind custom):
- `terminal-bg`: #0a0a0a (background)
- `terminal-surface`: #111111 (cards)
- `terminal-border`: #262626
- `terminal-accent`: #22c55e (green)
- amber-500 (primary interactive), emerald-500 (success), red-500 (error)

**Typography**: JetBrains Mono (preferred), Inter (long-form fallback)

**Component Patterns**:
```tsx
// Cards
className="bg-zinc-900 border border-zinc-700 rounded-lg p-4"

// Primary button
className="bg-amber-500 text-zinc-900 hover:bg-amber-400"

// Standard animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

## Key Conventions

- Functional components with 'use client' directive
- Local state via useState, no Redux/Zustand
- Chapter components: receive `onComplete: () => void`, use Framer Motion containers with stagger
- API routes: structured ErrorResponse types, Zod validation
- Fonts loaded in `/app/layout.js`: Inter (sans) + JetBrains Mono (mono)

## Environment Variables

See `.env.example` files in `/tipz/web` and `/tipz/extension` for required variables (Supabase credentials, API URLs).
