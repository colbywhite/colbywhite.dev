/** @type {import('tailwindcss/types/generated/default-theme').DefaultTheme} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI", "Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Butler", ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        "sharp-fade":
          "linear-gradient(to top, var(--tw-gradient-from) 0, var(--tw-gradient-to) 100px, var(--tw-gradient-to) 100%);",
      },
      colors: {
        primary: colors.violet,
        secondary: colors.slate,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
