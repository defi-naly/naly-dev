# naly.dev

> Decoding the economy with code.

A digital garden of interactive financial dashboards, economic analysis, and long-form writing. Built with the "Bloomberg Terminal for ideas" aesthetic.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Inter (UI) + JetBrains Mono (data/code)
- **Animation:** Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
naly-dev/
├── app/
│   ├── layout.js           # Root layout with fonts
│   ├── page.js             # Homepage
│   ├── globals.css         # Global styles
│   ├── projects/
│   │   ├── page.js         # Projects gallery
│   │   ├── real-terms/
│   │   │   └── page.js     # Real Terms dashboard
│   │   └── fourth-turning/
│   │       └── page.js     # Fourth Turning analysis
│   └── writing/
│       └── page.js         # Writing/blog page
├── components/
│   ├── Header.js           # Navigation header
│   ├── Footer.js           # Site footer
│   ├── Hero.js             # Homepage hero section
│   ├── BentoGrid.js        # Homepage bento grid
│   ├── ProjectCard.js      # Project card component
│   └── visualizations/     # ← Drop your dashboards here
│       └── index.js
├── data/
│   └── projects.js         # Portfolio content data
└── public/
    └── ...                 # Static assets
```

## Adding Visualizations

1. Create your React component in `components/visualizations/`:

```jsx
// components/visualizations/RealTermsChart.js
'use client';

export default function RealTermsChart() {
  return (
    <div className="w-full h-full">
      {/* Your D3/Recharts/etc visualization */}
    </div>
  );
}
```

2. Export it from the index:

```js
// components/visualizations/index.js
export { default as RealTermsChart } from './RealTermsChart';
```

3. Import and use in your page:

```jsx
// app/projects/real-terms/page.js
import RealTermsChart from '@/components/visualizations/RealTermsChart';

// ... in the render:
<RealTermsChart />
```

## Design System

### Colors

| Token | Hex | Use |
|-------|-----|-----|
| `terminal-bg` | `#0a0a0a` | Page background |
| `terminal-surface` | `#111111` | Cards, surfaces |
| `terminal-border` | `#262626` | Borders |
| `terminal-muted` | `#737373` | Secondary text |
| `terminal-accent` | `#22c55e` | Accents, positive data |

### Typography

- **UI Text:** `font-sans` (Inter)
- **Data/Code:** `font-mono` (JetBrains Mono)

### Data States

```html
<span class="data-positive">+5.2%</span>
<span class="data-negative">-3.1%</span>
<span class="data-neutral">0.0%</span>
```

## Managing Projects

Edit `data/projects.js` to add/modify portfolio items:

```js
export const projects = [
  {
    id: 'my-project',
    title: 'Project Title',
    description: 'Brief description...',
    category: 'Dashboard',
    status: 'live', // 'live' | 'beta' | 'development' | 'archived'
    href: '/projects/my-project',
    featured: true,
    tags: ['React', 'D3.js'],
    metrics: {
      label: 'Data Points',
      value: '10K+',
    },
  },
];
```

## Deployment

This site is designed for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## License

MIT
