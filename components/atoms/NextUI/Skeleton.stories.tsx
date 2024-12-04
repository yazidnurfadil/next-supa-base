import React from "react";

import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { skeleton } from "@nextui-org/theme";
import { Skeleton, SkeletonProps } from "@nextui-org/skeleton";

import { Meta } from "@storybook/react";

export default {
  component: Skeleton,
  title: "Atoms/Skeleton",
  argTypes: {
    children: {
      hidden: true,
    },
    isLoaded: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Skeleton>;

const defaultProps = {
  ...skeleton.defaultVariants,
  isLoaded: false,
  children: <div className="h-[100px] w-[200px]">NextUI</div>,
};

const DefaultTemplate = (args: SkeletonProps) => (
  <Card radius="lg" className="w-[200px] space-y-5 p-4">
    <Skeleton className="rounded-lg" {...args}>
      <div className="h-24 rounded-lg bg-default-300" />
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg" {...args}>
        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg" {...args}>
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg" {...args}>
        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
      </Skeleton>
    </div>
  </Card>
);

const StandaloneTemplate = (args: SkeletonProps) => (
  <div className="flex w-full max-w-[300px] items-center gap-3">
    <div>
      <Skeleton className="flex size-12 rounded-full" />
    </div>
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-3 w-3/5 rounded-lg" {...args} />
      <Skeleton className="h-3 w-4/5 rounded-lg" {...args} />
    </div>
  </div>
);

const LoadedStateTemplate = (args: SkeletonProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="flex flex-col gap-3">
      <Card radius="lg" className="w-[200px] space-y-5 p-4">
        <Skeleton className="rounded-lg" {...args} isLoaded={isLoaded}>
          <div className="h-24 rounded-lg bg-secondary" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg" {...args} isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" {...args} isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg" {...args} isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-200" />
          </Skeleton>
        </div>
      </Card>
      <Button
        size="sm"
        variant="flat"
        color="secondary"
        onPress={toggleLoad}
        className="max-w-[200px]"
      >
        {isLoaded ? "Show" : "Hide"} Skeleton
      </Button>
    </div>
  );
};

export const Default = {
  render: DefaultTemplate,

  args: {
    ...defaultProps,
  },
};

export const Standalone = {
  render: StandaloneTemplate,

  args: {
    ...defaultProps,
  },
};

export const LoadedState = {
  render: LoadedStateTemplate,

  args: {
    ...defaultProps,
  },
};
