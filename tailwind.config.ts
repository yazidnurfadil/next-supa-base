import { heroui } from "@heroui/react";
import { commonColors } from "@heroui/theme";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {},
  },
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    // Path to NextUi module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: commonColors.zinc[900],
          },
        },
        light: {
          colors: {
            background: commonColors.zinc[100],
          },
        },
      },
    }),
  ],
};
export default config;
