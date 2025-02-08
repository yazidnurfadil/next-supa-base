import React from "react";

import { slider } from "@heroui/theme";
import { Tooltip } from "@heroui/tooltip";
import { clsx } from "@heroui/shared-utils";
import { Slider, SliderProps, SliderValue } from "@heroui/slider";
import {
  InfoIcon,
  VolumeLowBoldIcon,
  VolumeHighBoldIcon,
} from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

export default {
  component: Slider,
  title: "Atoms/Slider",
  argTypes: {
    label: {
      control: { type: "text" },
    },
    fillOffset: {
      control: { type: "number" },
    },
    step: {
      control: {
        type: "number",
      },
    },
    endContent: {
      table: {
        disable: true,
      },
    },
    startContent: {
      table: {
        disable: true,
      },
    },
    showSteps: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    showTooltip: {
      control: {
        type: "boolean",
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: {
        type: "select",
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "foreground",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
} as Meta<typeof Slider>;

const defaultProps = {
  ...slider.defaultVariants,
};

const VerticalTemplate = (args: SliderProps) => (
  <div className="flex h-[348px] max-w-md items-center justify-start p-4">
    <Slider {...args} />
  </div>
);

const HorizontalTemplate = (args: SliderProps) => (
  <div className="flex size-full max-w-md items-center justify-start">
    <Slider {...args} />
  </div>
);

const Template = (args: SliderProps) => {
  if (args.orientation === "vertical") {
    return <VerticalTemplate {...args} />;
  }

  return <HorizontalTemplate {...args} />;
};

const CustomStylesTemplate = (args: SliderProps) => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="flex size-full max-w-md items-center justify-center">
      <Slider
        {...args}
        disableThumbScale={args.size !== "lg"}
        showOutline={args.showOutline && args.size !== "lg"}
        tooltipProps={{
          offset: 10,
          placement: "bottom",
          classNames: {
            content: [
              "py-2 shadow-xl",
              "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
            ],
            base: [
              // arrow color
              "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
            ],
          },
        }}
        classNames={{
          labelWrapper: "mb-2",
          value: "font-medium text-default-500 text-small",
          label: "font-medium text-default-700 text-medium",
          filler: ["bg-gradient-to-r from-primary-500 to-secondary-400"],
          step:
            args.size === "sm" && args.showSteps
              ? "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
              : "",
          thumb: [
            "transition-size",
            "bg-gradient-to-r from-secondary-400 to-primary-500",
            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
            args.size === "sm" || args.size === "md"
              ? "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
              : "",
          ],
        }}
      />
    </div>
  </div>
);

const CustomValueTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>(0.2);
  const [inputValue, setInputValue] = React.useState<string>("0.2");

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <div className="flex size-full max-w-md items-center justify-start">
      <Slider
        value={value}
        onChange={handleChange}
        classNames={{
          label: "text-medium",
        }}
        renderValue={({ ...props }) => (
          <output {...props}>
            <Tooltip
              placement="left"
              content="Press Enter to confirm"
              className="rounded-md text-tiny text-default-500"
            >
              <input
                type="text"
                value={inputValue}
                aria-label="Temperature"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const v = e.target.value;

                  setInputValue(v);
                }}
                className="w-12 rounded-small border-medium border-transparent bg-default-100 px-1 py-0.5 text-right text-small font-medium text-default-700 outline-none transition-colors hover:border-primary focus:border-primary"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                    setValue(Number(inputValue));
                  }
                }}
              />
            </Tooltip>
          </output>
        )}
        {...args}
      />
    </div>
  );
};

const ControlledTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>(25);

  return (
    <div className="flex size-full max-w-md flex-col items-start justify-center gap-2">
      <Slider value={value} onChange={setValue} {...args} />
      <p className="text-small text-default-500">Current volume: {value}</p>
    </div>
  );
};

const ControlledRangeTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>([25, 75]);

  return (
    <div className="flex max-w-md flex-col items-start justify-center gap-2">
      <Slider value={value} onChange={setValue} {...args} />
      <p className="text-small text-default-500">
        Current volume: {Array.isArray(value) && value.join(" – ")}
      </p>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a number",
  },
};

export const ShowSteps = {
  render: Template,
  args: {
    ...defaultProps,
    step: 5,
    showSteps: true,
    label: "Select a number",
  },
};

export const Range = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: [20, 80],
    label: "Select a range",
    formatOptions: { currency: "USD", style: "currency" },
  },
};

export const FillOffset = {
  render: Template,
  args: {
    ...defaultProps,
    maxValue: 50,
    minValue: -50,
    fillOffset: 0,
    defaultValue: 20,
    label: "Select a value",
  },
};

export const WithMarks = {
  render: Template,
  args: {
    ...defaultProps,
    step: 0.1,
    maxValue: 1,
    minValue: 0,
    defaultValue: 0.2,
    label: "Select a value",
    formatOptions: { style: "percent" },
    marks: [
      {
        value: 0.2,
        label: "20%",
      },
      {
        value: 0.5,
        label: "50%",
      },
      {
        value: 0.8,
        label: "80%",
      },
    ],
  },
};

export const WithTooltip = {
  render: Template,
  args: {
    ...defaultProps,
    step: 0.1,
    maxValue: 1,
    minValue: 0,
    showTooltip: true,
    defaultValue: 0.2,
    label: "Select a value",
    formatOptions: { style: "percent" },
    marks: [
      {
        value: 0.2,
        label: "20%",
      },
      {
        value: 0.5,
        label: "50%",
      },
      {
        value: 0.8,
        label: "80%",
      },
    ],
  },
};

