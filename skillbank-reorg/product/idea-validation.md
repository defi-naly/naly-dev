---
name: idea-validation
description: Use when evaluating a new product idea — find contrarian truths, test assumptions, and validate before building.
---

# Idea Validation: From Contrarian Truth to Validated Hypothesis

## When to Use

- You have a product idea and need to stress-test it before committing resources
- You are searching for ideas and want a structured discovery process
- You need to decide between multiple opportunities
- You want to validate demand before writing code
- You are preparing to pitch and need to articulate why this idea is non-obvious

## Core Frameworks

### 1. The Contrarian Truth Test (Zero to One)

Every great company starts with a secret — something true that most people disagree with.

**The question:** "What important truth do very few people agree with you on?"

Reframed for products: "What valuable company is nobody building?"

| Signal | What It Means | Example |
|--------|--------------|---------|
| Experts dismiss it | Conventional wisdom has calcified | Airbnb: "strangers won't stay in homes" |
| Incumbents ignore it | Too small or threatens their model | Stripe: "payments API is a developer problem" |
| Users have workarounds | Demand exists but no product serves it | Dropbox: people emailing files to themselves |
| Regulation blocks it | Legal friction hides real demand | Uber: taxi medallion system masked rider demand |
| Technology just enabled it | New capability unlocks new possibility | OpenAI API: enables products impossible 2 years ago |

**Secret discovery process:**

1. Pick a field you know deeply (domain secrets beat technology secrets)
2. Ask: What do insiders know that outsiders don't?
3. Ask: What do people do with duct tape and workarounds?
4. Ask: What convention does everyone follow without questioning?
5. Ask: What has technology recently made possible that was not before?

### 2. The Monopoly Test (Zero to One)

A valid idea must have a path to monopoly in a small market. If you cannot dominate a niche, the idea fails.

**Four monopoly characteristics to evaluate:**

| Characteristic | Question | Red Flag |
|---------------|----------|----------|
| Proprietary technology | Is your solution 10x better on a key dimension? | Incremental improvement over existing |
| Network effects | Does each user make the product more valuable? | Value is the same with 10 or 10M users |
| Economies of scale | Do your unit economics improve with growth? | Costs scale linearly with users |
| Branding | Can you own a category in users' minds? | You describe yourself as "X but for Y" |

**Start small, monopolize, expand.** Define the smallest market you can dominate (not the TAM fantasy). PayPal started with eBay power sellers. Facebook started with Harvard.

### 3. Hypothesis Framing (Lean Startup)

Convert your idea into falsifiable hypotheses before building anything.

**Two critical hypotheses:**

1. **Value hypothesis:** Do customers find this valuable enough to use/pay?
2. **Growth hypothesis:** How will new customers discover this product?

**Structure each hypothesis:**

```
We believe [target customer]
has a problem with [specific pain]
and would [measurable behavior]
if we provided [proposed solution].

We will know this is true when [metric] reaches [threshold] within [timeframe].
```

**Identify the riskiest assumption:** The single belief that, if wrong, kills everything. Test this first.

| Assumption Type | Example | Test Method |
|----------------|---------|-------------|
| Problem exists | "Freelancers struggle with invoicing" | Customer interviews (20+) |
| Solution works | "AI-generated invoices save time" | Concierge MVP |
| Willingness to pay | "They would pay $20/mo" | Landing page with pricing |
| Can reach them | "We can acquire via SEO" | Content experiment |
| They will switch | "They will leave QuickBooks" | Switching cost analysis |

### 4. MVP Selection (Lean Startup)

The MVP is the smallest experiment that tests your riskiest assumption. It is NOT a half-built product.

**MVP types ranked by effort:**

| MVP Type | Effort | Best For | Example |
|----------|--------|----------|---------|
| Smoke test / landing page | Hours | Testing demand | Buffer pricing page before product existed |
| Explainer video | Days | Testing comprehension | Dropbox demo video (75K signups overnight) |
| Concierge | Days | Testing value manually | Food on the Table: founder grocery-shopped for users |
| Wizard of Oz | Weeks | Testing experience with human backend | Zappos: shoe photos, bought from store on each order |
| Single-feature | Weeks | Testing core interaction | Craigslist: just a mailing list |
| Piecemeal | Weeks | Testing workflow with existing tools | Groupon: WordPress blog + PDF emails |

