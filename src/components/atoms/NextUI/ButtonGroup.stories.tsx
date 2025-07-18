import { button, buttonGroup } from "@heroui/theme";
import { Button, ButtonGroup, ButtonGroupProps } from "@heroui/button";

import { Meta } from "@storybook/react";

export default {
  component: ButtonGroup,
  title: "Atoms/ButtonGroup",
  argTypes: {
    fullWidth: {
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
      options: ["solid", "bordered", "light", "flat", "shadow", "ghost"],
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
} as Meta<typeof ButtonGroup>;

const defaultProps = {
  ...button.defaultVariants,
  ...buttonGroup.defaultVariants,
};

const Template = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
);

const VariantButtonTemplate = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
    <Button variant="bordered">Four</Button>
    <Button>Five</Button>
    <Button>Six</Button>
  </ButtonGroup>
);

const VariantButtonsTemplate = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button color="success" variant="bordered">
      One
    </Button>
    <Button color="success">Two</Button>
    <Button variant="bordered">Three</Button>
    <Button variant="bordered">Four</Button>
    <Button variant="bordered">Five</Button>
    <Button variant="bordered">Six</Button>
  </ButtonGroup>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const VariantButton = {
  render: VariantButtonTemplate,

  args: {
    ...defaultProps,
    variant: "solid",
  },
};

export const VariantButtons = {
  render: VariantButtonsTemplate,

  args: {
    ...defaultProps,
    variant: "solid",
  },
};