export const ThumbHidden = {
  render: Template,
  args: {
    ...defaultProps,
    step: 0.1,
    maxValue: 1,
    minValue: 0,
    hideThumb: true,
    defaultValue: 0.2,
    color: "foreground",
    "aria-label": "Player progress",
    marks: [
      {
        value: 0.2,
        label: "20%",
      },
      {
        value: 0.5,
        label: "50%",
      },
      {
        value: 0.8,
        label: "80%",
      },
    ],
  },
};

export const CustomGetValue = {
  render: Template,
  args: {
    ...defaultProps,
    size: "sm",
    maxValue: 60,
    label: "Donuts to buy",
    getValue: (donuts: number) => `${donuts} of 60 Donuts`,
  },
};

export const CustomRenderValue = {
  render: CustomValueTemplate,
  args: {
    ...defaultProps,
    size: "sm",
    step: 0.01,
    maxValue: 1,
    minValue: 0,
    label: "Temperature",
  },
};

export const CustomRenderThumb = {
  render: Template,
  args: {
    ...defaultProps,
    size: "sm",
    label: "Select brightness",
    classNames: {
      track: "border-s-secondary-100 gap-3",
      filler: ["bg-gradient-to-r from-secondary-100 to-secondary-500"],
    },
    renderThumb: (
      props: React.JSX.IntrinsicAttributes &
        React.HTMLAttributes<HTMLDivElement> &
        React.ClassAttributes<HTMLDivElement>
    ) => (
      <div
        {...props}
        className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400"
      >
        <span className="block size-5 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-500 shadow-small transition-transform group-data-[dragging=true]:scale-80" />
      </div>
    ),
  },
};

export const CustomRenderRangeThumb = {
  render: Template,
  args: {
    ...defaultProps,
    step: 10,
    size: "lg",
    maxValue: 1000,
    label: "Price Range",
    defaultValue: [100, 300],
    formatOptions: { currency: "USD", style: "currency" },
    classNames: {
      base: "gap-3",
      filler: ["bg-gradient-to-r from-pink-300 to-cyan-300"],
    },
    renderThumb: ({ index, ...props }: { index: number }) => (
      <div
        {...props}
        className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400"
      >
        <span
          className={clsx(
            "block size-5 rounded-full bg-gradient-to-br shadow-small transition-transform group-data-[dragging=true]:scale-80",
            index === 0
              ? "from-pink-200 to-pink-500"
              : "from-cyan-100 to-cyan-500"
          )}
        />
      </div>
    ),
  },
};

export const CustomRenderLabel = {
  render: Template,
  args: {
    ...defaultProps,
    step: 10,
    size: "lg",
    maxValue: 1000,
    label: "Price Range",
    defaultValue: [100, 300],
    formatOptions: { currency: "USD", style: "currency" },
    classNames: {
      base: "gap-3",
      filler: ["bg-gradient-to-r from-pink-300 to-cyan-300"],
    },
    renderLabel: ({ children, ...props }: { children: React.ReactNode }) => (
      <label {...props} className="flex items-center gap-2 text-medium">
        {children}
        <Tooltip
          placement="right"
          className="w-[200px] rounded-small"
          content="The price range you want to search for."
        >
          <span className="opacity-60 transition-opacity hover:opacity-100">
            <InfoIcon />
          </span>
        </Tooltip>
      </label>
    ),
    renderThumb: ({
      index,
      ...props
    }: {
      index: number;
      [key: string]: string | number;
    }) => (
      <div
        {...props}
        className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-1 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400"
      >
        <span
          className={clsx(
            "block size-5 rounded-full bg-gradient-to-br shadow-small transition-transform group-data-[dragging=true]:scale-80",
            index === 0
              ? "from-pink-200 to-pink-500"
              : "from-cyan-100 to-cyan-500"
          )}
        />
      </div>
    ),
  },
};

export const VerticalOrientation = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    defaultValue: 20,
    orientation: "vertical",
    "aria-label": "Select a value",
  },
};

export const WithMarksVerticalOrientation = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    step: 0.1,
    maxValue: 1,
    minValue: 0,
    defaultValue: 0.2,
    label: "Current value",
    orientation: "vertical",
    formatOptions: { style: "percent" },
    marks: [
      {
        value: 0.2,
        label: "20%",
      },
      {
        value: 0.5,
        label: "50%",
      },
      {
        value: 0.8,
        label: "80%",
      },
    ],
  },
};

export const VerticalWithSteps = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    step: 5,
    showSteps: true,
    defaultValue: 20,
    orientation: "vertical",
    "aria-label": "Select a value",
  },
};

export const WithStartAndEndContent = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: 20,
    "aria-label": "Volume",
    endContent: <VolumeHighBoldIcon className="text-2xl" />,
    startContent: <VolumeLowBoldIcon className="text-2xl" />,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
    "aria-label": "Volume",
    endContent: <VolumeHighBoldIcon className="text-2xl" />,
    startContent: <VolumeLowBoldIcon className="text-2xl" />,
  },
};

export const ControlledRange = {
  render: ControlledRangeTemplate,
  args: {
    ...defaultProps,
    label: "Select a budget",
    formatOptions: { currency: "USD", style: "currency" },
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
    step: 100,
    size: "md",
    maxValue: 1000,
    showSteps: true,
    showOutline: true,
    showTooltip: true,
    label: "Price Range",
    disableThumbScale: true,
    defaultValue: [100, 300],
    formatOptions: { currency: "USD", style: "currency" },
    tooltipValueFormatOptions: {
      currency: "USD",
      style: "currency",
      maximumFractionDigits: 0,
    },
  },
};
