import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#000000",
          900: "#050505",
          800: "#0f0f0f",
        },
        royal: {
          400: "#fb7185", // rose-400
          500: "#f43f5e", // rose-500
          600: "#e11d48", // rose-600
          700: "#be123c", // rose-700
        },
        violet: {
          500: "#f43f5e",
          600: "#e11d48",
        },
        crimson: {
          DEFAULT: "#e11d48",
          light: "#fb7185",
          dark: "#be123c",
        },
      },
      animation: {
        border: "border 4s linear infinite",
        "blob-spin": "blob-spin 25s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        "blob-spin": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "33%": { transform: "rotate(120deg) scale(1.1)" },
          "66%": { transform: "rotate(240deg) scale(0.9)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "fade-in": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [daisyui],
};
