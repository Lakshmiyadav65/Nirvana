/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          light: '#2a2a2a',
          DEFAULT: '#1a1a1a',
          dark: '#111111',
          pure: '#0b0b0b',
        },
        gold: {
          light: '#dfc298',
          DEFAULT: '#c89d5e',
          dark: '#ad8043',
          luxury: '#d4af37',
          bronze: '#b38f4d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(200, 157, 94, 0.15)',
        'luxury-lg': '0 20px 40px -15px rgba(200, 157, 94, 0.25)',
      }
    },
  },
  plugins: [],
}
