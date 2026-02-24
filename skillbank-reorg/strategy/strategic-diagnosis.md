---
name: strategic-diagnosis
description: Use when you need to name the real problem before jumping to solutions -- the critical first step most strategies skip.
---

# Strategic Diagnosis

## When to Use

- You have a strategy document that feels like a list of goals rather than a plan
- Teams are executing hard but results are not improving
- There is disagreement about what the problem actually is
- You are about to invest significant resources and want to make sure you are solving the right thing
- A previous strategy failed and you need to understand why before trying again

## Core Frameworks

### 1. Diagnosis as the First Step (Rumelt)

Rumelt's central argument: the first and most important step of strategy is diagnosis -- naming the challenge in plain language. Most organizations skip this entirely. They jump from "things are not going well" to a list of initiatives.

**What diagnosis looks like:**

Bad: "We need to grow faster."
Good: "Our growth has stalled because our product serves early adopters well but has three friction points that prevent mainstream adoption."

Bad: "We need to improve our culture."
Good: "We have a coordination problem: teams optimize locally because there is no shared understanding of company priorities, and the incentive structure rewards department metrics over company outcomes."

Bad: "We need to be more innovative."
Good: "Our development cycle takes 9 months from idea to customer, which means we cannot iterate fast enough to find product-market fit in new segments."

**The test for a good diagnosis:**
1. It names a specific challenge, not a vague aspiration
2. It simplifies reality enough to act on it without oversimplifying to the point of uselessness
3. Different people reading it would develop roughly similar guiding policies
4. It makes clear what is hard about the situation -- what makes it a genuine challenge rather than a simple task

### 2. Symptoms vs. Causes

Most of what people call "problems" are actually symptoms. Treating symptoms guarantees the problem recurs.

**The symptom-cause ladder:**

```
VISIBLE SYMPTOMS (what you see)
  Revenue declining, churn increasing, team morale low, missed deadlines
        |
PROXIMATE CAUSES (what directly produces the symptoms)
  Key feature lags competitors, onboarding is confusing, managers are burned out
        |
STRUCTURAL CAUSES (what produces the proximate causes)
  Engineering resources split across too many initiatives, no user research
  process, promotion criteria reward individual heroics over team outcomes
        |
MENTAL MODELS (what produces the structural causes)
  "We need to be in every market," "user research is slow and expensive,"
  "the best people do not need help"
```

**The discipline:** Push at least two levels deeper than the presenting symptom before designing a response. The Five Whys technique (from Toyota and popularized in Lean) is the simplest tool:

1. Why is revenue declining? Because churn increased.
2. Why did churn increase? Because customers are frustrated with reliability.
3. Why is reliability poor? Because we ship features faster than we fix bugs.
4. Why do we ship features faster than we fix bugs? Because the roadmap is driven by sales commitments, not product quality metrics.
5. Why is the roadmap driven by sales commitments? Because the planning process gives sales veto power over engineering priorities.

The answer to "why" number 5 is the structural cause. That is what your strategy needs to address. Fixing reliability without changing the planning process will produce temporary improvement followed by regression.

### 3. Testing for Real Strategy vs. Goals

Many organizations have a "strategy" that is actually a collection of goals dressed up in strategic language. Rumelt provides clear tests:

**It is a goal, not a strategy, if:**
- It does not name an obstacle or challenge
- It works in any environment (up market, down market, competitive, uncompetitive)
- Removing it would not change what anyone does day-to-day
- It could apply to any company in your industry
- It uses words like "maximize," "optimize," "leverage," or "drive" without specifying how

**It is a real strategy if:**
- It names a specific challenge that, if overcome, would produce disproportionate results
- It chooses an approach that trades off one thing for another
- It would be wrong for some companies (strategy that is right for everyone is not strategy)
- People can tell you what it means they should stop doing
- The coherent actions follow logically from the diagnosis and guiding policy

**The "So What?" test:** Read each line of your strategy document and ask "So what? What does this mean we do differently tomorrow?" If the answer is nothing, delete that line.

### 4. Proximate Objectives (Rumelt)

Once you have a diagnosis, the next step is not a grand plan. It is a proximate objective -- something achievable that creates a stepping stone.

**Properties of good proximate objectives:**
- Feasible with current resources and capabilities
- Within the organization's span of control
- Success is verifiable (you can tell if you achieved it)
- Achieving it changes the competitive landscape or builds a new capability
- It focuses energy rather than dispersing it

**Example chain:**

Diagnosis: "Our product is strong for power users but has a steep learning curve that prevents mainstream adoption."

Bad next step: "Become the easiest-to-use product in our category." (Too far, too vague)

Good proximate objective: "Reduce time-to-first-value from 45 minutes to under 5 minutes for the three most common use cases, measured by user testing, within 90 days."

This is specific, measurable, feasible, and achieving it changes the growth dynamic. It is a stepping stone, not the whole journey.

### 5. The Crux (Rumelt)

