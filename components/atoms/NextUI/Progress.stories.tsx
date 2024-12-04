import React from "react";

import { progress } from "@nextui-org/theme";
import { Progress, ProgressProps } from "@nextui-org/progress";

import { Meta } from "@storybook/react";

export default {
  component: Progress,
  title: "Atoms/Progress",
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
} as Meta<typeof Progress>;

const defaultProps = {
  ...progress.defaultVariants,
  value: 55,
};

const Template = (args: ProgressProps) => (
  <div className="max-w-[400px]">
    <Progress {...args} />
  </div>
);

const IntervalTemplate = (args: ProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[400px]">
      <Progress {...args} value={value} />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
    "aria-label": "Loading...",
  },
};

export const WithLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const WithValueLabel = {
  render: IntervalTemplate,

  args: {
    ...defaultProps,
    color: "success",
    showValueLabel: true,
    label: "Downloading...",
  },
};

export const WithValueFormatting = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Loading...",
    showValueLabel: true,
    formatOptions: { currency: "ARS", style: "currency" },
  },
};

export const Indeterminate = {
  render: Template,

  args: {
    ...defaultProps,
    size: "xs",
    radius: "none",
    isIndeterminate: true,
  },
};

export const Striped = {
  render: Template,

  args: {
    ...defaultProps,
    isStriped: true,
  },
};

export const CustomSlots = {
  render: Template,

  args: {
    ...defaultProps,
    classNames: {
      track: "bg-red-500 rounded-[4px]",
      indicator: "bg-[#14708A] rounded-[4px]",
    },
  },
};