**Selection rule:** Choose the MVP that tests your riskiest assumption with the least effort.

### 5. Start With the Problem, Not the Idea (Founders at Work)

Across dozens of successful founders, the pattern repeats: they stumbled into the idea by deeply understanding a problem, often their own.

**Discovery patterns from successful founders:**

- **Scratch your own itch:** Build what you personally need (37signals / Basecamp)
- **Watch what people do, not what they say:** Observe workarounds in the wild
- **Ideas change:** The first idea is usually wrong. PayPal started as PalmPilot cryptography. Flickr was a game. Slack was a game company internal tool.
- **Talk to users before building:** Not surveys. Conversations. "Tell me about the last time you..."

**The Mom Test (embedded):** Never ask "Would you use this?" Instead ask:

- "How do you currently handle [problem]?"
- "What is the hardest part of [workflow]?"
- "When is the last time that happened? Walk me through it."
- "What have you tried? Why did it not work?"
- "If you had a magic wand, what would you change?"

### 6. When to Pivot (Lean Startup + Founders at Work)

A pivot is a structured course correction, not failure. Most successful companies pivoted at least once.

**Pivot signals:**

- Metrics plateau despite iteration
- Users like a feature but not the product
- You keep explaining why the metrics will improve "next month"
- Customer acquisition cost refuses to come down
- You dread talking to users

**Pivot types:**

| Pivot | What Changes | Example |
|-------|-------------|---------|
| Zoom-in | A feature becomes the product | Flickr (game feature became photo app) |
| Zoom-out | Product becomes a feature of something larger | Instagram (Burbn stripped to photos only) |
| Customer segment | Same product, different users | Stitch Fix (broad retail to working women) |
| Customer need | Same users, different problem | Wealthfront (game to financial advisor) |
| Channel | Different distribution method | Warby Parker (online-first added retail stores) |
| Technology | Same solution, different tech | Netflix (DVD mail to streaming) |
| Value capture | Different monetization | Slack (game revenue to enterprise SaaS) |
| Platform | Application becomes platform | Salesforce (CRM app to platform ecosystem) |

**Pivot or persevere meeting:** Schedule regular (6-8 week) decision points. Bring data, not feelings. Ask: "Are we making sufficient progress to believe our original hypothesis?"

## Application Checklist

- [ ] Articulate your contrarian truth in one sentence
- [ ] Identify whether your secret is a nature secret (world) or people secret (behavior)
- [ ] Define the smallest market you can monopolize first
- [ ] Check: Is your solution 10x better on at least one dimension?
- [ ] Write your value hypothesis with falsifiable metric
- [ ] Write your growth hypothesis with falsifiable metric
- [ ] Identify the single riskiest assumption
- [ ] Select MVP type that tests riskiest assumption with least effort
- [ ] Conduct 20+ problem interviews (not solution pitches)
- [ ] Define pivot/persevere criteria before you start building
- [ ] Set a review date (6-8 weeks out) to evaluate progress

## Anti-Patterns

**"Solution in search of a problem"** — Building technology because it is interesting, then hunting for use cases. The graveyard is full of elegant solutions nobody needed.

**"TAM fantasy"** — Claiming a $50B market. Investors and reality care about the serviceable obtainable market you can dominate in year one. Start with 100 users who desperately need you.

**"Stealth mode"** — Hiding from potential customers to protect your idea. Ideas are cheap; execution is everything. Stealth mode is procrastination disguised as strategy.

**"Survey validation"** — Sending a Google Form asking "Would you pay for X?" People lie on surveys. They do not lie with their wallets or their time. Test behavior, not opinions.

**"Building the full vision"** — Spending 12 months building v1.0 before showing anyone. The first version should embarrass you. If it does not, you launched too late.

**"Ignoring pivot signals"** — Founders at Work is full of cases where persistence paid off, but the founders who succeeded persisted on the problem, not the solution. Know the difference between grit and stubbornness.

**"Consensus ideas"** — If everyone agrees it is a good idea, it is probably too late or too competitive. The best ideas sound bad initially. Consensus means no secret.
