/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  staticDirs: ["../public"],

  docs: {
    autodocs: "tag",
  },

  framework: {
    options: {},
    name: "@storybook/nextjs",
  },

  stories: [
    "../app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../components/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
  ],

  webpackFinal: (config) => {
    const fileLoaderRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test(".svg");
    }) as { [key: string]: any };

    config.module?.rules?.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
        }, // exclude if *.svg?url
      }
    );

    fileLoaderRule.exclude = /\.svg$/;

    return config;
  },
};
export default config;
