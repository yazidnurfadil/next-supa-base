import React from "react";
import { Meta } from "@storybook/react";

import { Divider, DividerProps } from "@nextui-org/divider";
import { divider } from "@nextui-org/theme";

export default {
  title: "Atoms/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: {
        type: "select",
      },
      options: ["horizontal", "vertical"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Divider>;

const defaultProps = {
  ...divider.defaultVariants,
};

const Template = (args: DividerProps) => (
  <div className="max-w-md">
    <div className="space-y-1">
      <h4 className="text-base font-medium">NextUI Components</h4>
      <p className="text-sm text-default-400">
        Beautiful, fast and modern React UI library.
      </p>
    </div>
    <Divider className="my-4" />
    <div className="flex h-5 items-center space-x-4 text-sm rtl:space-x-reverse">
      <div>Blog</div>
      <Divider {...args} orientation="vertical" />
      <div>Docs</div>
      <Divider {...args} orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};
