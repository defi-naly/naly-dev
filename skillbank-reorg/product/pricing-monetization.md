---
name: pricing-monetization
description: Use when pricing a product or designing monetization — frameworks for when, how, and how much to charge.
---

# Pricing and Monetization: Price Products and Monetize Platforms

## When to Use

- You are setting prices for a new product or feature
- You need to choose a monetization model (SaaS, marketplace, freemium, etc.)
- You are evaluating whether it is the right time to start charging
- You need to optimize CAC/LTV economics
- You are transitioning from free to paid or changing your pricing model
- You need to defend pricing decisions to investors or stakeholders

## Core Frameworks

### 1. Pricing Philosophy: Value, Not Cost

Pricing should reflect the value you deliver, not the cost to produce. Cost-plus pricing is a race to the bottom. Value-based pricing captures the upside of solving real problems.

**The value pricing formula:**

```
Your price should be: (Value delivered to customer) x (Capture rate)

Where capture rate is typically 10-25% of total value created.
```

| Approach | Method | When to Use | Risk |
|----------|--------|-------------|------|
| Cost-plus | Cost + margin | Commodities only | Leaves money on table |
| Competitor-based | Match or undercut market | Mature, competitive markets | Race to bottom |
| Value-based | Price = f(customer value) | Differentiated products | Requires understanding customer economics |
| Willingness-to-pay | Test what market bears | New categories | Can overprice and kill growth |

### 2. Monetization Models (Modern Monopolies + Lean Startup)

**For SaaS / single-player products:**

| Model | How It Works | Best For | Example |
|-------|-------------|----------|---------|
| Subscription (flat) | Fixed monthly/annual fee | Predictable value delivery | Netflix, Basecamp |
| Subscription (tiered) | Multiple plans at different prices | Heterogeneous customer base | Slack, Notion, Figma |
| Usage-based | Pay for what you consume | Variable usage patterns | AWS, Twilio, Snowflake |
| Per-seat | Price scales with team size | Collaboration tools | Slack, Jira, Linear |
| Freemium | Free tier + paid upgrade | High volume, low conversion | Spotify, Dropbox, Canva |
| One-time purchase | Pay once, own forever | Standalone tools | Sketch (before subscription) |

**For platforms / marketplaces (Modern Monopolies):**

| Model | How It Works | Best For | Example |
|-------|-------------|----------|---------|
| Transaction fee (%) | Percentage of each transaction | Marketplaces with variable prices | Stripe (2.9%), Airbnb (3-14%) |
| Transaction fee (flat) | Fixed fee per transaction | Low-value, high-volume transactions | Venmo, Cash App |
| Listing fee | Charge to create supply | Supply-heavy marketplaces | eBay, Etsy |
| Enhanced placement | Pay for visibility | Search-driven marketplaces | Indeed, Zillow |
| Subscription (supplier) | Suppliers pay monthly access fee | B2B marketplaces | Amazon Pro seller, Shopify |
| Advertising | Sell attention to third parties | Content/social platforms | YouTube, Instagram, TikTok |
| Data licensing | Sell aggregate insights | Data-rich platforms | Google, Bloomberg, LinkedIn |
| Financial services | Payments, lending, insurance | Platforms with transaction flow | Shopify Capital, Uber Instant Pay |

### 3. The Freemium Decision (Modern Monopolies + Cold Start Problem)

Freemium is a customer acquisition strategy, not a business model. The free tier is marketing spend.

**When freemium works:**

| Condition | Why It Matters |
|-----------|---------------|
| Large addressable market | Need volume to make conversion math work |
| Low marginal cost | Serving free users must be cheap |
| Clear value gap between free and paid | Users must feel the constraint |
| Product improves with usage (data/network effects) | Free users create value for paying users |
| Viral mechanics exist | Free users recruit other users |
| Time-based value increase | Users invest data/content that increases switching cost |

**When freemium fails:**

| Condition | Why |
|-----------|-----|
| Small market | Not enough volume for 2-5% conversion to sustain business |
| High marginal cost | Free users eat your margin |
| No clear upgrade trigger | Users are satisfied on free forever |
| Enterprise buyer | Decision maker is different from user; free trial works better |
| Complex product | Users cannot self-serve; need sales touch |

**Freemium conversion benchmarks:**

