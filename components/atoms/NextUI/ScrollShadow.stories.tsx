import React from "react";
import Lorem from "react-lorem-component";

import { button, scrollShadow } from "@nextui-org/theme";
import {
  ScrollShadow,
  ScrollShadowProps,
  ScrollShadowVisibility,
  ScrollShadowOrientation,
} from "@nextui-org/scroll-shadow";

import { Meta } from "@storybook/react";

export default {
  component: ScrollShadow,
  title: "Atoms/ScrollShadow",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    offset: {
      control: { type: "number" },
    },
    children: {
      table: {
        disable: true,
      },
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    visibility: {
      control: { type: "select" },
      options: ["auto", "top", "bottom", "both", "left", "right"],
    },
  },
} as Meta<typeof ScrollShadow>;

const defaultProps = {
  ...scrollShadow.defaultVariants,
  visible: "auto",
  children: <Lorem count={10} />,
  className: "w-[300px] h-[400px]",
};

const Template = (args: ScrollShadowProps) => <ScrollShadow {...args} />;

const ControlledTemplate = ({ children, ...args }: ScrollShadowProps) => {
  const [visible, setVisible] = React.useState<ScrollShadowVisibility>("top");
  const [orientation, setOrientation] =
    React.useState<ScrollShadowOrientation>("vertical");

  const states: Record<ScrollShadowOrientation, ScrollShadowVisibility[]> = {
    ["vertical"]: ["top", "bottom", "both"],
    ["horizontal"]: ["left", "right", "both"],
  };

  const orientationStates: ScrollShadowOrientation[] = [
    "vertical",
    "horizontal",
  ];

  return (
    <div className="flex flex-col gap-3">
      <ScrollShadow
        {...args}
        visible={visible}
        orientation={orientation}
        className={
          orientation === "horizontal"
            ? "max-h-[400px] max-w-[300px]"
            : args.className
        }
      >
        {orientation === "horizontal" ? (
          <div className="w-[800px]">{children}</div>
        ) : (
          children
        )}
      </ScrollShadow>
      <p className="text-default-500">Orientation: {orientation}</p>
      <p className="text-default-500">Visible state: {visible}</p>
      <div className="mt-2 flex gap-2">
        {orientationStates.map((o) => (
          <button
            key={o}
            className={button({
              color: orientation === o ? "primary" : "default",
            })}
            onClick={() => {
              if (o === "horizontal") {
                setVisible("left");
              } else {
                setVisible("top");
              }
              setOrientation(o);
            }}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {states[orientation].map((state) => (
          <button
            key={state}
            onClick={() => setVisible(state)}
            className={button({
              color: visible === state ? "primary" : "default",
            })}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const HideScrollBar = {
  render: Template,
  args: {
    ...defaultProps,
    hideScrollBar: true,
  },
};

export const CustomShadowSize = {
  render: Template,
  args: {
    ...defaultProps,
    size: 100,
  },
};

export const HorizontalOrientation = {
  render: Template,
  args: {
    ...defaultProps,
    orientation: "horizontal",
    className: "max-w-[400px] max-h-[500px]",
    children: (
      <div className="w-[800px]">
        <Lorem count={10} />,
      </div>
    ),
  },
};

export const ShadowOffset = {
  render: Template,
  args: {
    ...defaultProps,
    offset: 100,
    orientation: "horizontal",
    className: "max-w-[400px] max-h-[500px]",
    children: (
      <div className="w-[800px]">
        <Lorem count={10} />,
      </div>
    ),
  },
};
