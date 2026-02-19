# reCLAMMs Explainer Thread

Main explainer thread. Problem > solution > features > CTA.

---

**1/**
Concentrated liquidity was supposed to be the endgame for LPs.

Instead it became a full-time job.

Narrow ranges. Constant monitoring. Positions drifting out of range while you sleep.

CL is powerful. But it's broken for passive LPs.

**2/**
The numbers don't lie:

Most Uni V3 LPs underperform a simple 50/50 hold. Active management eats your edge. Gas costs compound. And the MEV bots front-running your rebalances are the ones actually profiting.

CL created a game only sophisticated actors can win.

**3/**
The core problem: CL forces you to make predictions.

Pick a range. Hope it holds. When it doesn't, manually rebalance — paying gas, eating slippage, and realizing losses every time you adjust.

That's not liquidity provision. That's active trading with extra steps.

**4/**
Enter reCLAMMs — Readjusting Concentrated Liquidity AMMs.

Built on Balancer V3. Deployed on Beets.

One sentence: concentrated liquidity that manages itself.

Deploy once. Earn fees. Never rebalance.

**5/**
How it works:

reCLAMM pools automatically adjust their price ranges based on real trading activity. No oracles. No keepers. No off-chain bots.

The pool shifts its virtual balances to keep liquidity centered where trading actually happens — triggered by swaps themselves.

**6/**
Two parameters do the heavy lifting:

- **Margin**: how tightly liquidity concentrates around current price
- **Range shift rate**: how fast the range readjusts

The pool glides smoothly between ranges — no abrupt tick jumps, no atomic repositioning that MEV bots can exploit.

**7/**
Positions are fungible ERC-20 tokens. Not NFTs.

This changes everything.

Your LP position is composable across DeFi — use it as collateral, deposit into vaults, stake in gauges. Standard ERC-20 integrations work out of the box.

**8/**
Fungibility also kills JIT attacks.

In Uni V3, JIT bots snipe fees by deploying liquidity microseconds before a large swap. They can do this because positions are unique NFTs with custom ranges.

In reCLAMMs, everyone shares the same range. Fees distribute proportionally. No sniping possible.

**9/**
No oracles means no oracle manipulation.

Hundreds of millions lost to oracle exploits in DeFi. reCLAMMs sidestep the entire attack surface. Price discovery comes from on-chain trading activity — the same arbitrage incentives that keep every other AMM in line.

**10/**
The stack matters too.

reCLAMMs run on Balancer V3's vault architecture — the same battle-tested infrastructure securing billions in TVL. Transient accounting via EIP-1153. Modular hooks. Audited and live in production.

This isn't experimental. It's infrastructure.

**11/**
The comparison is straightforward:

Uni V3: manual ranges, NFT positions, JIT-vulnerable, oracle-dependent managers
reCLAMMs: auto-adjusting, ERC-20 fungible, JIT-resistant, fully trustless

Same capital efficiency. None of the overhead.

**12/**
reCLAMMs are live on Beets on Sonic.

Fire-and-forget CL. Fungible positions. No oracles. No keepers.

Concentrated liquidity that actually works for LPs.

Deposit now: beets.fi
