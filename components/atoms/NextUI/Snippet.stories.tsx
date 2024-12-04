import { snippet } from "@nextui-org/theme";
import { Snippet } from "@nextui-org/snippet";

import { Meta } from "@storybook/react";

export default {
  component: Snippet,
  title: "Atoms/Snippet",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    symbol: {
      control: {
        type: "text",
      },
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    hideSymbol: {
      control: {
        type: "boolean",
      },
    },
    disableCopy: {
      control: {
        type: "boolean",
      },
    },
    disableTooltip: {
      control: {
        type: "boolean",
      },
    },
    hideCopyButton: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "solid", "bordered", "shadow"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
} as Meta<typeof Snippet>;

const defaultProps = {
  symbol: "$",
  hideSymbol: false,
  disableCopy: false,
  disableTooltip: false,
  hideCopyButton: false,
  children: "npm install @nextui-org/react",
  ...snippet.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const MultiLine = {
  args: {
    ...defaultProps,
    children: [
      "npm install @nextui-org/react",
      "yarn add @nextui-org/react",
      "pnpm add @nextui-org/react",
    ],
  },
};
