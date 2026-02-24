import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        zec: {
          bg: '#0a0a0c',
          surface: '#0f0f12',
          border: '#1e1d1a',
          gold: '#c9a84c',
          'gold-dim': 'rgba(201,168,76,0.15)',
          shield: '#3b82f6',
          green: '#22C55E',
          red: '#EF4444',
          'text-bright': '#e8e6e0',
          'text-body': '#a8a69e',
          'text-muted': '#7a7870',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