| Product Type | Typical Free-to-Paid Rate | Good | Great |
|-------------|--------------------------|------|-------|
| Consumer SaaS | 2-5% | 5-7% | 7%+ |
| B2B SaaS (self-serve) | 3-8% | 8-12% | 12%+ |
| Mobile apps | 1-3% | 3-5% | 5%+ |
| Games | 1-3% (of DAU) | 3-5% | 5%+ |

### 4. CAC/LTV Economics (Zero to One + Lean Startup)

The fundamental equation of sustainable growth: Lifetime Value must exceed Customer Acquisition Cost by enough margin to build a business.

**Key definitions:**

```
LTV = (Average Revenue Per User) x (Gross Margin) x (Average Lifespan in months)

CAC = (Total Sales + Marketing Spend) / (New Customers Acquired)

LTV:CAC ratio = LTV / CAC
```

**Benchmarks:**

| Metric | Unhealthy | Acceptable | Good | Great |
|--------|-----------|------------|------|-------|
| LTV:CAC | < 1:1 | 1-3:1 | 3-5:1 | > 5:1 |
| CAC payback | > 18 months | 12-18 months | 6-12 months | < 6 months |
| Gross margin | < 50% | 50-65% | 65-80% | > 80% |
| Net dollar retention | < 90% | 90-100% | 100-120% | > 120% |

**The distribution spectrum and CAC (Zero to One):**

| Distribution Channel | Typical CAC | Product Price Range |
|---------------------|-------------|-------------------|
| Viral / word-of-mouth | $0-5 | Free - $50/mo |
| Content marketing / SEO | $10-100 | $10-200/mo |
| Paid social / SEM | $50-500 | $20-500/mo |
| Inside sales (SDR + AE) | $500-5,000 | $200-5,000/mo |
| Field sales | $5,000-50,000 | $2,000-50,000/mo |
| Enterprise / complex sales | $50,000-500,000 | $50,000+/year |

**The dead zone revisited:** Products priced $500-5,000/year often struggle because they are too expensive for pure self-serve and too cheap to justify a sales team. If you land here, either move upmarket (add features, raise price) or go downmarket (simplify, reduce price).

### 5. Engines of Growth and Pricing (Lean Startup)

Your pricing model must align with your growth engine.

| Engine | Pricing Implication | Key Metric |
|--------|-------------------|------------|
| **Sticky** | Optimize for retention, not initial price | Monthly churn rate |
| **Viral** | Free or very cheap to maximize adoption; monetize later or via premium | Viral coefficient K |
| **Paid** | Price must support CAC with margin; LTV > 3x CAC | CAC payback period |

**Sticky engine pricing strategy:**
- Reduce friction to start (free trial, low initial price)
- Increase value over time (usage-based pricing that grows with customer)
- Make cancellation painful via invested data and workflows
- Offer annual plans at discount (reduces churn mechanically)

**Viral engine pricing strategy:**
- Free tier must be genuinely useful (not crippled)
- Paid features should be aspirational (social status or team features)
- Sharing mechanics must be in the free tier, not the paid tier
- Every shared artifact should carry your branding

**Paid engine pricing strategy:**
- Price must leave room for CAC + overhead + margin
- Test price points aggressively (most companies underprice)
- Optimize for LTV, not conversion rate
- Higher prices often improve conversion (signaling quality)

### 6. When to Monetize (Cold Start Problem + Modern Monopolies)

**For network-effect products, monetize too early and you kill the network. Monetize too late and you burn through cash.**

**Monetization readiness signals:**

| Signal | What It Means | Confidence |
|--------|--------------|------------|
| Retention is stable | Core value is proven | Strong signal |
| Users ask about paid features | Willingness to pay exists | Strong signal |
| Organic growth is positive | Network is self-sustaining | Medium signal |
| Usage is deep (high engagement) | Switching cost is building | Medium signal |
| Competitors are monetizing | Market expectations are set | Weak signal (do not follow blindly) |

**Monetization sequencing for platforms (Cold Start Problem):**

```
Phase 1: Subsidize (pay hard side to join)
    |
Phase 2: Free (let network grow without friction)
    |
Phase 3: Freemium (monetize power users, keep free tier)
    |
Phase 4: Transaction fee (tax the core transaction)
    |
Phase 5: Layered revenue (premium, ads, data, financial services)
```

**Rule of thumb:** You can start monetizing when your retention curve flattens (meaning you have found users who will stay). Monetize the retained users; keep acquisition friction-free.

