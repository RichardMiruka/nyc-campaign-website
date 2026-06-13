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
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;