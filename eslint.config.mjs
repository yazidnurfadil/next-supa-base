import pluginNext from "@next/eslint-plugin-next";

import js from "@eslint/js";
import globals from "globals";
import ts from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReactHook from "eslint-plugin-react-hooks";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const perfectionistNoticeType = "warn";
const perfectionistConfig = {
  order: "asc",
  type: "line-length",
};
const perfectionistDefault = [perfectionistNoticeType, perfectionistConfig];

const eslintConfig = ts.config(
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  ...pluginQuery.configs["flat/recommended"],
  perfectionist.configs["recommended-line-length"],
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    extends: [ts.configs.disableTypeChecked],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,mtsx}"],
    plugins: {
      "react-hooks": pluginReactHook,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReactHook.configs.recommended.rules,
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      parserOptions: {
        projectService: true,
        sourceType: "module",
        ecmaVersion: "latest",
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "better-tailwindcss": {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: "./src/styles/globals.css",
      },
    },
    rules: {
      // enable all recommended rules to report a warning
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
      // enable all recommended rules to report an error
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,

      // or configure rules individually
      "better-tailwindcss/enforce-consistent-line-wrapping": [
        "warn",
        { printWidth: 100 },
      ],
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    rules: {
      "perfectionist/sort-maps": perfectionistDefault,
      "perfectionist/sort-sets": perfectionistDefault,
      "perfectionist/sort-enums": perfectionistDefault,
      "perfectionist/sort-classes": perfectionistDefault,
      "perfectionist/sort-exports": perfectionistDefault,
      "perfectionist/sort-modules": perfectionistDefault,
      "perfectionist/sort-objects": perfectionistDefault,
      "perfectionist/sort-jsx-props": perfectionistDefault,
      "perfectionist/sort-decorators": perfectionistDefault,
      "perfectionist/sort-interfaces": perfectionistDefault,
      "perfectionist/sort-switch-case": perfectionistDefault,
      "perfectionist/sort-object-types": perfectionistDefault,
      "perfectionist/sort-named-exports": perfectionistDefault,
      "perfectionist/sort-named-imports": perfectionistDefault,
      "perfectionist/sort-array-includes": perfectionistDefault,
      "perfectionist/sort-heritage-clauses": perfectionistDefault,
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "perfectionist/sort-intersection-types": perfectionistDefault,
      "perfectionist/sort-variable-declarations": perfectionistDefault,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "perfectionist/sort-imports": [
        "warn",
        {
          ...perfectionistConfig,
          internalPattern: ["^@/.+"],
          customGroups: {
            type: {
              react: ["^react$", "^react-.+"],
            },
            value: {
              lodash: "lodash",
              heroui: ["^@heroui"],
              storybook: ["^@storybook/.+"],
              react: ["^react$", "^react-.+"],
              next: ["^@next/.+", "^next/.+"],
            },
          },
          groups: [
            "react",
            "next",
            "heroui",
            "storybook",
            "type",
            ["builtin", "external"],
            "lodash",
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
        },
      ],
    },
  },
  // Ignore patterns
  {
    ignores: ["node_modules/", "dist/", ".next/", "types/database.types.ts"],
  }
);

export default eslintConfig;
