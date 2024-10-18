import { Meta } from "@storybook/react";

import { Kbd } from "@nextui-org/kbd";
import { kbd } from "@nextui-org/theme";

export default {
  title: "Atoms/Kbd",
  component: Kbd,
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
