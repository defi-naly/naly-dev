# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Three projects:
- **naly.dev** (this repo) - Interactive financial dashboards, economic analysis, and "The Money Game" educational feature
- **insidelabs-refresh** (local: `/Users/dylanadams/Desktop/insidelabs-refresh`) - Inside Labs B2B marketing site (React + Vite)
- **TIPZ** (2 repos under `tipz-cash` org, all private):
  - `tipz-cash/tipz.cash` (local: `/tipz`) - Web app + Supabase
  - `tipz-cash/tipz-internal` (local: `/tipz-internal`) - Marketing, GTM, assets

## Build Commands

### Main Site (naly.dev)
```bash
npm run dev      # Dev server on port 3000
npm run build    # Production build
npm run lint     # ESLint
```

### Inside Labs Refresh (`/Users/dylanadams/Desktop/insidelabs-refresh`)
```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
npm run test     # Vitest
```

### TIPZ Web (`/tipz/web`)
```bash
npm run dev      # Dev server
npm run build    # Production build
npm run test     # Run tests (vitest)
npm run test:watch  # Watch mode
```

### TIPZ Content Hub (`tipz-internal/execution/content`)
When the user says they're working on the Content Hub, auto-run:
```bash
cd /Users/dylanadams/Desktop/naly-dev/tipz-internal/execution/content && node serve-hub.mjs
```
- Opens http://localhost:3333 with content-hub.html
- Restores last-saved state from content-hub-data.json
- Cmd+S saves directly to disk (no download/rename needed)

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

### Inside Labs Refresh Structure

B2B marketing site for Inside Labs — white-label digital platforms for Swiss tourism/hospitality. **Production-ready**, no TODOs.

**Tech:** React 18 + TypeScript 5.8, Vite 5.4, Tailwind CSS 3.4, React Router DOM 6.30, Three.js + React Three Fiber, Radix UI + shadcn/ui (48 primitives), Lucide icons, custom i18n (React Context, EN/DE, localStorage)

```
/src/
  /pages/              # 4 routes
    Index.tsx           # Homepage: 3D mountain hero, logo carousel, problem/solution, product demo, social proof, CTA
    Product.tsx         # Omni Suite features, stats, comparison table, iPhone frame demo
    UseCases.tsx        # 6 case studies (LAAX, Zermatt, Schwyz, ESTM, Lenzerheide, Bike Kingdom)
    About.tsx           # Origin story, team (7 employees + 4 board), awards
  /components/
    HeroSection.tsx           # Stage-based animated reveal, WireframeMountain, client logo carousel
    OmniSuiteSection.tsx      # Largest (762 LOC) — interactive 5-pillar dashboard (For You, Live, Shop, Play, Wallet)
    ProductDemoSection.tsx    # iPhone frame mockup with pillar tabs, LAAX App Store screenshots
    OmniComparisonSection.tsx # Feature comparison table
    ProblemSolutionSection.tsx # Problem/solution narrative (330 LOC)
    ImpactDetailModal.tsx     # Full-screen case study modal
    IntelligenceMesh.tsx      # Network visualization (374 LOC)
    ExpandedCard.tsx          # Expandable feature card (487 LOC)
    /about/                   # AwardsBar, StatsHero, OriginStory, TeamSection
    /ui/                      # 48 shadcn/ui components
  /data/
    caseStudies.ts      # 6 case studies with metrics, quotes, bullets
    team.ts             # Team + board profiles with photos and LinkedIn
  /i18n/
    index.tsx           # i18n provider + useTranslation hook
    en.json / de.json   # Full EN/DE translations
  /hooks/               # use-mobile, use-toast
  /lib/utils.ts         # cn() utility
/public/images/
  /app-screens/         # 4 LAAX App Store screenshots (1290x2796, 9:19.5 ratio)
  /cases/               # 6 resort hero images
  /logos/               # 8 client SVG/PNG logos (LAAX, Zermatt, Engadin, St. Moritz, etc.)
  /team/                # 11 member photos
  /omni/, /usp/, /svg/  # Product mockups and feature images
```

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

### TIPZ Creator Dashboard (Web)

Authenticated creator experience at `tipz.cash/my`:

**Key Features:**
- **Twitter OAuth Login:** PKCE flow for secure authentication
- **Real-Time Notifications:** Supabase Realtime WebSocket for instant tip alerts
- **Earnings Display:** Total ZEC earned, USD conversion, tip count with animated counters
- **Activity Feed:** Recent tips received with decrypted memo messages
- **Promotion Tools:** Copy tip link, generate share tweets, image stamp generator
- **Encrypted Messages:** RSA key pair auto-generated, private key stored in IndexedDB

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

- **Registration:** X handle + Zcash shielded address + tweet verification (4-step wizard)
- **Creator Dashboard:** Authenticated dashboard at `/my` with OAuth, real-time notifications, earnings stats
- **Creator Directory:** Browse registered creators with search, leaderboard, activity ticker
- **Creator Profiles:** Individual tip pages at `/:handle` with dynamic OG images
- **ZEC Price Ticker:** Real-time via CoinGecko
- **Encrypted Messages:** Optional private messages from tippers to creators

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

### naly.dev + TIPZ
- **Frontend**: Next.js 14/16 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **Database**: Supabase (TIPZ only)
- **Web3**: ethers.js, @solana/web3.js, NEAR Intents (cross-chain swaps)

### insidelabs-refresh
- **Frontend**: React 18, TypeScript 5.8, Vite 5.4, React Router DOM 6.30
- **Styling**: Tailwind CSS 3.4, tailwind-merge, class-variance-authority
- **3D**: Three.js 0.160, React Three Fiber 8.18, React Three Drei 9.122
- **UI Components**: Radix UI + shadcn/ui (48 components), Lucide icons
- **State**: TanStack React Query 5.83, React Hook Form 7.61 + Zod 3.25
- **i18n**: Custom React Context (EN/DE), localStorage persistence
- **Testing**: Vitest 3.2 + @testing-library

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
