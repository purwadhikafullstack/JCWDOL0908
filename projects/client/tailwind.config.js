/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridRow: {
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        10: "repeat(10, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        8: "repeat(8, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
      colors: {
        primary: "#07484A",
        primaryLight: "#70908B",
        secondary: "#58a3b8",
      },
      fontFamily: {
        title: ["Playfair Display", "Segoe UI", "sans-serif"],
        body: ["Open Sans", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
