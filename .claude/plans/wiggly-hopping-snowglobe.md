# Creator Profile: Fix "Not Found" Bug + Add Tip History Panel

## Context

Two problems on the creator tipping page (`/[handle]`):

1. **Bug**: After sending a payment, returning to a creator's profile shows "Not registered — invite them" instead of the tipping card. Root cause: the `fetch()` call has no `cache: 'no-store'` directive, so the browser/Next.js may serve a stale or error-cached response. Additionally, there's no retry logic if the API call fails transiently.

2. **Feature gap**: When a tipper sends a tip and leaves the page before the swap finishes routing, they have no way to know if it succeeded. They need a **tip history panel** on the creator's profile page showing their own tips and their statuses (pending/confirmed/failed).

---

## Part 1: Fix "Not Found" Bug

### File: `app/[handle]/page.tsx` (~line 519)

**Problem**: `fetch('/api/creator?...')` uses default caching behavior. A transient failure or stale cache causes the page to show "not_found" even for valid creators.

**Fix**:
- Add `{ cache: 'no-store' }` to the fetch call to force fresh data every time
- Add a single retry with a small delay if the first request fails
- Add `console.log` for the response to help debug future issues

```ts
// Before
const response = await fetch(`/api/creator?platform=x&handle=${encodeURIComponent(handle)}`)

// After
const response = await fetch(
  `/api/creator?platform=x&handle=${encodeURIComponent(handle)}`,
  { cache: 'no-store' }
)
```

Add retry logic: if the fetch throws or returns `!data.found`, wait 1s and retry once before setting `not_found`.

---

## Part 2: Tip History Panel

### Overview

A **localStorage-backed tip history** shown in a panel next to the tipping card. Privacy-preserving — tipper identity stays client-side only. The panel shows the user's own tips to the current creator with live status updates.

### Data Model

New localStorage key: **`tipz_tip_history`**

```ts
interface TipHistoryEntry {
  id: string              // transactionId from DB, or generated UUID
  creatorHandle: string   // which creator this tip was for
  amount: string          // display amount (e.g. "5.00")
  tokenSymbol: string     // ETH, USDC, SOL, etc.
  timestamp: number       // when tip was initiated
  status: 'pending' | 'confirmed' | 'failed' | 'refunded'
  depositAddress?: string // for resuming status polling
  transactionId?: string  // DB tipz table ID
}
```

Max 50 entries, pruned on write (oldest first). Entries older than 7 days auto-pruned on read.

### Files to Create

#### `components/tipping/TipHistory.tsx` (new)

A sidebar component that:
- Reads `tipz_tip_history` from localStorage, filtered to `creatorHandle`
- For any entries with `status: 'pending'`, polls `/api/swap/status` every 5s to update status
- Renders a compact list of tips with:
  - Token icon + amount (e.g. "5.00 USDC")
  - Relative timestamp ("2m ago", "1h ago")
  - Status indicator: pulsing gold dot (pending), green checkmark (confirmed), red x (failed/refunded)
- Empty state: nothing rendered (component returns null if no history)
- Uses existing `tokens` and `keyframes` from `designTokens.ts`
- Glass card aesthetic matching TippingFlow

**Props**:
```ts
interface TipHistoryProps {
  creatorHandle: string
  isMobile?: boolean
}
```

### Files to Modify

#### `hooks/useTipping.ts`

Add tip history persistence:

1. **New helper: `addTipToHistory(entry: TipHistoryEntry)`** — appends to localStorage array, caps at 50
2. **New helper: `updateTipInHistory(id: string, updates: Partial<TipHistoryEntry>)`** — updates status of a specific entry
3. In `sendTip()` (~line 617, where `PENDING_TIP_KEY` is written): also call `addTipToHistory()` with the tip details
4. In `pollSwapStatus()` (~line 271-326, where completion states are handled): call `updateTipInHistory()` to set final status (confirmed/failed/refunded)

These are pure utility functions — they don't affect the existing singleton `tipz_pending_tip` / `tipz_failed_tip` behavior.

#### `app/[handle]/page.tsx`

**Desktop layout change** (lines 734-790):
- Change from a single centered card to a flex row with the card on the left and TipHistory on the right
- TipHistory only renders when there are entries (no empty state cluttering the page)
- Layout: `display: flex; align-items: flex-start; justify-content: center; gap: 16px;`
- Card keeps its current max-width (400px)
- History panel: max-width ~280px, position sticky

**Mobile layout change** (lines 663-731):
- Add TipHistory below TippingFlow inside `.tipz-mobile-content`
- Compact layout, collapsible or scrollable

### Design Spec (using existing design tokens)

**History Panel**:
- Background: `tokens.glass.background` with `backdropFilter`
- Border-top: golden ridge (matching card)
- Border-radius: `tokens.radius.xl`
- Padding: `tokens.space.lg`
- Title: "Your Tips" in `tokens.font.sans`, 13px, `tokens.colors.textMuted`

**Each Tip Row**:
- Horizontal layout: status dot | amount + token | timestamp
- Status dot: 6px circle
  - Pending: `tokens.colors.gold` with `animation: pulse 1.5s infinite`
  - Confirmed: `tokens.colors.success`
  - Failed: `tokens.colors.error`
- Amount: `tokens.font.mono`, 13px, `tokens.colors.textBright`
- Token: `tokens.colors.textMuted`, 11px
- Timestamp: `tokens.colors.textSubtle`, 11px, right-aligned

### Key Reusable Code

| What | Where | Purpose |
|------|-------|---------|
| Design tokens | `components/tipping/designTokens.ts` | Colors, spacing, fonts, glass styles |
| `cardContainerStyles` | `designTokens.ts:173` | Glass card with golden ridge |
| `keyframes` | `designTokens.ts:226` | Pulse, breathingGlow, fadeIn animations |
| Status polling pattern | `hooks/useTipping.ts:253-331` | `pollSwapStatus()` + interval setup |
| `PendingTip` interface | `hooks/useTipping.ts:44-51` | Structure for tip persistence |

---

## Verification

1. `cd /Users/dylanadams/Desktop/tipz/web && npm run dev`
2. **Bug fix**: Visit a registered creator's profile → confirm it loads. Navigate away and back → confirm it still loads (no "Not registered" flash)
3. **Tip history**:
   - Send a tip to a creator
   - Observe the history panel appears with a pulsing gold dot and "pending" status
   - Wait for the swap to complete → status updates to green checkmark
   - Navigate away and return → history panel shows the confirmed tip
   - If tip fails → red indicator shown
4. **Mobile**: Check that tip history appears below the card, doesn't break the layout
5. **Empty state**: Visit a creator you've never tipped → no history panel shown (clean)
