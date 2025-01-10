// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0F1626',
        'leather': '#AB987A',
        'coral': '#FF533D',
        'eggshell': '#F5F5F5',
        'hero-bg': '#001018',
        'accent-cyan': '#00E5FF',
        'card-dark': '#0A192F',
        'card-darker': '#112240',
        'text-coral': '#FF6B6B',
        'terminal-green': '#64ffda'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 20px #00E5FF',
            'border-color': '#00E5FF'
          },
          '50%': {
            'box-shadow': '0 0 40px #00E5FF',
            'border-color': '#00E5FF'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        rotateChevron: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(180deg)' }
        }
      },
      animation: {
        'wave': 'wave 0.6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'chevron-spin': 'rotateChevron 0.3s ease-in-out forwards'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 229, 255, 0.7)',
        'card': '0 0 20px rgba(0, 0, 0, 0.3)',
      },
      typography: {
        'retro': {
          css: {
            fontFamily: 'Space Mono, monospace',
          },
        },
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
    }),
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.terminal-text': {
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#64ffda',
        },
        '.glass-effect': {
          backgroundColor: 'rgba(10, 25, 47, 0.7)',
          backdropFilter: 'blur(10px)',
        },
        '.card-border': {
          border: '1px solid rgba(100, 255, 218, 0.3)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
