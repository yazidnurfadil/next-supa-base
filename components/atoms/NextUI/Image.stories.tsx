import React from "react";

import { image } from "@heroui/theme";
import { Image, ImageProps } from "@heroui/image";

import { Meta } from "@storybook/react";

export default {
  component: Image,
  title: "Atoms/Image",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isZoomed: {
      control: {
        type: "boolean",
      },
    },
    isBlurred: {
      control: {
        type: "boolean",
      },
    },
    showSkeleton: {
      control: {
        disable: true,
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    shadow: {
      options: ["none", "sm", "md", "lg"],
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
  },
} as Meta<typeof Image>;

const defaultProps = {
  ...image.defaultVariants,
  disableSkeleton: true,
  alt: "NextUI hero image",
  src: "./images/local-image-1.jpeg",
};

const LoadingTemplate = (args: ImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const time = !args.disableSkeleton ? 2500 : 500;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [args.disableSkeleton]);

  return <Image {...args} alt="" isLoading={isLoading} />;
};

export const Default = {
  args: {
    width: 300,
    ...defaultProps,
  },
};

export const Blurred = {
  args: {
    ...defaultProps,
    width: 300,
    isBlurred: true,
    src: "/images/local-image-small.jpg",
    // src:
    //   "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
};

export const Zoomed = {
  args: {
    ...defaultProps,
    width: 300,
    radius: "lg",
    isZoomed: true,
    src: "https://nextui.org/images/card-example-2.jpeg",
  },
};

export const Shadow = {
  args: {
    ...defaultProps,
    width: 300,
    radius: "lg",
    shadow: "md",
    isZoomed: true,
    src: "/images/local-image-small.jpg",
  },
};

export const AnimatedLoad = {
  args: {
    ...defaultProps,
    width: 300,
    radius: "lg",
    src: "https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  },
};

export const Fallback = {
  render: LoadingTemplate,

  args: {
    ...defaultProps,
    width: 300,
    radius: "lg",
    fallbackSrc: "/images/placeholder_300x450.png",
    src: "https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  },
};

export const Skeleton = {
  render: LoadingTemplate,

  args: {
    ...defaultProps,
    width: 300,
    height: 450,
    radius: "lg",
    disableSkeleton: false,
    src: "https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
};
