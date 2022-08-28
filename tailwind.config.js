/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      animation: {
        rotation: "rotation 1s linear infinite",
      },
      colors: {
        green: "#11B980",

        blue: {
          100: "#549DF2",
          200: "#318FE7",
        },
        customGray: {
          10: "#f1f1f1",
          50: "#E2E2E2",
          100: "#CFCFCF",
          200: "#989898",
        },
        black: {
          450: "rgba(0,0,0,.48)",
        },
      },
      fontFamily: {
        sans: ["Roberto", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        calendar: "url('/assets/calendare.png')",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1024px",
    },
    maxWidth: {
      330: "330px",
    },
  },
  plugins: [],
};
