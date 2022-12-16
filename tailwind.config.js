/** @type {import('tailwindcss/types/generated/default-theme').DefaultTheme} */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Segoe UI', 'Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Butler', ...defaultTheme.fontFamily.serif]
      },
    },
  },
  plugins: [require('tailwindcss-print-styles')],
  variants: {
    margin: ['print'],
    display: ['print']
  }
};
