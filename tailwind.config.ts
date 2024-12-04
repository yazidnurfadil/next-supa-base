import { nextui } from "@nextui-org/react";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  plugins: [nextui()],
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
    // Path to NextUi module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
export default config;
