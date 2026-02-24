---
name: platform-design
description: Use when designing multi-sided platforms or marketplaces — from core transaction to governance to moat defense.
---

# Platform Design: Build Multi-Sided Platforms and Marketplaces

## When to Use

- You are building a product that connects producers and consumers
- You need to design the core transaction for a marketplace or platform
- You are solving the chicken-and-egg problem for a two-sided market
- You need to decide on governance rules and monetization strategy
- You are evaluating whether your business should be a platform or a pipeline
- You want to understand platform dynamics to avoid exploitation patterns

## Core Frameworks

### 1. Platform vs. Pipeline (Modern Monopolies)

The fundamental strategic question: are you building a platform or a pipeline?

| Dimension | Pipeline (Linear) | Platform (Multi-sided) |
|-----------|-------------------|----------------------|
| Value creation | Internal (you make the product) | External (users create value for each other) |
| Growth | Hire more, produce more | Enable more participants |
| Scaling cost | Increases with growth | Decreases with growth |
| Asset model | Own inventory | Own the network |
| Competition | Feature vs. feature | Network vs. network |
| Examples | Apple (hardware), Netflix (content) | App Store, YouTube, Airbnb |

**The platform litmus test:** Does each additional user make the product more valuable for existing users? If yes, platform dynamics apply. If no, you are building a pipeline.

**Warning:** Not everything should be a platform. Platforms require network effects to justify the complexity. A great pipeline business (SaaS tool, consumer product) can be enormously valuable without platform dynamics.

### 2. The Core Transaction (Modern Monopolies)

Every platform enables one core transaction. Get this wrong and nothing else matters.

**The core transaction has four steps:**

```
1. CREATE  -->  2. CONNECT  -->  3. CONSUME  -->  4. COMPENSATE
Producer         Platform          Consumer         Value exchange
makes supply     matches them      uses supply      (money, rating,
                                                     attention)
```

**Examples:**

| Platform | Create | Connect | Consume | Compensate |
|----------|--------|---------|---------|------------|
| Uber | Driver goes online | Algorithm matches | Rider gets ride | Payment + rating |
| YouTube | Creator uploads video | Search/recommend | Viewer watches | Ads + subscription |
| Airbnb | Host lists property | Search + filters | Guest stays | Payment + review |
| App Store | Dev publishes app | Browse + search | User downloads | Purchase + rating |
| Upwork | Freelancer creates profile | Job matching | Client hires | Payment + review |

**Design principles for the core transaction:**

1. **Minimize friction at each step** — Every click between "I want" and "I got" is a leakage point
2. **Build trust infrastructure** — Reviews, verification, guarantees, dispute resolution
3. **Make the first transaction easy** — Lower the bar: free trial, money-back guarantee, small amounts first
4. **Capture data from each transaction** — Matching quality improves with transaction volume (data network effect)

### 3. Chicken-and-Egg Solutions (Cold Start Problem + Modern Monopolies)

The existential crisis of every platform: you need supply to attract demand, and demand to attract supply.

**Solution taxonomy:**

| Strategy | Mechanism | Difficulty | Example |
|----------|-----------|------------|---------|
| **Seed one side** | Bring supply first, demand follows | Medium | OpenTable seeded restaurants with free terminals |
| **Single-player value** | Product is useful without the other side | High (requires dual product) | Yelp: useful reviews before any business tools |
| **Piggyback** | Parasitically recruit from existing platform | Low cost, fragile | PayPal recruited eBay sellers via bot |
| **Marquee strategy** | Attract high-value supply that draws demand | Medium | Game consoles pay for exclusive titles |
| **One side as both** | Users serve both roles | Low | Craigslist (same person buys and sells) |
| **Subsidize hard side** | Pay the side that is harder to get | Expensive | Uber paid drivers guaranteed minimums |
| **Constrain supply** | Artificial scarcity creates perceived quality | Low | Gilt (curated fashion); early Airbnb (hand-picked hosts) |
| **Vertical integration** | Be the supply yourself initially | High effort | Amazon sold books before marketplace |

**Sequencing matters:** Solve for the hard side first. Once you have supply, demand is a marketing problem. Without supply, demand has nothing to consume.

### 4. Governance (Modern Monopolies)

Platforms are mini-economies. Without governance, they devolve into tragedy of the commons.

**The governance triad:**

```
         RULES
        /     \
       /       \
   TOOLS  ---  NORMS
```

- **Rules:** Explicit policies (what is allowed, prohibited, required)
- **Tools:** Technical enforcement (spam filters, verification, rate limiting)
- **Norms:** Community expectations (review etiquette, response time expectations)

**Key governance decisions:**

| Decision | Options | Trade-off |
|----------|---------|-----------|
| Openness | Open (anyone can join) vs. curated | Scale vs. quality |
| Content moderation | Preemptive vs. reactive | Safety vs. freedom/cost |
| Pricing control | Platform sets price vs. participants set price | Simplicity vs. market efficiency |
| Data access | Open API vs. closed | Ecosystem growth vs. competitive moat |
| Dispute resolution | Automated vs. human review | Cost vs. fairness |
| Multi-homing | Allow vs. discourage | User freedom vs. lock-in |

**The governance trap:** Too little governance and quality collapses (Craigslist spam). Too much governance and you suffocate participation (Apple App Store rejections). Start light, add rules only when specific problems emerge.

### 5. The Cautionary Lens: Rent vs. Profit (Technofeudalism)

Platforms can extract value rather than create it. Be aware of the dynamics to avoid building an exploitative system — or to recognize when you are on the wrong side of one.

**The vassal dynamic:**

When a platform becomes dominant, participants become dependent:

