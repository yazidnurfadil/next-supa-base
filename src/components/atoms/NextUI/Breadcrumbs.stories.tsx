import React from "react";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { clsx } from "@heroui/shared-utils";
import { breadcrumbItem } from "@heroui/theme";
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbsProps,
} from "@heroui/breadcrumbs";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  InfoIcon,
  CheckIcon,
  PetBoldIcon,
  HeadphonesIcon,
  MailFilledIcon,
  ChevronDownIcon,
  ShoppingCartBoldIcon,
} from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

export default {
  component: Breadcrumbs,
  title: "Atoms/Breadcrumbs",
  argTypes: {
    page: {
      control: {
        type: "number",
      },
    },
    maxItems: {
      control: {
        type: "number",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    itemsAfterCollapse: {
      control: {
        type: "number",
      },
    },
    itemsBeforeCollapse: {
      control: {
        type: "number",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["solid", "bordered", "light"],
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
} as Meta<typeof Breadcrumbs>;

const defaultProps = {
  ...breadcrumbItem.defaultVariants,
  variant: "light",
};

const Template = (args: BreadcrumbsProps & { page: number }) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
      Home
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
      Music
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
      Artist
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
      Album
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5">
      Song
    </BreadcrumbItem>
  </Breadcrumbs>
);

const ControlledTemplate = (args: BreadcrumbsProps & { page: number }) => {
  const [currentPage, setCurrentPage] = React.useState<React.Key>("song");

  return (
    <Breadcrumbs {...args} onAction={(key) => setCurrentPage(key)}>
      <BreadcrumbItem key="home" isCurrent={currentPage === "home"}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
        Music
      </BreadcrumbItem>
      <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
        Album
      </BreadcrumbItem>
      <BreadcrumbItem key="song" isCurrent={currentPage === "song"}>
        Song
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

const MenuTypeTemplate = (args: BreadcrumbsProps & { page: number }) => {
  const [currentPage, setCurrentPage] = React.useState<React.Key>("music");

  return (
    <Breadcrumbs
      {...args}
      onAction={(key) => setCurrentPage(key)}
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        separator: "hidden",
        item: [
          "px-2 py-0.5 border-small border-default-400 rounded-small",
          "data-[current='true']:border-foreground transition-colors",
          "data-[disabled='true']:border-default-400 data-[disabled='true']:bg-default-100",
        ],
      }}
    >
      <BreadcrumbItem key="home" isCurrent={currentPage === "home"}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
        Music
      </BreadcrumbItem>
      <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
        Album
      </BreadcrumbItem>
      <BreadcrumbItem key="song" isDisabled isCurrent={currentPage === "song"}>
        Song
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

const WithStartContentTemplate = (
  args: BreadcrumbsProps & { page: number }
) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem
      startContent={<PetBoldIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1"
    >
      Home
    </BreadcrumbItem>
    <BreadcrumbItem
      startContent={<HeadphonesIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2"
    >
      Music
    </BreadcrumbItem>
    <BreadcrumbItem
      startContent={<InfoIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3"
    >
      Artist
    </BreadcrumbItem>
    <BreadcrumbItem
      startContent={<CheckIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4"
    >
      Album
    </BreadcrumbItem>
    <BreadcrumbItem
      startContent={<MailFilledIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5"
    >
      Song
    </BreadcrumbItem>
  </Breadcrumbs>
);

const WithEndContentTemplate = (args: BreadcrumbsProps & { page: number }) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem
      endContent={<PetBoldIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1"
    >
      Home
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<HeadphonesIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2"
    >
      Music
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<InfoIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3"
    >
      Artist
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<CheckIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4"
    >
      Album
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<MailFilledIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5"
    >
      Song
    </BreadcrumbItem>
  </Breadcrumbs>
);

const WithDropdownEllipsisTemplate = (
  args: BreadcrumbsProps & { page: number }
) => (
  <Breadcrumbs
    {...args}
    renderEllipsis={({ items, separator, ellipsisIcon }) => (
      <div className="flex items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              isIconOnly
              variant="flat"
              className="size-6 min-w-6"
            >
              {ellipsisIcon}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Routes">
            {items.map((item, index) => (
              <DropdownItem key={index} href={item.href}>
                {item.children}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {separator}
      </div>
    )}
  >
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
      Electronics
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
      GPS
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
      Finders
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
      Accessories
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5">
      Bluetooth
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:6">
      Remote Controls
    </BreadcrumbItem>
  </Breadcrumbs>
);

const WithDropdownItemTemplate = (
  args: BreadcrumbsProps & { page: number }
) => {
  const sizeMap = {
    sm: "text-tiny",
    md: "text-small",
    lg: "text-medium",
  };

  return (
    <Breadcrumbs
      {...args}
      itemClasses={{
        item: "px-2",
        separator: "px-0",
      }}
    >
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
        Music
      </BreadcrumbItem>
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
        Album
      </BreadcrumbItem>
      <BreadcrumbItem
        classNames={{
          item: "px-0",
        }}
        href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5"
      >
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              radius="full"
              variant="light"
              className={clsx("h-6 pr-2", args.size && sizeMap[args.size])}
              endContent={<ChevronDownIcon className="text-default-500" />}
            >
              Songs
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Routes">
            <DropdownItem
              key={0}
              href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1"
            >
              Song 1
            </DropdownItem>
            <DropdownItem
              key={1}
              href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2"
            >
              Song 2
            </DropdownItem>
            <DropdownItem
              key={2}
              href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3"
            >
              Song 3
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

const CustomStylesTemplate = (args: BreadcrumbsProps & { page: number }) => (
  <Breadcrumbs
    {...args}
    variant="solid"
    classNames={{
      list: "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-small",
    }}
    itemClasses={{
      separator: "text-white/40",
      item: "text-white/60 data-[current=true]:text-white",
    }}
  >
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
      <Tooltip size="sm" content="Shopping Cart">
        <ShoppingCartBoldIcon />
      </Tooltip>
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
      Checkout
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
      Payment
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
      Delivery Address
    </BreadcrumbItem>
  </Breadcrumbs>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const CustomSeparator = {
  render: Template,
  args: {
    ...defaultProps,
    separator: "/",
    itemClasses: {
      separator: "px-2",
    },
  },
};

export const ControlledCurrentItem = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const MenuType = {
  render: MenuTypeTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: WithStartContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithMaxItems = {
  render: Template,
  args: {
    ...defaultProps,
    maxItems: 3,
  },
};

export const WithDropdownEllipsis = {
  render: WithDropdownEllipsisTemplate,
  args: {
    ...defaultProps,
    maxItems: 3,
  },
};

export const WithItemsBeforeCollapse = {
  render: WithDropdownEllipsisTemplate,
  args: {
    ...defaultProps,
    maxItems: 3,
    itemsAfterCollapse: 1,
    itemsBeforeCollapse: 2,
  },
};

export const WithDropdownItem = {
  render: WithDropdownItemTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
  },
};
