# reCLAMMs Campaign Copy

Reference doc for all landing page copy, organized by section.

---

## Hero

**Headline:**
Concentrated Liquidity That Manages Itself

**Subhead:**
reCLAMMs auto-adjust liquidity ranges, eliminate manual rebalancing, and return fungible ERC-20 positions. Deploy once. Earn fees. Never touch it again.

**CTA Primary:** Start Earning
**CTA Secondary:** How It Works

---

## Problem

**Section Label:** The Problem

**Headline:**
CL Is Powerful. The UX Is Broken.

**Body:**
Concentrated liquidity promised capital efficiency. It delivered a full-time job.

Narrow ranges that drift out of position. Manual rebalances that cost gas and realize losses. JIT bots front-running your repositioning. NFT positions that can't be used anywhere else in DeFi.

The data is clear: most concentrated liquidity LPs underperform a basic hold. The capital efficiency gains get eaten by management overhead and adverse selection.

Concentrated liquidity works. It just doesn't work for passive LPs.

**Bullet Points:**
- Manual range management required 24/7
- Rebalancing costs compound — gas, slippage, realized IL
- JIT bots extract disproportionate fee share
- NFT positions are isolated from broader DeFi
- Sophisticated actors dominate at retail LPs' expense

---

## Solution

**Section Label:** The Fix

**Headline:**
reCLAMMs: Set It and Forget It

**Body:**
reCLAMMs — Readjusting Concentrated Liquidity AMMs — are a new Balancer V3 pool type that auto-adjusts liquidity ranges based on real trading activity.

No oracles. No keepers. No off-chain bots. The pool itself shifts its virtual balances to keep liquidity concentrated where trading actually happens, triggered by the swaps flowing through it.

You get the capital efficiency of concentrated liquidity with the simplicity of a full-range AMM position. Deploy capital, receive a fungible ERC-20 LP token, and earn fees while the pool handles range management algorithmically.

---

## Feature Toggle / Tabs

**Section Label:** What Makes reCLAMMs Different

### Fire-and-Forget
**Short:** Deploy once, earn fees, never rebalance.
**Long:** reCLAMM pools automatically adjust their price ranges as markets move. Two parameters — margin (concentration width) and range shift rate (adjustment speed) — govern the behavior. The pool glides smoothly between ranges with no manual intervention required. Your liquidity stays active and earning regardless of where price goes.

### Fungible Positions
**Short:** ERC-20 LP tokens, not NFTs. Composable across DeFi.
**Long:** When you deposit into a reCLAMM pool, you receive standard ERC-20 tokens representing your share. Use them as collateral in lending protocols. Stake them in gauge contracts. Deposit them into yield aggregators. Every integration that works with ERC-20 tokens works with your reCLAMM position — no wrappers, no custom adapters, no friction.

### JIT Resistant
**Short:** Proportional fee distribution. No sniping possible.
**Long:** In traditional CL, JIT bots deploy liquidity microseconds before large swaps, capture outsized fees, then withdraw instantly. This works because each position has a unique range. In reCLAMMs, all LPs share a single range and earn fees proportionally. A bot depositing before a swap earns the same pro-rata share as any other LP. The economic incentive to JIT evaporates.

### Trustless
**Short:** No oracles. No keepers. Fully on-chain.
**Long:** reCLAMMs derive all price information from on-chain trading activity within the pool itself. No Chainlink feeds. No TWAP oracles. No off-chain keeper networks. Oracle manipulation — the attack vector behind hundreds of millions in DeFi losses — is eliminated entirely. The range follows where real trades happen, driven by the same arbitrage incentives that keep every AMM aligned with market prices.

### Battle-Tested
**Short:** Built on Balancer V3. Audited. Open source.
**Long:** reCLAMMs run on Balancer V3's vault architecture — the same infrastructure securing $200M+ in TVL across 12 chains. The vault handles all pool accounting, token transfers, and security. Pool contracts are compact and auditable. The codebase is open source (balancer/reclamm on GitHub), professionally audited, and live in production.

---

## Comparison Table

**Section Label:** How reCLAMMs Compare

| | Traditional CL (Uni V3) | Managed CL Vaults | reCLAMMs |
|---|---|---|---|
| Range Management | Manual | Automated (off-chain) | Automated (on-chain) |
| Oracle Dependency | N/A | Required | None |
| Keeper Dependency | N/A | Required | None |
| Position Type | NFT (ERC-721) | Vault token | ERC-20 (fungible) |
| JIT Resistance | None | Varies | Structural |
| Composability | Requires wrappers | Limited | Native ERC-20 |
| Trust Assumptions | User manages risk | Trust vault operator | Trustless |
| Fee Distribution | Per-position | Vault-level | Proportional, poolwide |
| Rebalance Cost | Gas + slippage per LP | Socialized in vault | Zero (built into swaps) |

---

## Architecture

**Section Label:** Under the Hood

**Headline:**
Built on Balancer V3

**Body:**
reCLAMMs are a custom pool type on Balancer V3's modular vault architecture. The vault handles all token accounting and security. The pool contract implements the reCLAMM invariant — virtual balance adjustments that shift the concentrated liquidity range based on trading activity.

**Key Technical Points:**
- **Virtual balance adjustment:** The pool maintains virtual balances that define the effective price range. Swaps and liquidity operations trigger gradual range shifts, keeping liquidity centered on active trading prices.
- **Smooth glide mechanism:** Range transitions happen gradually via exponential glides (dailyPriceShiftExponent), not atomic tick jumps. This prevents MEV extraction at range boundaries.
- **Configurable parameters:** Pool deployers set margin (concentration width) and range shift rate (adjustment speed). Once deployed, the pool self-manages within these parameters.
- **EIP-1153 transient accounting:** Balancer V3 leverages transient storage for gas-efficient multi-hop swaps and clean accounting.
- **Lifecycle hooks:** V3's hook system enables extensibility — dynamic fees, custom routing, and composable integrations without modifying pool logic.

---

## CTA / Footer

**Headline:**
Concentrated Liquidity Without the Concentrated Anxiety

**Body:**
reCLAMMs are live on Beets on Sonic. Auto-adjusting ranges. Fungible positions. No oracles. No keepers. Capital efficiency that doesn't require a full-time commitment.

**CTA Primary:** Deposit on Beets
**CTA Secondary:** Read the Docs
**CTA Tertiary:** View on GitHub

**Links:**
- App: beets.fi
- Docs: docs.beets.fi
- GitHub: github.com/balancer/reclamm
