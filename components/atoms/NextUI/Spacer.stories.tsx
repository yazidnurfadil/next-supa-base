import React from "react";
import { Meta } from "@storybook/react";

import { Spacer, SpacerProps } from "@nextui-org/spacer";
import { spacer } from "@nextui-org/theme";

export default {
  title: "Atoms/Spacer",
  component: Spacer,
  argTypes: {
    x: {
      control: {
        type: "number",
      },
    },
    y: {
      control: {
        type: "number",
      },
    },
    isInline: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Spacer>;

const defaultProps = {
  ...spacer.defaultVariants,
};

const content = (
  <div className="flex h-[100px] w-[300px] flex-col rounded-xl bg-primary shadow-lg" />
);

const VerticalTemplate = (args: SpacerProps) => (
  <div className="flex flex-col">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

const HorizontalTemplate = (args: SpacerProps) => (
  <div className="flex flex-row">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

export const Vertical = {
  render: VerticalTemplate,

  args: {
    ...defaultProps,
    y: 1,
  },
};

export const Horizontal = {
  render: HorizontalTemplate,

  args: {
    ...defaultProps,
    x: 1,
    isInline: true,
  },
};
