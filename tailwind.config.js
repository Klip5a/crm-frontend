/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#34c759",
        orange: "#e6b127",
        red: "#f06a4d",
        firm: "#9873ff",
        "firm-secondary": "#b89eff",
        grey: "#c8c5d1",
        "txt-grey": "#b0b0b0",
        black: "#333",
      },
    },
    fontFamily: {
      opensans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};
