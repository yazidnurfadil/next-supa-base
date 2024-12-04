import { chip } from "@nextui-org/theme";
import { Avatar } from "@nextui-org/avatar";
import { Chip, ChipProps } from "@nextui-org/chip";
import { CheckIcon } from "@nextui-org/shared-icons";

import { Meta } from "@storybook/react";

export default {
  component: Chip,
  title: "Atoms/Chip",
  argTypes: {
    isDisabled: {
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
      options: ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"],
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
} as Meta<typeof Chip>;

const defaultProps = {
  ...chip.defaultVariants,
  children: "Chip",
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  args: {
    ...defaultProps,
    startContent: (
      <span role="img" className="ml-1" aria-label="celebration">
        🎉
      </span>
    ),
  },
};

export const EndContent = {
  args: {
    ...defaultProps,
    endContent: (
      <span role="img" className="mr-1" aria-label="rocket">
        🚀
      </span>
    ),
  },
};

export const Closeable = {
  args: {
    ...defaultProps,

    onClose: () => console.log("Close"),
  },
};

export const CustomCloseIcon = {
  args: {
    ...defaultProps,
    endContent: <CheckIcon />,

    onClose: () => console.log("Close"),
  },
};

export const WithAvatar = {
  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    avatar: (
      <Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
    ),
  },
};

const HiddenOverflowTemplate = (args: ChipProps) => (
  <div className="w-20 border-2 border-danger-500">
    <Chip {...args} />
  </div>
);

export const HiddenOverflow = {
  render: HiddenOverflowTemplate,
  args: {
    ...defaultProps,
    children: "Hello World!",
  },
};