### 7. Pricing Psychology

Rational pricing theory is useful. Human psychology is what actually determines purchase decisions.

**Pricing tactics that work:**

| Tactic | How It Works | Example |
|--------|-------------|---------|
| Anchoring | Show expensive option first | Enterprise tier at $999 makes Pro at $49 feel cheap |
| Decoy pricing | Middle option is designed to be ignored | 3 plans where middle is intentionally bad value |
| Charm pricing | $X9 or $X7 endings | $49 instead of $50 |
| Annual discount | 2 months free on annual | Reduces churn, improves cash flow |
| Price in value units | Per seat, per transaction, per API call | Aligns cost with value received |
| Remove dollar signs | In premium contexts | Reduces pain of paying |
| Grandfathering | Lock in early adopters at lower price | Builds loyalty, reduces churn at price increase |

**Pricing page design principles:**

1. Show 3 tiers (no more, no less for most products)
2. Highlight the recommended tier visually
3. Name tiers for the customer segment, not the features (Starter, Professional, Enterprise)
4. Show annual pricing by default with monthly as option
5. Include one feature in paid tier that free users actively want
6. Add social proof (logos, testimonials) near pricing

### 8. Raising Prices

Most startups underprice. Raising prices is one of the highest-leverage things you can do.

**When to raise prices:**

| Signal | Action |
|--------|--------|
| Churn is very low (< 2% monthly) | You can likely charge more |
| Customers say "this is cheap" or never negotiate | Double the price, test conversion |
| LTV:CAC is above 5:1 | You have pricing power to capture more value |
| You added significant features since last pricing | Repackage and reprice |
| New customer segment with higher willingness to pay | Create a premium tier |

**How to raise prices safely:**

1. Grandfather existing customers at current price (or give 6+ month notice)
2. Test new price on new customers only
3. Measure conversion rate and LTV at new price
4. If conversion drops < 20% and LTV increases > 20%, the raise worked
5. Communicate value, not cost: "We added X, Y, Z and are updating pricing to reflect this"

## Application Checklist

- [ ] Identify your monetization model (subscription, transaction fee, freemium, etc.)
- [ ] Calculate your current or projected LTV and CAC
- [ ] Verify LTV:CAC is at least 3:1 (or have a plan to get there)
- [ ] Calculate CAC payback period in months
- [ ] Determine which growth engine you are pursuing and align pricing
- [ ] If freemium: verify market is large enough and marginal cost is low enough
- [ ] Design 3-tier pricing page with clear recommended option
- [ ] If platform: defer monetization until retention curve flattens
- [ ] Set pricing based on value delivered, not cost to produce
- [ ] Test price points with real customers (not surveys)
- [ ] Set a 6-month reminder to evaluate whether you should raise prices
- [ ] Monitor net dollar retention monthly

## Anti-Patterns

**"Race to free"** — Defaulting to free because you are afraid to charge. Free is a strategy, not a default. If you cannot articulate why free acquires users that convert later, charge from day one.

**"Cost-plus pricing"** — Basing price on your server costs plus a margin. Customers do not care about your costs. They care about the value they receive. An AI tool that saves a lawyer 10 hours per week is worth far more than the GPU cost.

**"One price for everyone"** — Charging the same price to a solo freelancer and a Fortune 500 company. Segment your pricing by value received. The enterprise customer gets 100x the value and should pay 10-50x the price.

**"Monetizing the free side of a platform"** — Charging the easy-to-get side of a platform (e.g., charging readers on a content platform). The easy side should subsidize the hard side. Charge the side with higher willingness to pay and lower price sensitivity.

**"Competing on price"** — If your only advantage is being cheaper, you have no advantage. A competitor with better margins will undercut you. Compete on value, not on price.

**"Delaying pricing decisions"** — Saying you will figure out monetization later. Revenue is the ultimate validation. If people will not pay, you may not have product-market fit. At minimum, have a hypothesis for how and when you will charge.

**"Annual-only pricing"** — Forcing annual commitment before users trust the product. Offer monthly to reduce commitment anxiety, then incentivize annual with a genuine discount once they are retained.

**"Hidden fees"** — Surprising customers with costs they did not expect. Transaction fees, overage charges, and premium feature gates should be transparent before purchase. Trust lost to surprise charges is nearly impossible to rebuild.
