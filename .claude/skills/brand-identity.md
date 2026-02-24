---
name: brand-identity
description: Create complete brand identities including SVG logo concepts, color systems, typography specs, HTML brand boards, AI image prompts, and brand guidelines. Use when the user asks to create a brand, logo, visual identity, brand board, color palette, or brand guidelines.
---

## What You Can Produce

Claude Code cannot generate raster images. Instead, produce these concrete deliverables:

1. **SVG logo concepts** — vector code for logomarks, wordmarks, and monograms
2. **Color systems** — CSS custom properties, Tailwind config, JSON tokens
3. **Typography specs** — Google Font selections with Next.js/HTML loading code
4. **HTML brand board** — single self-contained `.html` file showcasing the full identity
5. **AI prompt kit** — structured prompts for Recraft, DALL-E, Midjourney, Nano Banana
6. **Brand guidelines** — comprehensive `.md` document as the source of truth

---

## Before Starting

Gather these inputs before producing anything. Ask the user directly if not provided:

1. **Brand name** (or request naming help — see Phase 2)
2. **What the brand does** — one sentence
3. **Target audience** — who specifically
4. **Brand attributes** — 3 adjectives that describe the desired personality (e.g., bold, minimal, playful)
5. **Existing assets** — any colors, fonts, logos, or style references already in play
6. **Scope** — which phases they need (default: all 6)
7. **Competitors** — 2-3 names to differentiate from

Use the Phase Compression table at the bottom to skip phases the user doesn't need.

---

## The Process

### Phase 1: Brand Strategy

Before any visual work, establish the strategic foundation.

**Deliverable:** Brand strategy brief (markdown section or standalone `.md`)

1. **Audience portrait** — Demographics, psychographics, what they value, where they spend time
2. **Competitive positioning** — How this brand occupies different territory from the 2-3 named competitors
3. **Brand attributes** — Exactly 3 adjectives. Confirm with user. These drive every visual decision.
4. **Brand essence** — One sentence that captures what the brand stands for (not a tagline — an internal compass)
5. **Tone of voice** — 2-3 sentences describing how the brand speaks

Do NOT proceed to visuals until the user confirms the strategy.

---

### Phase 2: Naming (if needed)

Skip this phase entirely if the user already has a name.

**Process:**
1. Generate 15-20 name candidates across 4 categories:
   - **Descriptive** — says what it does (e.g., Dropbox, Salesforce)
   - **Abstract** — invented words with phonetic appeal (e.g., Kodak, Spotify)
   - **Metaphorical** — borrows meaning from another domain (e.g., Amazon, Apple)
   - **Compound** — combines two words (e.g., YouTube, Snapchat)
2. Filter each against: domain availability likelihood, trademark conflict risk, global pronunciation, brevity (≤3 syllables preferred)
3. Present the top 5 with rationale for each
4. User picks one before moving on

---

### Phase 3: Visual Identity

Three sub-deliverables: color palette, typography, logo concepts.

#### 3A: Color Palette

Generate a complete color system with 5-7 colors:

- **Primary** — the signature brand color (1 color)
- **Secondary** — complementary accent (1-2 colors)
- **Neutral** — backgrounds, text, borders (2-3 colors)
- **Semantic** — success, warning, error (use sensible defaults unless brand-specific)

**Output in three formats:**

```css
/* CSS Custom Properties */
:root {
  --color-primary: #HEXVAL;
  --color-primary-light: #HEXVAL;
  --color-secondary: #HEXVAL;
  --color-bg: #HEXVAL;
  --color-surface: #HEXVAL;
  --color-text: #HEXVAL;
  --color-text-muted: #HEXVAL;
}
```

```js
// tailwind.config.js extend.colors
brand: {
  primary: '#HEXVAL',
  'primary-light': '#HEXVAL',
  secondary: '#HEXVAL',
  bg: '#HEXVAL',
  surface: '#HEXVAL',
  text: '#HEXVAL',
  'text-muted': '#HEXVAL',
}
```

```json
{
  "colors": {
    "primary": { "value": "#HEXVAL", "usage": "Buttons, links, key accents" },
    "secondary": { "value": "#HEXVAL", "usage": "Supporting accents, hover states" }
  }
}
```

**Color selection rules:**
- Ensure WCAG AA contrast (4.5:1) for all text/background combinations
- Test the palette in grayscale — hierarchy should still be readable
- Primary color must work on both light and dark backgrounds (provide both variants)
- Reference coolors.co for palette generation inspiration

