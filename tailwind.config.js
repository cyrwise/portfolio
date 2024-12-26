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
        }
      },
      animation: {
        'wave': 'wave 0.6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'glow': 'glow 3s ease-in-out infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
    }),
  ],
}
