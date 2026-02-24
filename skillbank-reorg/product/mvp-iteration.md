---
name: mvp-iteration
description: Use when building, measuring, and iterating on a product — run tight BML loops with actionable metrics.
---

# MVP Iteration: Build-Measure-Learn Cycles and Rapid Iteration

## When to Use

- You have a validated hypothesis and need to build the first version
- You are iterating on an existing product and need a structured improvement process
- Your metrics are stagnant and you need to diagnose whether to iterate or pivot
- You need to choose between MVP approaches for a new feature
- You are designing your analytics stack and need to distinguish signal from noise

## Core Frameworks

### 1. The Build-Measure-Learn Loop (Lean Startup)

The fundamental unit of progress for a startup is learning, not code shipped.

```
        IDEAS
       /      \
      /        \
   BUILD      LEARN
      \        /
       \      /
       MEASURE
```

**The loop runs counterclockwise in planning, clockwise in execution:**

1. **Plan backwards:** Start with what you need to LEARN, determine what to MEASURE, then decide what to BUILD
2. **Execute forwards:** BUILD the minimum thing, MEASURE the result, LEARN whether your hypothesis holds

**Cycle time is everything.** The startup that learns fastest wins. Optimize for total loop speed, not build speed alone.

| Phase | Goal | Time Budget | Output |
|-------|------|-------------|--------|
| Build | Create minimum testable artifact | Days, not months | Working MVP or experiment |
| Measure | Collect data on user behavior | Defined in advance | Dashboard with key metrics |
| Learn | Validate or invalidate hypothesis | Honest post-mortem | Pivot, persevere, or next experiment |

### 2. MVP Selection Matrix (Lean Startup)

Each MVP type optimizes for different learning goals. Choose based on your current riskiest assumption.

**Pre-product MVPs (test demand before building):**

| MVP Type | When to Use | What You Learn | Effort |
|----------|-------------|----------------|--------|
| Landing page | Unknown demand | Conversion rate on value prop | 1 day |
| Explainer video | Complex product needs demo | Whether people understand and want it | 2-3 days |
| Crowdfunding | Need to prove willingness to pay | Pre-orders validate price point | 1-2 weeks |
| Ad campaign | Testing channels and messaging | CPA by channel and message variant | 1 week |

**Post-validation MVPs (test solution before scaling):**

| MVP Type | When to Use | What You Learn | Effort |
|----------|-------------|----------------|--------|
| Concierge | Need to understand workflow deeply | Exact steps users need | 1-2 weeks |
| Wizard of Oz | Need to test full experience | Whether the UX works end-to-end | 2-4 weeks |
| Piecemeal | Can assemble from existing tools | Whether the workflow has value | 1-2 weeks |
| Single-feature | Core value is one interaction | Whether the core loop retains | 2-4 weeks |

**The concierge-to-product pipeline:** Start by doing the thing manually for users (concierge). Document every step. Automate the most painful/frequent steps first. The concierge phase teaches you what to build better than any spec.

### 3. Metric Design: Vanity vs. Actionable (Lean Startup)

Most metrics that feel good are useless. Design metrics that drive decisions.

**Vanity metrics (avoid):**

- Total registered users (never decreases)
- Total revenue (hides per-customer trends)
- Page views (no behavioral insight)
- App downloads (says nothing about retention)
- Social media followers (no correlation to product value)

**Actionable metrics (use):**

| Metric Category | What to Track | Why It Matters |
|----------------|---------------|----------------|
| Activation | % of signups completing core action | Tests if users find value |
| Retention (cohorted) | % of Week 1 users active in Week 4 | Tests if value persists |
| Revenue per user | ARPU by cohort over time | Tests if willingness to pay grows |
| Referral rate | % of users who invite others | Tests organic growth potential |
| Task completion | % who finish the core workflow | Tests if product actually works |

**Three rules for good metrics:**

1. **Actionable:** You can trace cause and effect. "We changed X, metric Y moved."
2. **Accessible:** Everyone on the team understands what it means without explanation.
3. **Auditable:** You can verify it from raw data, not a black-box dashboard.

### 4. Cohort Analysis (Lean Startup)

Aggregates lie. Cohorts tell the truth.

**What a cohort is:** A group of users who share a common characteristic over a defined time period (usually signup date).

**How to read a cohort table:**

```
Cohort     Week 0    Week 1    Week 2    Week 4    Week 8
Jan W1     100%      42%       28%       18%       12%
Jan W2     100%      45%       31%       22%       15%
Jan W3     100%      48%       35%       25%       19%
Feb W1     100%      52%       38%       28%       --
```

**What to look for:**

- **Improving cohorts:** Later cohorts retain better = product is improving
- **Flat cohorts:** Retention is not changing = iteration is not working
- **Degrading cohorts:** Later cohorts retain worse = something is breaking (often quality at scale)
- **The smile curve:** Retention dips then recovers = users who stay become power users

### 5. Do Things That Don't Scale (Founders at Work)

In early stages, unscalable tactics teach you more and grow faster than automated systems.

**Patterns from successful founders:**

