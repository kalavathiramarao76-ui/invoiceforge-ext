import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{tsx,ts,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#0a0f0a',
          surface: '#111a11',
          card: '#162016',
          border: '#1e3a1e',
          'border-hover': '#2d5a2d',
        },
        accent: {
          DEFAULT: '#22c55e',
          hover: '#4ade80',
          muted: 'rgba(34,197,94,0.15)',
          subtle: 'rgba(34,197,94,0.08)',
          glow: 'rgba(34,197,94,0.3)',
        },
        text: {
          primary: '#e8f5e8',
          secondary: '#9cb89c',
          tertiary: '#5a7a5a',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 250ms ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: { '0%, 100%': { boxShadow: '0 0 8px rgba(34,197,94,0.2)' }, '50%': { boxShadow: '0 0 20px rgba(34,197,94,0.4)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
