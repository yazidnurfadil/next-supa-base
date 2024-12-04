import { badge } from "@nextui-org/theme";
import { Avatar } from "@nextui-org/avatar";
import { Switch } from "@nextui-org/switch";
import { Badge, BadgeProps } from "@nextui-org/badge";
import { CartIcon, CheckIcon, Notification } from "@nextui-org/shared-icons";

import { Meta } from "@storybook/react";

export default {
  component: Badge,
  title: "Atoms/Badge",
  argTypes: {
    content: {
      control: {
        type: "text",
      },
    },
    isInvisible: {
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
    shape: {
      options: ["rectangle", "circle"],
      control: {
        type: "select",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "flat", "faded", "shadow"],
    },
    placement: {
      control: {
        type: "select",
      },
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
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
} as Meta<typeof Badge>;

const defaultProps = {
  ...badge.defaultVariants,
  content: 5,
};

const Template = (args: BadgeProps) => (
  <Badge {...args}>
    <Avatar
      radius={args.shape === "rectangle" ? "lg" : "full"}
      src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
      isBordered={(args.classNames?.badge as string[])?.includes("bottom")}
    />
  </Badge>
);

const ShapesTemplate = (args: BadgeProps) => (
  <div className="flex items-center gap-4">
    <Badge {...args} shape="rectangle">
      <Avatar
        isBordered
        radius="lg"
        src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
      />
    </Badge>
    <Badge {...args} shape="circle">
      <Avatar
        isBordered
        radius="full"
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
      />
    </Badge>
  </div>
);

const InvisibleTemplate = (args: BadgeProps) => {
  const [isInvisible, setIsInvisible] = React.useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Badge
          {...args}
          content={5}
          color="danger"
          shape="circle"
          isInvisible={isInvisible}
        >
          <Notification size={30} className="fill-current" />
        </Badge>
        <Badge
          {...args}
          content={50}
          color="danger"
          shape="circle"
          isInvisible={isInvisible}
        >
          <CartIcon size={30} />
        </Badge>
      </div>
      <Switch
        isSelected={!isInvisible}
        onValueChange={(value) => setIsInvisible(!value)}
      >
        Show badge
      </Switch>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Dot = {
  render: Template,

  args: {
    ...defaultProps,
    size: "sm",
    content: "",
    color: "success",
  },
};

export const HorizontalOffset = {
  render: Template,

  args: {
    ...defaultProps,
    size: "md",
    variant: "shadow",
    color: "secondary",
    content: <CheckIcon />,
    placement: "bottom-right",
    classNames: {
      badge: "p-0.5 right-[50%]",
    },
  },
};

export const VerticalOffset = {
  render: Template,

  args: {
    ...defaultProps,
    size: "md",
    variant: "shadow",
    color: "secondary",
    content: <CheckIcon />,
    placement: "bottom-right",
    classNames: {
      badge: "p-0.5 right-[50%] bottom-[50%]",
    },
  },
};

export const Shapes = {
  render: ShapesTemplate,

  args: {
    ...defaultProps,
    color: "danger",
  },
};

export const Invisible = {
  render: InvisibleTemplate,

  args: {
    ...defaultProps,
    color: "danger",
  },
};
