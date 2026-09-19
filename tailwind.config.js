/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          darkest: '#03080e',
          dark: '#05131d',
          card: '#081d2c',
          border: '#0e334d',
          cyan: '#00f2fe',
          cyanGlow: '#06b6d4',
          mint: '#10b981',
          mintGlow: '#34d399',
          ice: '#e0f2fe',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        display: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // Projector-sized scale
        'proj-sm': ['1.125rem', { lineHeight: '1.5' }],  // 18px
        'proj-base': ['1.375rem', { lineHeight: '1.5' }], // 22px
        'proj-lg': ['1.75rem', { lineHeight: '1.3' }],   // 28px
        'proj-xl': ['2.25rem', { lineHeight: '1.2' }],   // 36px
        'proj-2xl': ['3rem', { lineHeight: '1.1' }],     // 48px
        'proj-3xl': ['4rem', { lineHeight: '1' }],       // 64px
        'proj-hero': ['5.5rem', { lineHeight: '0.95' }], // 88px
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'score-pop': 'scorePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'enter-up': 'enterUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'enter-left': 'enterLeft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'reveal-flip': 'revealFlip 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'timer-urgent': 'timerUrgent 0.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'buzz-in': 'buzzIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(0, 242, 254, 0.2))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scorePop: {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: '0' },
          '60%': { transform: 'translateY(-48px) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(0.9)', opacity: '0' },
        },
        enterUp: {
          '0%': { transform: 'translateY(32px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        enterLeft: {
          '0%': { transform: 'translateX(-24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        revealFlip: {
          '0%': { transform: 'scaleY(0.1) translateY(-16px)', opacity: '0' },
          '100%': { transform: 'scaleY(1) translateY(0)', opacity: '1' },
        },
        timerUrgent: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        buzzIn: {
          '0%': { transform: 'scale(0.7)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 30px -5px rgba(0, 242, 254, 0.5)',
        'cyan-lg': '0 0 50px 0px rgba(0, 242, 254, 0.35)',
        'mint-glow': '0 0 30px -5px rgba(16, 185, 129, 0.45)',
        'rose-glow': '0 0 30px -5px rgba(244, 63, 94, 0.5)',
        'amber-glow': '0 0 30px -5px rgba(245, 158, 11, 0.5)',
      }
    },
  },
  plugins: [],
}

