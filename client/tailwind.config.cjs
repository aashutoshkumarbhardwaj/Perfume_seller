/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Jost", "sans-serif"],
      },
      colors: {
        amber: {
          300: "#fcd34d",
          400: "#f59e0b",
          500: "#d97706",
        },
        cream: "#fafaf8",
      },
    },
  },
  plugins: [],
};
