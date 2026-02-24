import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sov: {
          bg: '#0a0a0c',
          surface: '#12141a',
          'surface-alt': '#1a1c24',
          border: '#1e2030',
          'border-bright': '#2a2d3a',
          gold: '#F4B728',
          'gold-dim': 'rgba(244, 183, 40, 0.15)',
          'gold-glow': 'rgba(244, 183, 40, 0.3)',
          violet: '#A78BFA',
          'violet-dim': 'rgba(167, 139, 250, 0.15)',
          green: '#22C55E',
          'green-dim': 'rgba(34, 197, 94, 0.15)',
          red: '#EF4444',
          'red-dim': 'rgba(239, 68, 68, 0.15)',
          amber: '#F59E0B',
          gray: '#6B7084',
          bright: '#F0F0F0',
          text: '#D1D5DB',
          muted: '#9CA3AF',
          faint: '#6B7280',
          ghost: '#374151',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
