import { tv, link } from "@heroui/theme";
import { Link, LinkProps } from "@heroui/link";

import { Meta } from "@storybook/react";

import type { VariantProps } from "@heroui/theme";

export default {
  component: Link,
  title: "Atoms/Link",
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
    underline: {
      control: {
        type: "select",
      },
      options: ["none", "hover", "always", "active", "focus"],
    },
    color: {
      control: {
        type: "select",
      },
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
} as Meta<typeof Link>;

const children = `"First solve the problem. Then, write the code." - Jon Johnson.`;

const defaultProps: Partial<LinkProps> = {
  ...link.defaultVariants,
  children,
  isDisabled: false,
  showAnchorIcon: true,
};

const Template = (args: LinkProps) => <Link {...args} href="#" />;

type ComponentType = {
  args: Partial<LinkProps>;
  render: (args: LinkProps) => React.JSX.Element;
};

export const Default: ComponentType = {
  render: Template,

  args: {
    ...defaultProps,
    size: "md",
    isDisabled: false,
    color: "foreground",
  },
};

export const Underline = Template.bind({}) as unknown as ComponentType;
Underline.args = {
  ...defaultProps,
  size: "md",
  isDisabled: false,
  underline: "always",
};

const CustomLink = () => (
  <svg
    fill="none"
    width="1em"
    height="1em"
    strokeWidth="2"
    className="ml-1"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const isExternal = Template.bind({}) as unknown as ComponentType;
isExternal.args = {
  ...defaultProps,
  isExternal: true,
};

export const CustomAnchor = Template.bind({}) as unknown as ComponentType;
CustomAnchor.args = {
  ...defaultProps,
  anchorIcon: <CustomLink />,
};

export const isBlock = Template.bind({}) as unknown as ComponentType;

isBlock.args = {
  ...defaultProps,
  size: "md",
  isBlock: true,
  isDisabled: false,
  color: "secondary",
};

const customLink = tv({
  variants: {
    color: {
      teal: "text-teal-600",
    },
    isLink: {
      true: "before:mr-1 before:content-['👉']",
    },
  },
});

type MyLinkVariantProps = VariantProps<typeof customLink>;

type MyLinkProps = MyLinkVariantProps & Omit<LinkProps, "color">;

const MyLink = (props: MyLinkProps) => {
  const { color, isLink, ...otherProps } = props;

  return (
    <Link
      isExternal={!!isLink}
      className={customLink({ color, isLink })}
      {...otherProps}
    />
  );
};

export const CustomVariant = () => {
  return (
    <MyLink isLink href="#" color="teal">
      Visit out new Store
    </MyLink>
  );
};
