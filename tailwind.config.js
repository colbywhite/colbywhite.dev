/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "sharp-fade":
          "linear-gradient(to top, var(--tw-gradient-from) 0, var(--tw-gradient-to) 100px, var(--tw-gradient-to) 100%);",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["synthwave", "light"],
  },
};