Rumelt's concept of the crux: every strategic situation has one or two critical difficulties that, if resolved, would unlock everything else. Finding the crux is the highest-value diagnostic activity.

**How to find the crux:**
1. List all the challenges and obstacles you face (exhaustive, messy, no filtering)
2. For each one, ask: "If this were solved, would the others become easier?"
3. The challenge that unlocks the most other challenges is your crux
4. If nothing unlocks the others, you may have independent problems (rare -- usually they are connected)

**Example:**
A startup lists its challenges: hard to hire, slow growth, high churn, insufficient funding, product gaps.

Testing for crux:
- If hiring were solved, could we fix the product gaps? Yes, probably.
- If growth were solved, would hiring become easier? Yes, strong growth attracts talent.
- If churn were solved, would growth improve? Yes, retention drives compounding growth.
- If churn were solved, would funding become easier? Yes, better metrics attract investors.

The crux is churn. Everything else cascades from solving retention.

### 6. Diagnosis Workshop Format

A structured process for a team to diagnose a strategic challenge:

**Part 1: Diverge (45 min)**
- Each person independently writes answers to:
  - What is the challenge we face? (in plain language, one paragraph)
  - What makes it hard? (specific obstacles, not general difficulties)
  - What have we tried that has not worked? Why?
- Share all diagnoses. No debate yet -- just listen.

**Part 2: Converge (30 min)**
- Group similar diagnoses
- Identify the symptom-vs-cause level of each
- Push deeper: for each diagnosis, ask "But why is that the case?"
- Vote on which diagnosis is most useful (not most popular -- most useful for guiding action)

**Part 3: Test (30 min)**
- Apply Rumelt's tests: Does this diagnosis name a specific challenge? Does it simplify usefully? Would it lead different people to similar policies?
- Apply the "So What?" test: What does this mean we should do? What should we stop doing?
- Identify the crux: Which challenge, if solved, unlocks the most others?

**Part 4: State the Kernel (15 min)**
- Write the full strategy kernel:
  - Diagnosis (one paragraph)
  - Guiding policy (one sentence)
  - Coherent actions (3-5 specific, reinforcing steps)

### 7. The Meadows Root Cause Test

Donella Meadows offers a systems-level check on your diagnosis: if you fix this cause, does the system behavior change? Or does the system find another way to produce the same symptom?

**Structural test:** Draw the feedback loop that produces the symptom. Does your proposed cause sit on that loop? If you remove or change it, does the loop break or fundamentally change?

**If the loop stays intact after your fix, you are treating a symptom.** The system will route around your intervention and the problem will return.

Example: You diagnose "slow shipping" and hire more engineers. But the loop is: unclear priorities lead to too many projects lead to context switching leads to slow shipping. Adding engineers adds more context switching. The loop is intact. The structural cause is prioritization, not headcount.

## Application Checklist

- [ ] Write the challenge in plain language in one paragraph -- no jargon, no buzzwords
- [ ] Push below symptoms: apply Five Whys at least three levels deep
- [ ] Identify the structural cause, not just the proximate cause
- [ ] Find the crux: which single challenge, if solved, unlocks the most others?
- [ ] Test against Rumelt's bad strategy hallmarks (fluff, avoiding the challenge, goals as strategy, laundry list)
- [ ] Apply the "So What?" test to every line of your strategy
- [ ] Define one proximate objective that is feasible, verifiable, and focusing
- [ ] Run the Meadows structural test: does fixing this cause actually break the loop?
- [ ] State the full kernel: diagnosis, guiding policy, coherent actions
- [ ] Check: would this strategy be wrong for some companies? (If it is right for everyone, it is not a strategy)

## Anti-Patterns

**Solution-First Thinking** -- Jumping to "we need AI" or "we need to hire a VP of Sales" before naming the actual problem. Solutions are cheap. Correct diagnosis is expensive and rare. The intervention only works if the diagnosis is right.

**Diagnosing at the Wrong Level** -- Spending weeks analyzing surface metrics (conversion rates, NPS scores) without asking what structural dynamics produce those metrics. The numbers are symptoms. The structure is the cause.

**The Comfortable Diagnosis** -- Naming a challenge that does not implicate anyone in the room. "The market is tough" is comfortable. "Our product decisions are driven by the loudest internal voice rather than user data" is uncomfortable. The uncomfortable diagnosis is usually the accurate one.

**Diagnosis by Analogy** -- "Uber for X" or "We are like Slack but for Y." Analogies are useful for communication but dangerous for diagnosis. Your situation has specific constraints that the analogy obscures. Diagnose your actual challenge, not the one that makes a clean narrative.

**Premature Precision** -- Spending months on quantitative analysis before the qualitative diagnosis is clear. You do not need a regression model to know your product is confusing. Start with the plainest possible statement of the challenge, then add rigor where it changes the conclusion.

**The Annual Strategy Ritual** -- Treating diagnosis as a once-a-year activity. The challenge changes. The crux shifts. Diagnosis should be a continuous practice, not a calendar event.
