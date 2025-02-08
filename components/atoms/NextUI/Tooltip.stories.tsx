import React from "react";

import { Button } from "@heroui/button";
import { popover } from "@heroui/theme";
import { Tooltip, TooltipProps } from "@heroui/tooltip";

import { Meta } from "@storybook/react";

export default {
  component: Tooltip,
  title: "Atoms/Tooltip",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    delay: {
      control: {
        type: "number",
      },
    },
    offset: {
      control: {
        type: "number",
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
    showArrow: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    defaultOpen: {
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
      options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "foreground",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
    placement: {
      control: {
        type: "select",
      },
      options: [
        "top",
        "bottom",
        "right",
        "left",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
    },
  },
} as Meta<typeof Tooltip>;

const defaultProps = {
  ...popover.defaultVariants,
  delay: 0,
  offset: 7,
  placement: "top",
  isDisabled: false,
  defaultOpen: false,
  content: "I am a tooltip",
  children: <Button>Hover me</Button>,
};

const DelayTemplate = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} delay={1000} content="Tooltip 1">
      <Button color="success" variant="faded">
        Delay Open (1000ms)
      </Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={2000} content="Tooltip 2">
      <Button color="success" variant="faded">
        Delay Close (2000ms)
      </Button>
    </Tooltip>
  </div>
);

const OpenChangeTemplate = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Tooltip {...args} onOpenChange={(open) => setIsOpen(open)}>
        <Button>Hover me</Button>
      </Tooltip>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

const OffsetTemplate = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1">
      <Button variant="faded" color="secondary">
        Default offset (7)
      </Button>
    </Tooltip>
    <Tooltip {...args} offset={15} content="Tooltip 2">
      <Button variant="faded" color="secondary">
        15 offset
      </Button>
    </Tooltip>
    <Tooltip {...args} offset={-7} content="Tooltip 3">
      <Button variant="faded" color="secondary">
        -7 offset
      </Button>
    </Tooltip>
  </div>
);

const MultipleTemplate = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} delay={1000} content="Tooltip 1">
      <Button>Hover me (delay 1000ms)</Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 2">
      <Button>Then hover me</Button>
    </Tooltip>
  </div>
);

const PlacementsTemplate = (args: TooltipProps) => {
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <Tooltip {...args} content="Top Start" placement="top-start">
        <Button variant="flat" color="primary">
          Top Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Top">
        <Button variant="flat" color="primary">
          Top
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Top End" placement="top-end">
        <Button variant="flat" color="primary">
          Top End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom Start" placement="bottom-start">
        <Button variant="flat" color="primary">
          Bottom Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom" placement="bottom">
        <Button variant="flat" color="primary">
          Bottom
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom End" placement="bottom-end">
        <Button variant="flat" color="primary">
          Bottom End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right Start" placement="right-start">
        <Button variant="flat" color="primary">
          Right Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right" placement="right">
        <Button variant="flat" color="primary">
          Right
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right End" placement="right-end">
        <Button variant="flat" color="primary">
          Right End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left Start" placement="left-start">
        <Button variant="flat" color="primary">
          Left Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left" placement="left">
        <Button variant="flat" color="primary">
          Left
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left End" placement="left-end">
        <Button variant="flat" color="primary">
          Left End
        </Button>
      </Tooltip>
    </div>
  );
};

const ControlledTemplate = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("handleOpen");
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Tooltip {...args} isOpen={isOpen} content="Tooltip 1">
        <Button onPress={handleOpen}>{isOpen ? "Close" : "Open"}</Button>
      </Tooltip>
    </div>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const WithArrow = {
  args: {
    ...defaultProps,
    showArrow: true,
  },
};

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
  },
};

export const Placements = {
  render: PlacementsTemplate,

  args: {
    ...defaultProps,
    color: "primary",
  },
};

export const WithOffset = {
  render: OffsetTemplate,

  args: {
    ...defaultProps,
    color: "secondary",
  },
};

export const withDelay = {
  render: DelayTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomContent = {
  args: {
    ...defaultProps,
    shouldCloseOnInteractOutside: false,
    content: (
      <div className="px-1 py-2">
        <div className="text-sm font-bold">Custom Content</div>
        <div className="text-xs">This is a custom tooltip content</div>
      </div>
    ),
  },
};

export const CustomMotion = {
  args: {
    ...defaultProps,
    motionProps: {
      variants: {
        exit: {
          opacity: 0,
          transition: {
            opacity: { duration: 0.1, easings: "easeInOut" },
          },
        },
        enter: {
          opacity: 1,
          transition: {
            opacity: { duration: 0.15, easings: "easeOut" },
          },
        },
      },
    },
  },
};

export const Multiple = {
  render: MultipleTemplate,

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

export const DefaultOpen = {
  args: {
    ...defaultProps,
    defaultOpen: true,
  },
};

export const AlwaysOpen = {
  args: {
    ...defaultProps,
    isOpen: true,
    showArrow: true,
    content: (
      <div className="px-1 py-2">
        <div className="text-sm font-bold">Custom Content</div>
        <div className="text-xs">This is a custom tooltip content</div>
      </div>
    ),
  },
};

export const Disabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};