#### 3B: Typography

Select exactly 2 Google Fonts:
- **Display/heading font** — for headlines, hero text, the logo wordmark
- **Body font** — for paragraphs, UI text, captions

Provide loading code:

```html
<!-- HTML -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DISPLAY_FONT:wght@400;600;700&family=BODY_FONT:wght@400;500;600&display=swap" rel="stylesheet">
```

```tsx
// Next.js app/layout.tsx
import { Display_Font, Body_Font } from 'next/font/google'

const displayFont = Display_Font({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
})

const bodyFont = Body_Font({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})
```

**Typography rules:**
- Heading and body fonts must have clear contrast in personality
- Both must support at least weights 400, 600, 700
- Test legibility at 14px (body minimum) and 48px+ (hero display)
- Specify the type scale: hero, h1, h2, h3, body, small, caption with px/rem values

#### 3C: Logo Concepts

Produce 3 SVG logo concepts, each a different approach:
1. **Logomark** — abstract symbol or icon, no text
2. **Wordmark** — the brand name styled typographically
3. **Combination mark** — symbol + text together

Each SVG must be clean, production-ready code:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <!-- Logo geometry here -->
</svg>
```

**The 4 Golden Rules — every logo concept MUST pass all 4:**

| Rule | Test | Fail condition |
|------|------|---------------|
| **Simplicity** | Can you describe it in one sentence? Could you sketch it from memory in 10 seconds? | Too many elements, gradients, or fine details |
| **Versatility** | Does it work at 16×16 favicon AND 1000×1000 billboard? In monochrome? Reversed on dark? | Relies on color to be understood, details lost at small sizes |
| **Memorability** | After seeing it once, could someone pick it out of 20 logos? | Generic, looks like stock, no distinctive hook |
| **Scalability** | Does it hold up when scaled from 16px to 10ft? | Thin strokes disappear, complex shapes merge at small sizes |

For each concept, include a brief rationale explaining which brand attributes it expresses and how.

**Logo SVG rules:**
- Use `currentColor` or the brand primary — never hardcode arbitrary colors
- Keep path count under 10 for simplicity
- Include a monochrome variant (single color, works on any background)
- Provide favicon-ready versions (simplify to work at 32×32)

---

### Phase 4: Brand Board

Create a single self-contained `.html` file that showcases the complete identity on one page.

**Structure:**
- Brand name + tagline at top
- Logo variations (all 3 concepts, light and dark backgrounds)
- Color palette swatches with hex values and names
- Typography showcase (heading + body samples at multiple sizes)
- Tone of voice examples (3 short copy samples in the brand voice)
- Photography/illustration direction (described, with AI prompts)

**Technical requirements:**
- Self-contained: inline all CSS, embed SVGs directly, use Google Fonts CDN link
- Responsive: readable on desktop and mobile
- Print-friendly: should look clean when printed or saved as PDF
- Dark background by default (professional presentation feel)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Brand Name] — Brand Board</title>
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
  <style>
    /* All styles inline */
  </style>
</head>
<body>
  <!-- Brand board sections -->
</body>
</html>
```

---

### Phase 5: AI Prompt Kit

Generate copy-paste-ready prompts for external AI image tools. Cover 4 use cases:

#### Logo refinement (for Recraft)
```
Create a [logomark/wordmark] for [brand name], a [what it does].
Style: [minimal/geometric/organic]. Mood: [brand attributes].
Colors: [primary hex], [secondary hex] on [background hex].
The mark should convey [brand essence in 5 words].
Simple enough to work as a favicon. No gradients, no text effects.
```

#### Brand illustrations (for DALL-E / Midjourney)
```
[Illustration style] illustration for [brand name], a [what it does].
Subject: [specific scene or concept].
Color palette: [list hex values]. Style: [flat/isometric/hand-drawn/3D].
Mood: [brand attributes]. Background: [color or transparent].
No text, no logos, no watermarks.
```

#### Social media assets (for Recraft / Nano Banana)
```
Social media [post/story/banner] template for [brand name].
Dimensions: [1080x1080 / 1080x1920 / 1200x630].
Include space for: headline, subtext, CTA button.
Colors: [palette]. Font style: [display font personality].
Mood: [brand attributes]. Clean, modern, minimal.
```

