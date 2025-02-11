import { heroui } from "@heroui/react";

import type { Config } from "tailwindcss";

const heroUI = heroui();

const config: Config = {
  darkMode: "class",
  plugins: [heroUI],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    // Path to NextUi module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
export default config;
