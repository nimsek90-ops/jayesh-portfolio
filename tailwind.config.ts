import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hero: {
          peach: "#ffd8cc",
          blush: "#ffdfd5",
          pink: "#fed4dc",
          lavender: "#e5e7fc",
          sky: "#d8ebff",
          cream: "#fff8f5",
          dark: "#0f1115",
          charcoal: "#181a20",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "spin-reverse": "spin-reverse 15s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        pulse_subtle: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        hologram: "hologram 4s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        hologram: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
