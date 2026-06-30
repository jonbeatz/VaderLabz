import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff2a36',
        'accent-dim': '#cc1f28',
        'bg-deep': '#000000',
        'bg-canvas': '#0a0a0b',
        'text-primary': '#f0f0f0',
        'text-muted': '#888899',
        'text-dim': '#555566',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-space-mono)', 'Space Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
