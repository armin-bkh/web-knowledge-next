/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gray-darkest": "#283149",
        "gray-dark": "#404B69",
        "cyan-light": "#00818A",
        light: "#DBEDF3",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
