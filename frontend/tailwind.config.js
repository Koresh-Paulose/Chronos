/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          deep: 'rgb(var(--bg-deep) / <alpha-value>)',
          card: 'rgb(var(--bg-card) / <alpha-value>)',
          glass: 'rgb(var(--bg-glass) / <alpha-value>)'
        },
        border: {
          subtle: 'rgb(var(--border-subtle) / <alpha-value>)',
          glow: 'rgb(var(--border-glow) / <alpha-value>)'
        },
        accent: {
          primary: 'rgb(var(--accent-primary) / <alpha-value>)',
          'primary-dim': 'rgb(var(--accent-primary-dim) / <alpha-value>)',
          danger: 'rgb(var(--accent-danger) / <alpha-value>)',
          warn: 'rgb(var(--accent-warn) / <alpha-value>)',
          info: 'rgb(var(--accent-info) / <alpha-value>)'
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)'
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif']
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'heading-md': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-sm': ['1rem', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
        'mono-lg': ['1rem', { lineHeight: '1.5', fontFamily: 'Space Grotesk' }],
        'mono': ['0.875rem', { lineHeight: '1.5', fontFamily: 'Space Grotesk' }],
        'mono-sm': ['0.75rem', { lineHeight: '1.5', fontFamily: 'Space Grotesk' }]
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        glass: 'var(--shadow-glass)',
        'glow': 'var(--shadow-glow)',
        'glow-lg': 'var(--shadow-glow-lg)',
        'glow-danger': '0 0 20px rgba(255, 77, 106, 0.15)',
        'glow-info': '0 0 20px rgba(0, 212, 255, 0.15)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        smooth: '200ms'
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in': 'slideIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-out': 'slideOut 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'orbit': 'orbit 20s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(12rem) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(12rem) rotate(-360deg)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-subtle': 'linear-gradient(rgba(30, 45, 66, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 45, 66, 0.5) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '48px 48px'
      },
      safelist: [
        'bg-accent-primary',
        'bg-accent-primary-dim',
        'bg-accent-danger',
        'bg-accent-warn',
        'bg-accent-info',
        'text-accent-primary',
        'text-accent-danger',
        'text-accent-warn',
        'text-accent-info',
        'border-accent-primary',
        'border-accent-danger',
        'border-accent-warn',
        'border-accent-info',
        'ring-accent-primary',
        'ring-accent-danger',
        'ring-accent-warn',
        'ring-accent-info',
        'bg-energy-high',
        'bg-energy-medium',
        'bg-energy-low',
        'text-energy-high',
        'text-energy-medium',
        'text-energy-low',
        'border-l-energy-high',
        'border-l-energy-medium',
        'border-l-energy-low'
      ]
    }
  },
  plugins: []
}