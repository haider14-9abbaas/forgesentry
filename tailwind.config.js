/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },

      // --- Cyber Noir palette (for utility classes) ---
      colors: {
        // keep Tailwind defaults; add brand scale for direct use
        brand: {
          base:   '#0B0F19', // page background
          surface:'#111827', // card surfaces
          primary:'#22D3EE', // cyan actions
          accent: '#A3E635', // lime secondary
          text:   '#E5E7EB', // main text on dark
          sub:    '#94A3B8', // secondary text
        },
      },

      // animations (yours + small extras)
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideUp:{ '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:  { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        hue:    { from: { filter: 'hue-rotate(0deg)' }, to: { filter: 'hue-rotate(360deg)' } },
        shimmer:{ '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        bounceBadge:{
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '30%':     { transform: 'translateY(-6px) scale(1.03)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 6s ease-in-out infinite',
        hue: 'hue 8s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        bounceBadge: 'bounceBadge 2.2s ease-in-out infinite',
      },

      boxShadow: { card3d: '0 10px 30px rgba(0,0,0,0.12)' },
      transformOrigin: { card: '60% 60%' },
    },
  },

  plugins: [require('daisyui')],

  // --- DaisyUI theme so <button class="btn btn-primary"> etc. adopt Cyber Noir ---
  daisyui: {
    themes: [
      {
        cyberNoir: {
          'primary':  '#22D3EE',     // cyan
          'secondary':'#A3E635',     // lime
          'accent':   '#22D3EE',     // keep accent close to primary for cohesion
          'neutral':  '#111827',     // surfaces
          'base-100': '#0B0F19',     // page background
          'base-200': '#0F1522',
          'base-300': '#161C2A',
          'info':     '#22D3EE',
          'success':  '#10B981',
          'warning':  '#F59E0B',
          'error':    '#EF4444',
        },
      },
      // optional fallback:
      'light',
    ],
    base: true,
    utils: true,
    darkTheme: 'cyberNoir',
  },
}