- **Manual onboarding:** Stripe founders installed the SDK on users' laptops in person ("Collison installation")
- **Hand-recruit users:** Airbnb went door to door photographing apartments
- **Personally deliver:** DoorDash founders delivered food themselves for months
- **White-glove support:** Answer every support ticket personally; the patterns reveal product gaps
- **Curate everything:** Reddit founders created hundreds of fake accounts to seed content

**Why it works:** You develop empathy for user problems, discover edge cases, build relationships, and learn what to automate. The things that don't scale become the spec for what to build.

**When to stop:** When you physically cannot handle the volume and have clear patterns to automate.

### 6. Engines of Growth (Lean Startup)

Every product grows through one of three engines. Know yours and optimize for it.

| Engine | How It Works | Key Metric | Example |
|--------|-------------|------------|---------|
| **Sticky** | High retention, low churn | Churn rate | Salesforce, Slack |
| **Viral** | Users bring other users | Viral coefficient (K) | WhatsApp, Dropbox |
| **Paid** | Revenue funds acquisition | CAC < LTV (with margin) | Blue Apron, Dollar Shave Club |

**Sticky engine mechanics:**
- Growth = new user rate - churn rate
- Focus on retention above all
- Rule of thumb: if monthly churn > 5%, fix retention before acquiring

**Viral engine mechanics:**
- Viral coefficient K = (invites per user) x (conversion per invite)
- K > 1 = exponential growth; K < 1 = viral boost but not self-sustaining
- Even K = 0.5 halves your acquisition cost

**Paid engine mechanics:**
- Sustainable when LTV > CAC (aim for LTV > 3x CAC)
- Payback period matters: how many months to recoup CAC?
- Scale by finding new channels, not by overspending existing ones

**Critical insight:** Most startups should focus on ONE engine. Trying to optimize all three simultaneously dilutes effort and muddies measurement.

### 7. The Pivot Decision Framework (Lean Startup)

A pivot is not a failure; it is a validated learning that your hypothesis was wrong.

**Data-driven pivot triggers:**

| Signal | Diagnosis | Likely Pivot |
|--------|-----------|-------------|
| Users sign up but never activate | Value prop clear, product confusing | UX overhaul or feature simplification |
| Users activate but do not retain | Initial value but no ongoing need | Different problem or customer segment |
| Users retain but will not pay | Value exists but not worth money | Different segment or monetization model |
| Users pay but you cannot acquire cheaply | Product works, distribution broken | Channel pivot |
| Nothing is working | Fundamental assumption is wrong | Zoom-out, customer segment, or full restart |

**The pivot meeting protocol:**

1. Schedule it in advance (every 6-8 weeks)
2. Present: cohort data, engine metrics, qualitative feedback
3. Ask: "Is there evidence our hypothesis is correct?"
4. Three outcomes: persevere (evidence supports), pivot (evidence contradicts), need more data (experiment was flawed)
5. If pivoting: articulate the new hypothesis before changing anything

### 8. Launch Before Ready (Founders at Work)

**"If you are not embarrassed by the first version of your product, you have launched too late."**

Practical guidelines for launch readiness:

- Core transaction works end to end (even if ugly)
- One thing is excellent; everything else can be mediocre
- You can onboard a user in under 60 seconds
- You have instrumented the key metric
- You have a way to talk to users (support channel, feedback form)
- You do NOT need: perfect design, all features, scalable infrastructure, mobile app

## Application Checklist

- [ ] Identify the single thing you need to learn next
- [ ] Design the metric that will prove or disprove it
- [ ] Choose the minimum MVP type to generate that metric
- [ ] Set cycle time target (aim for 1-2 week loops)
- [ ] Instrument actionable metrics (not vanity metrics)
- [ ] Build cohort tracking from day one
- [ ] Identify which engine of growth you are pursuing
- [ ] Establish baseline metric before making changes
- [ ] Schedule pivot/persevere review at fixed intervals
- [ ] Document learnings from every cycle (build institutional knowledge)
- [ ] Launch before you feel ready

## Anti-Patterns

**"Shipping is learning"** — Releasing features is not the same as validated learning. If you shipped but did not measure, you built but did not learn. Cycle is incomplete.

**"Vanity metric addiction"** — Total users going up while retention is flat. You are filling a leaky bucket. Fix the bucket.

**"Analysis paralysis"** — Refusing to launch because data is insufficient. At some point you must test in the real world. Interviews are not a substitute for live product data.

**"Premature optimization"** — Spending weeks on infrastructure, design systems, or scalability before you have 100 users. Optimize for learning speed, not engineering elegance.

**"Feature factory"** — Shipping feature after feature without measuring impact. If you do not know which features drive your key metric, you are guessing.

**"Pivoting without learning"** — Changing direction every two weeks without extracting the lesson from the current direction. A pivot requires a validated insight, not boredom.

**"One engine to rule them all"** — Trying sticky + viral + paid simultaneously. Pick one, prove it works, then layer in others. Measurement becomes impossible when you cannot isolate variables.

**"Ignoring qualitative data"** — Metrics tell you what is happening; conversations tell you why. The best iteration cycles combine both. Never stop talking to users.
