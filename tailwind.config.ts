import { heroui } from "@heroui/react";
import { commonColors } from "@heroui/theme";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: commonColors.green[500],
        },
      },
    },
  },
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
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
    // Path to NextUi module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
export default config;
