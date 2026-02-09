# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Two projects:
- **naly.dev** (this repo) - Interactive financial dashboards, economic analysis, and "The Money Game" educational feature
- **TIPZ** (3 repos under `tipz-cash` org, all private):
  - `tipz-cash/tipz.cash` (local: `/tipz`) - Web app + Supabase
  - `tipz-cash/tipz-extension` (local: `/tipz-extension`) - Browser extension
  - `tipz-cash/tipz-internal` (local: `/tipz-internal`) - Marketing, GTM, assets

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
npm run test     # Run tests (vitest)
npm run test:watch  # Watch mode
```

### TIPZ Extension (`/tipz-extension`)
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

### TIPZ Repository Structure

**tipz.cash** (web app):
```
/web/               # Next.js 16 app + API
/supabase/          # Database migrations
/docs/
  /engineering/     # Architecture, roadmap
  /technical/       # Implementation guides
  /operations/      # Runbooks, support
```

**tipz-extension** (browser extension):
```
/background.ts      # Service worker, Supabase Realtime
/popup.tsx          # Creator dashboard
/contents/          # Content scripts (x.tsx, tipz-interceptor.tsx)
/lib/               # Utilities (api, crypto, identity, realtime)
/components/        # UI components
/assets/            # Extension icons
```

**tipz-internal** (private docs):
```
/marketing/         # Messaging, pitch decks
/gtm/               # Go-to-market, KOL outreach
/design/            # Brand guidelines, UX flows
/guides/            # Creator onboarding
/grants/            # Grant applications
/analysis/          # Strategic frameworks
/research/          # PDF generator
/video/             # Remotion video generator
/assets/zec-logos/  # Zcash brand assets
```

### TIPZ Product Direction

**Mission:** Privacy-first micro-tipping for creators using Zcash shielded addresses

**Core Beliefs:**
- Privacy is a default human right, not something to justify
- Financial surveillance enables control — every indexed transaction is a data point
- Creators deserve sovereignty: self-custody, zero intermediaries, no platform capture
- Support should leave no trace

**Target Users:** X creators who value privacy and direct audience support (v1)

### TIPZ Extension (Creator Tool)

The extension helps **creators** monetize their content. Tippers use the web app instead.

**Key Features:**
- **Creator Identity Linking:** TIPZ Web Bridge - extension reads verified identity from tipz.cash localStorage
- **Auto-Stamp:** Automatically embed `tipz.cash/{handle}` links in creator's own X posts
- **Instant Alerts:** Real-time browser notifications when tips arrive (Supabase Realtime)
- **Revenue Analytics:** Dashboard showing incoming tips, totals, and trends

**Architecture:**
- `contents/x.tsx` - Detects X compose box, injects AutoStamp toggle for linked creators
- `contents/tipz-interceptor.tsx` - Reads localStorage on tipz.cash to capture verified identity
- `background.ts` - Service worker subscribes to Supabase Realtime for tip notifications
- `popup.tsx` - Creator dashboard (linked status, revenue stats, recent tips received)

### TIPZ Design System

**Aesthetic:** Dark crypto-terminal with Bloomberg-inspired data density

**Colors:**
- Background: `#08090a` / Surface: `#12141a`
- Primary (amber): `#F5A623` with glow effects
- Success: `#22C55E` / Error: `#EF4444`
- Text: `#D1D5DB` (muted) / `#F9FAFB` (bright)

**Typography:** JetBrains Mono (code/logo), Inter (body)

**Interactions:** Typing animations, scroll-triggered reveals, glassmorphism cards, respects `prefers-reduced-motion`

### TIPZ Payments (LIVE in Production)

**Status:** Cross-chain payments via NEAR Intents are live and working.

**Supported Payment Methods:**
- **ETH** (Ethereum mainnet) → ZEC shielded
- **USDC** (Ethereum, Polygon, Arbitrum, Optimism) → ZEC shielded
- **USDT** (Ethereum) → ZEC shielded
- **SOL** (Solana via Phantom) → ZEC shielded

**Wallets Supported:**
- MetaMask, Rabby, Coinbase Wallet (EVM)
- Phantom (Solana)

**Flow:** User connects wallet → selects amount/token → sends to NEAR Intents deposit address → NEAR handles cross-chain swap → Creator receives shielded ZEC

**Key Files (in tipz.cash/web):**
- `lib/wallet.ts` - Wallet connection, transaction execution
- `lib/near-intents.ts` - NEAR Intents API integration
- `hooks/useTipping.ts` - Tipping state machine with status polling
- `app/api/swap/quote/route.ts` - Quote endpoint
- `app/api/swap/execute/route.ts` - Execute endpoint
- `app/api/swap/status/route.ts` - Status polling endpoint

### TIPZ Web Features (v1)

- **Registration:** X handle + Zcash shielded address + tweet verification
- **Creator Directory:** Browse registered creators with demo mode fallback
- **Creator Profiles:** Individual tip pages at `/:handle`
- **ZEC Price Ticker:** Real-time via CoinGecko

### TIPZ Testing

**Framework:** Vitest — 139 tests across 11 files

**Test locations (in tipz.cash/web):**
- `__tests__/*.test.ts` - Unit and integration tests
- `scripts/test-near-intents.ts` - NEAR Intents integration test script

**What's covered:**
- Swap quote/execute/status API routes (SOL, ETH, USDC, USDT)
- NEAR Intents integration (quoting, execution, status polling)
- Wallet connection and transaction flows
- Registration and creator directory
- ZEC price fetching with fallback

**Bugs fixed (SOL support — 5 fixes in `app/api/swap/quote/route.ts`):**
- SOL token config (decimals, blockchain, symbol mapping)
- Solana deposit address generation
- SOL amount conversion (lamports)
- Quote response formatting for Solana
- ZEC fallback price updated to current market rate

### The Money Game Architecture
- Single-page game with state machine: title → playing → end
- 8 sequential chapters, each self-contained component receiving `onComplete` callback
- Progress saved to localStorage with `STORAGE_KEY`
- ChapterWrapper provides consistent layout
- Chapter data defined in `/data/chapters.ts`

## Tech Stack

- **Frontend**: Next.js 14/16 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **Database**: Supabase (TIPZ only)
- **Extension**: Plasmo framework
- **Web3**: ethers.js, @solana/web3.js, NEAR Intents (cross-chain swaps)

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

- **TIPZ Web**: See `.env.example` in `/tipz/web` (Supabase credentials, NEAR credentials)
- **TIPZ Extension**: See `.env.example` in `/tipz-extension` (Supabase credentials, API URLs)
