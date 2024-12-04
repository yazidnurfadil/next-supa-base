import React from "react";

import { Chip } from "@nextui-org/chip";
import { circularProgress } from "@nextui-org/theme";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { CircularProgress, CircularProgressProps } from "@nextui-org/progress";

import { Meta } from "@storybook/react";

export default {
  component: CircularProgress,
  title: "Atoms/CircularProgress",
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
} as Meta<typeof CircularProgress>;

const defaultProps = {
  ...circularProgress.defaultVariants,
};

const IntervalTemplate = (args: CircularProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <CircularProgress {...args} value={value} />;
};

const CustomClassnamesTemplate = (args: CircularProgressProps) => (
  <Card className="size-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
    <CardBody className="items-center justify-center pb-0">
      <CircularProgress
        {...args}
        strokeWidth={4}
        classNames={{
          track: "stroke-white/10",
          indicator: "stroke-white",
          svg: "w-36 h-36 drop-shadow-md",
          value: "text-3xl font-semibold text-white",
        }}
      />
    </CardBody>
    <CardFooter className="items-center justify-center pt-0">
      <Chip
        variant="bordered"
        classNames={{
          base: "border-1 border-white/30",
          content: "text-white/80 text-sm font-semibold",
        }}
      >
        2800 Data points
      </Chip>
    </CardFooter>
  </Card>
);

export const Default = {
  args: {
    ...defaultProps,
    "aria-label": "Loading...",
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const WithValueLabel = {
  render: IntervalTemplate,

  args: {
    ...defaultProps,
    value: 70,
    size: "lg",
    color: "secondary",
    showValueLabel: true,
  },
};

export const WithValueFormatting = {
  args: {
    ...defaultProps,
    value: 70,
    size: "xl",
    color: "warning",
    label: "Loading...",
    showValueLabel: true,
    formatOptions: { style: "unit", unit: "kilometer" },
  },
};

export const CustomClassnames = {
  render: CustomClassnamesTemplate,

  args: {
    ...defaultProps,
    value: 70,
    size: "xl",
    strokeWidth: 4,
    showValueLabel: true,
  },
};