| Signal | What Is Happening | Example |
|--------|-------------------|---------|
| Take rate increases over time | Platform captures more of each transaction | Uber raising commission from 20% to 30% |
| Participants cannot leave | Switching costs are prohibitive | Amazon sellers dependent on FBA |
| Platform competes with participants | Using data to build competing products | Amazon Basics copying top sellers |
| Rules change unilaterally | Governance without representation | App Store policy changes |
| Access requires payment | Pay-to-play replaces merit | Social media algorithmic suppression without ads |

**Design counter-principles (if you want to build ethically):**

1. Keep take rates stable and transparent
2. Allow data portability
3. Do not compete with your supply side using their data
4. Give participants governance voice
5. Make exit possible (no hostage data)

### 6. Monetization Strategy (Modern Monopolies + Cold Start Problem)

**When to monetize:** After establishing network effects, not before. Premature monetization kills growth in network-effect businesses.

**The monetization sequencing:**

```
Stage 1: Free (build network)
Stage 2: Free + premium (capture willingness to pay)
Stage 3: Transaction fees (tax the core transaction)
Stage 4: Layered revenue (ads, data, financial services)
```

**Monetization models for platforms:**

| Model | How It Works | Best For | Example |
|-------|-------------|----------|---------|
| Transaction fee | % or flat fee per transaction | Marketplaces | Stripe (2.9%), Airbnb (3% host + 14% guest) |
| Freemium | Free base, paid premium features | SaaS platforms | LinkedIn, Slack |
| Subscription | Recurring access fee | Content, tools | App Store developer program |
| Enhanced listing | Pay for visibility/priority | Marketplaces | Yelp, Indeed |
| Advertising | Sell audience attention | Content platforms | YouTube, Instagram |
| Data/analytics | Sell aggregate insights | Data-rich platforms | Google, Bloomberg |

**Take rate benchmarks by category:**

| Category | Typical Take Rate | Why |
|----------|------------------|-----|
| Payments | 1-3% | Commoditized, volume-based |
| SaaS marketplace | 5-15% | Moderate value-add |
| Service marketplace | 15-30% | High trust/matching value |
| Digital content | 15-30% | Distribution + discovery value |
| App stores | 15-30% | Distribution + payment + trust |
| Managed marketplace | 30-50% | End-to-end service management |

### 7. Defending the Moat (Cold Start Problem)

Network effects create moats, but moats erode. Defense requires ongoing investment.

**Moat layers (stack as many as possible):**

| Layer | How It Defends | Example |
|-------|---------------|---------|
| Network effects | Larger network = more value | WhatsApp, Facebook |
| Switching costs | User data/content trapped | Salesforce, Notion |
| Multi-tenanting defense | Exclusive supply or demand | Uber (driver incentives for exclusivity) |
| Brand | Trust and category ownership | Airbnb, Google |
| Data advantage | Better matching from more data | Google Search, Waze |
| Regulatory capture | Compliance as barrier | Stripe (payment licenses) |
| Embedding | Deeply integrated in workflows | Slack, AWS |

**The multi-tenanting threat:** The biggest competitive risk for platforms is users participating on multiple competing platforms simultaneously. Drivers on Uber AND Lyft. Hosts on Airbnb AND Vrbo. Sellers on Amazon AND Shopify.

**Multi-tenanting defenses:**

1. **Loyalty programs** — Reward exclusivity (Uber Pro, Airbnb Superhost)
2. **Integration depth** — Make switching costly (Shopify managing full business ops)
3. **Data lock-in** — History, reviews, reputation are non-portable
4. **Superior matching** — Better algorithms mean better outcomes for participants
5. **Network density** — In some markets, the denser network wins regardless

## Application Checklist

- [ ] Determine whether platform dynamics genuinely apply (not everything should be a platform)
- [ ] Define your core transaction: Create, Connect, Consume, Compensate
- [ ] Identify the hard side and design your seeding strategy
- [ ] Choose a chicken-and-egg solution and execute in one micro-market
- [ ] Design trust infrastructure (reviews, verification, guarantees)
- [ ] Set initial governance rules (light touch, add as needed)
- [ ] Defer monetization until network effects are established
- [ ] Choose a monetization model aligned with your core transaction
- [ ] Set take rates at or below category benchmarks
- [ ] Design at least two moat layers beyond network effects alone
- [ ] Monitor multi-tenanting behavior on both sides
- [ ] Establish a data portability stance (ethical and strategic)

## Anti-Patterns

**"Platform cosplay"** — Calling yourself a platform when you are a tool. If removing the network would not meaningfully degrade the product, you are a SaaS tool with a community feature. That is fine. Just price and grow accordingly.

**"Monetize before network"** — Charging before the network delivers value. This kills the growth that would make the platform valuable. Charge when participants would pay to stay, not before.

**"Race to the bottom take rate"** — Competing on price with an established platform. If they have the network, a lower take rate will not move supply. Compete on experience or a specific niche.

**"Build both sides simultaneously"** — Trying to grow supply and demand at the same time across a broad market. Solve for the hard side first, in one market. Sequential, not parallel.

**"Governance neglect"** — Assuming users will self-regulate. Every platform needs trust infrastructure from day one, even if minimal. Without it, bad actors drive good users away.

**"Boiling the frog"** — Slowly increasing take rates, adding fees, degrading organic reach. Participants notice, resent it, and actively seek alternatives. The goodwill you burn is the moat you destroy.

**"Platform landlordism"** — Using dominance to extract maximum rent rather than maximum value. Short-term revenue optimization at the cost of long-term ecosystem health. The history of platforms that over-extracted is a history of platforms that were replaced.
