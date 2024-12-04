import { Avatar, AvatarGroup, AvatarGroupProps } from "@nextui-org/avatar";

import { Meta } from "@storybook/react";

export default {
  component: AvatarGroup,
  title: "Atoms/AvatarGroup",
  argTypes: {
    spacing: {
      control: {
        disable: true,
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
    color: {
      control: { type: "select" },
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
} as Meta<typeof AvatarGroup>;

const Template = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026705d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026706d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026707d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026709d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026711d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026713d" />
  </AvatarGroup>
);

const CustomSlotsTemplate = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar
      size="sm"
      radius="sm"
      classNames={{ base: "border-2 border-yellow-400" }}
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      size="sm"
      radius="sm"
      classNames={{ base: "border-2 border-yellow-500" }}
      src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
    />
    <Avatar
      size="sm"
      radius="sm"
      classNames={{ base: "border-2 border-yellow-600" }}
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />
    <Avatar
      size="sm"
      radius="sm"
      classNames={{ base: "border-2 border-yellow-700" }}
      src="https://i.pravatar.cc/150?u=a04258114e29026302d"
    />
    <Avatar
      size="sm"
      radius="sm"
      classNames={{ base: "border-2 border-yellow-500" }}
      src="https://i.pravatar.cc/150?u=a04258114e29026702d"
    />
    <Avatar
      size="sm"
      radius="sm"
      classNames={{ base: "border-2 border-yellow-500" }}
      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
    />
  </AvatarGroup>
);

export const Default = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
  },
};

export const Grid = {
  render: Template,

  args: {
    max: 7,
    isGrid: true,
    color: "primary",
    isBordered: true,
  },
};

export const isDisabled = {
  render: Template,

  args: {
    color: "warning",
    isBordered: true,
    isDisabled: true,
  },
};

export const WithMaxCount = {
  render: Template,

  args: {
    max: 3,
    color: "primary",
    isBordered: true,
  },
};

export const WithTotal = {
  render: Template,

  args: {
    max: 3,
    total: 10,
    color: "primary",
    isBordered: true,
  },
};

export const CustomCount = {
  render: Template,

  args: {
    max: 3,
    total: 10,
    color: "primary",
    isBordered: true,
    renderCount: (count: number) => (
      <p className="ms-2 text-sm text-black dark:text-white">+{count}</p>
    ),
  },
};

export const CustomSlots = {
  render: CustomSlotsTemplate,

  args: {
    max: 3,
    size: "sm",
    radius: "sm",
    classNames: { count: "border-2 border-yellow-400" },
  },
};
