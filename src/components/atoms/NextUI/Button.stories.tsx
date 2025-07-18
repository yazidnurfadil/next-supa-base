import React from "react";

import { button } from "@heroui/theme";
import { Button, ButtonProps } from "@heroui/button";
import { Camera, Notification, HeadphonesIcon } from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

export default {
  component: Button,
  title: "Atoms/Button",
  argTypes: {
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
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
    spinnerPlacement: {
      options: ["start", "end"],
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
    variant: {
      control: {
        type: "select",
      },
      options: [
        "solid",
        "bordered",
        "light",
        "flat",
        "faded",
        "shadow",
        "ghost",
      ],
    },
  },
} as Meta<typeof Button>;

const defaultProps = {
  children: "Button",
  spinnerPlacement: "start",
  ...button.defaultVariants,
};

const StateTemplate = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePress = () => {
    console.log("Pressed");
    setIsOpen((prev) => !prev);
  };

  return (
    <Button
      {...args}
      aria-label="Open"
      aria-pressed={isOpen}
      onPress={handlePress}
    >
      {isOpen ? "Close" : "Open"}
    </Button>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithState = {
  render: StateTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableRipple = {
  args: {
    ...defaultProps,
    disableRipple: true,
  },
};

export const WithIcons = {
  args: {
    ...defaultProps,
    endContent: <Camera className="fill-current" />,
    startContent: <Notification className="fill-current" />,
  },
};

export const IconButton = {
  args: {
    ...defaultProps,
    isIconOnly: true,
    children: <HeadphonesIcon className="size-5" />,
  },
};

export const IsLoading = {
  args: {
    ...defaultProps,
    isLoading: true,
    color: "primary",
  },
};

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
    radius: "full",
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
