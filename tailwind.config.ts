import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f8f6",
          100: "#ecefeb",
          200: "#d7ddd5",
          300: "#aeb9aa",
          500: "#667260",
          700: "#3f493a",
          900: "#171b16"
        },
        lab: {
          teal: "#0f766e",
          moss: "#4d7c0f",
          amber: "#b45309",
          rose: "#be123c",
          violet: "#6d28d9"
        }
      },
      boxShadow: {
        soft: "0 14px 40px rgba(23, 27, 22, 0.08)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ]
      }
    }
  },
  plugins: [typography]
};

export default config;
