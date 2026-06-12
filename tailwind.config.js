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
        accent: {
          red: '#E35D5D',
          'red-hover': '#c94040',
        },
        muted: '#666666',
        'border-light': '#E0E0E0',
        'secondary-bg': '#F8F9FA',
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
    },
  },
  plugins: [],
}
