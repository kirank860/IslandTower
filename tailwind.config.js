/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#003322',
          dark: '#001a11',
          hover: '#004d33',
        },
        emerald: {
          DEFAULT: '#003322',
          light: '#00593d',
        },
        accent: {
          red: '#E35D5D',
          'red-hover': '#c94040',
        },
        muted: '#666666',
        'border-light': '#E0E0E0',
        'secondary-bg': '#F8F9FA',
        cream: '#FAF7F2',
        'warm-bg': '#F5F0EB',
      },
      fontFamily: {
        heading: ['Syncopate', 'Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      screens: {
        nav: '901px',
      },
      transitionDuration: {
        400: '400ms',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        revealClip: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
        'bounce-down': 'bounceDown 1.8s ease-in-out infinite',
        'reveal-clip': 'revealClip 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