#### Product mockups (for Midjourney)
```
Photorealistic mockup of [product type] featuring [brand name] branding.
Logo placement: [location]. Color scheme: [palette].
Setting: [environment description]. Lighting: [soft studio / natural / dramatic].
Professional product photography style. 8k, detailed.
```

For each prompt, provide both a template and one filled-in example using the actual brand details.

---

### Phase 6: Brand Guidelines

Create a comprehensive `.md` file that serves as the brand's source of truth.

**Required sections:**

```markdown
# [Brand Name] Brand Guidelines

## 1. Brand Strategy
- Mission
- Vision
- Brand essence
- Brand attributes (the 3 adjectives)
- Tone of voice

## 2. Logo
- Primary logo (SVG embed or file reference)
- Logo variations (logomark, wordmark, combination)
- Clear space rules (minimum padding = logo height × 0.5)
- Minimum size (never below 32px height for digital, 12mm for print)
- Incorrect usage (list 5+ don'ts: stretch, recolor, add effects, rotate, crop)

## 3. Color
- Primary palette (hex, RGB, HSL for each)
- Extended palette
- Accessible combinations (which text colors on which backgrounds)
- Color don'ts

## 4. Typography
- Primary typeface (display)
- Secondary typeface (body)
- Type scale with sizes
- Font loading instructions
- Fallback stack

## 5. Imagery
- Photography direction
- Illustration style
- Icon style
- AI prompt templates for generating on-brand imagery

## 6. Applications
- Social media profile/cover dimensions and templates
- Email signature format
- Business card layout description
- Favicon specifications
```

---

## Anti-Patterns

1. **Do NOT generate raster images** — Claude Code cannot produce PNGs/JPGs. SVG and HTML only for visuals.
2. **Do NOT skip the strategy phase** — jumping straight to colors/logos without brand attributes produces generic work.
3. **Do NOT use more than 7 colors** in the core palette. Restraint is the point.
4. **Do NOT select trendy fonts** that will date the brand in 2 years. Prefer proven typefaces with large weight ranges.
5. **Do NOT create complex SVG logos** with gradients, shadows, or more than 10 paths. Simplicity is a golden rule.
6. **Do NOT present logo concepts without testing** against all 4 golden rules. State the test results explicitly.
7. **Do NOT hardcode pixel values** in the brand board HTML. Use rem/em and relative units for responsiveness.
8. **Do NOT write AI prompts that mention copyrighted styles** — never reference specific artists by name. Describe the aesthetic, not the artist.

---

## Quality Checklist

Before presenting deliverables, verify:

**Logo:**
- [ ] Passes all 4 golden rules (simplicity, versatility, memorability, scalability)
- [ ] Works in monochrome
- [ ] Readable at 32×32 (favicon test)
- [ ] SVG is clean (no unnecessary groups, transforms, or IDs)

**Color:**
- [ ] WCAG AA contrast ratios for all text/background pairs
- [ ] Palette works in grayscale
- [ ] Primary works on both light and dark backgrounds

**Typography:**
- [ ] Both fonts load from Google Fonts
- [ ] Next.js loading code compiles
- [ ] Type scale is specified with exact sizes

**Deliverables:**
- [ ] Brand board HTML is self-contained (no external deps except Google Fonts)
- [ ] AI prompts are copy-paste ready with no placeholders left unfilled
- [ ] Brand guidelines cover all 6 required sections

---

## Phase Compression

Not every request needs all 6 phases. Match the user's ask:

| User Request | Phases to Run |
|---|---|
| "Create a brand identity" | All 6 |
| "Design a logo" | 1 (light) → 3C only |
| "Build a color palette" | 1 (light) → 3A only |
| "Make a brand board" | 1 (light) → 3A + 3B + 3C → 4 |
| "I need brand guidelines" | 1 → 3A + 3B + 3C → 6 |
| "Help me name my brand" | 1 → 2 |
| "Generate AI prompts for my brand" | Gather existing brand info → 5 |
| "Full brand identity with guidelines" | All 6 |

For compressed flows, still gather the minimum inputs from "Before Starting" — at least brand name, what it does, and 3 brand attributes.

---

## Related Skills

- **canvas-design** — for expressing the brand identity as visual art (posters, print pieces)
- **visual-design** — for applying the brand to web page designs
- **copywriting** — for writing on-brand marketing copy using the tone of voice
- **animejs-design** — for animated brand experiences and logo animations
