import { Kbd } from "@heroui/kbd";
import { kbd } from "@heroui/theme";

import { Meta } from "@storybook/react";

export default {
  component: Kbd,
  title: "Atoms/Kbd",
  argTypes: {
    keys: {
      control: {
        type: "select",
      },
      options: [
        "command",
        "shift",
        "ctrl",
        "option",
        "enter",
        "delete",
        "escape",
        "tab",
        "capslock",
        "up",
        "right",
        "down",
        "left",
        "pageup",
        "pagedown",
        "home",
        "end",
        "help",
        "space",
      ],
    },
  },
} as Meta<typeof Kbd>;

const defaultProps = {
  ...kbd.defaultVariants,
  keys: ["command"],
};

export const Default = {
  args: {
    ...defaultProps,
    children: "K",
  },
};
