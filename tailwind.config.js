/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F9F6F0',
          200: '#F2ECE4',
          300: '#E8DEC4',
          400: '#D9C8A9',
          500: '#C5A880',
          600: '#A3845B',
          700: '#7F6341',
          800: '#5C442A',
          900: '#3A2917',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          dark: '#111111',
        },
        warmGrey: '#76726E',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.35em',
      },
      aspectRatio: {
        'portrait': '4/5',
        'wide': '16/9',
      }
    },
  },
  plugins: [],
}
