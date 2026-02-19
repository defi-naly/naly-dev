# reCLAMMs Technical Deep-Dive Thread

Mechanism design: auto-adjusting ranges, oracle-free operation, JIT resistance, ERC-20 vs NFT, Balancer V3 vault architecture.

---

**1/**
reCLAMMs technical deep-dive.

How do you get concentrated liquidity that auto-adjusts its own range, resists JIT attacks, needs no oracles, and returns fungible positions?

Mechanism design. Here's how it works under the hood.

**2/**
Traditional CL (Uni V3 style) uses discrete ticks.

Liquidity lives in fixed price buckets. When price crosses a tick boundary, liquidity activates or deactivates atomically. This creates MEV opportunities at every tick crossing and forces LPs to manually reposition.

reCLAMMs replace ticks with smooth virtual balance adjustments.

**3/**
The core mechanism: virtual balances.

A reCLAMM pool maintains virtual balances that define the effective price range. Instead of LPs choosing tick ranges, the pool itself shifts these virtual balances to keep liquidity concentrated around the current trading price.

Adjustments are triggered by swaps and liquidity operations — the pool's own activity drives its parameters.

**4/**
Two configurable parameters control the behavior:

**Margin** — defines concentration width. Tighter margin = more capital efficient, but narrower effective range.

**Range shift rate** — governs how fast the range readjusts to price movement. Uses a `dailyPriceShiftExponent` for smooth exponential glides.

The pool transitions between ranges gradually. No abrupt repositioning. No atomic tick jumps that bots can sandwich.

**5/**
Oracle-free by design.

reCLAMMs derive price information entirely from on-chain trading activity within the pool. No Chainlink. No TWAP oracles. No keeper bots.

Why this matters: oracle manipulation has caused hundreds of millions in DeFi losses. Every oracle is an attack surface. reCLAMMs have zero oracle dependencies — the price range follows where real trades happen.

**6/**
JIT resistance through fungibility.

In Uni V3, JIT bots monitor the mempool, see a large swap incoming, mint a tight position around the current price, capture disproportionate fees, then burn the position — all in one block.

This works because Uni V3 positions are NFTs with unique ranges. Each position earns fees independently based on its range.

**7/**
reCLAMMs make JIT economically unviable.

All LPs share a single range. Positions are fungible ERC-20 tokens. When a large swap occurs, fees distribute proportionally to all LPs based on their share of the pool — not based on range positioning.

A JIT bot depositing before a swap earns the same pro-rata share as an LP who deposited a month ago. No edge. No exploit.

**8/**
ERC-20 positions unlock composability that NFTs can't.

Uni V3 NFT positions can't be natively used as collateral, pooled into vaults, or staked in standard gauge contracts without wrapper contracts.

reCLAMM LP tokens are standard ERC-20s. They plug into lending protocols, yield aggregators, and gauge systems with zero additional infrastructure.

**9/**
The foundation: Balancer V3's vault architecture.

All pool accounting lives in the vault contract, not the pool itself. This means pool contracts are compact and auditable. The vault handles token transfers, accounting, and security.

V3 uses transient accounting (EIP-1153) for gas-efficient multi-hop swaps and modular lifecycle hooks for extensibility.

reCLAMMs inherit all of this — battle-tested vault security, efficient routing, and hook composability.

**10/**
Summary of the design space:

| Feature | Uni V3 / V4 | reCLAMMs |
|---|---|---|
| Range mgmt | Manual | Auto-adjusting |
| Position type | NFT (ERC-721) | Fungible (ERC-20) |
| JIT resistance | None | Structural |
| Oracle dependency | External (for managers) | None |
| Fee distribution | Per-position, per-range | Proportional, poolwide |
| Composability | Requires wrappers | Native ERC-20 |

reCLAMMs are live on Beets on Sonic. The code is open source on GitHub (balancer/reclamm), audited, and in production.
