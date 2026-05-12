import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-deep":  "#1A5C38",
        "green-mid":   "#2E7D52",
        "gold":        "#D4A017",
        "navy":        "#0D1B40",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        serif:   ["'Playfair Display'", "serif"],
        sans:    ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
