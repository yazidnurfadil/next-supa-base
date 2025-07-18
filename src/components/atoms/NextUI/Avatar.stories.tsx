import { avatar } from "@heroui/theme";
import { Avatar } from "@heroui/avatar";
import { Camera, Activity } from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

export default {
  component: Avatar,
  title: "Atoms/Avatar",
  argTypes: {
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
} as Meta<typeof Avatar>;

const defaultProps = {
  ...avatar.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithText = {
  args: {
    ...defaultProps,
    name: "JW",
    color: "danger",
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isBordered: true,
    isDisabled: true,
    color: "secondary",
    src: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
  },
};

export const WithImage = {
  args: {
    ...defaultProps,
    src: "https://i.pravatar.cc/300?u=a042581f4e29026705d",
  },
};

export const isBordered = {
  args: {
    ...defaultProps,
    isBordered: true,
    color: "secondary",
    src: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
  },
};

export const isFocusable = {
  args: {
    ...defaultProps,
    isFocusable: true,
    src: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
  },
};

export const WithIcon = {
  args: {
    ...defaultProps,
    size: "lg",
  },
};

export const Custom = {
  args: {
    ...defaultProps,
    radius: "xl",
    icon: <Activity size={20} fill="currentColor" />,
    classNames: {
      base: "shadow-lg bg-cyan-200 dark:bg-cyan-800",
    },
  },
};

export const CustomSize = {
  args: {
    ...defaultProps,
    classNames: {
      base: "w-32 h-32 text-base",
    },
  },
};

export const CustomSizeImg = {
  args: {
    ...defaultProps,
    name: "Junior",
    src: "https://i.pravatar.cc/300?u=a042581f4e29026705d",
    classNames: {
      base: "w-32 h-32 text-base",
    },
  },
};

export const DefaultIcon = {
  args: {
    ...defaultProps,
    classNames: {
      icon: "text-default-400",
    },
  },
};

export const IconFallback = {
  args: {
    ...defaultProps,
    showFallback: true,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
};

export const InitialsFallback = {
  args: {
    ...defaultProps,
    name: "Junior",
    showFallback: true,
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  },
};

export const CustomFallback = {
  args: {
    ...defaultProps,
    showFallback: true,
    src: "https://images.unsplash.com/broken",
    fallback: (
      <Camera
        size={20}
        fill="currentColor"
        className="size-6 animate-pulse text-default-500"
      />
    ),
  },
};

export const BrokenImage = {
  args: {
    ...defaultProps,
    name: "Junior",
    showFallback: true,
    src: "https://images.unsplash.com/broken-image",
  },
};
