/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Libre Baskerville"', 'serif'],
        sans: ['"Raleway"', 'sans-serif'],
      },
      colors: {
        gold: { DEFAULT: '#c9a050', light: '#f0d990', dark: '#a8803a' },
        wine: { DEFAULT: '#050205', card: '#0f060e' },
        cream: '#f5edd6',
        muted: '#8a7060',
      },
    },
  },
  plugins: [],
}
