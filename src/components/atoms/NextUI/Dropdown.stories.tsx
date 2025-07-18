import React from "react";

import { User } from "@heroui/user";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { clsx } from "@heroui/shared-utils";
import { popover, dropdown } from "@heroui/theme";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@heroui/shared-icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownProps,
  DropdownSection,
  DropdownTrigger,
  DropdownMenuProps,
} from "@heroui/dropdown";

import { Meta } from "@storybook/react";

import type { Key } from "@react-types/shared";

export default {
  component: Dropdown,
  title: "Atoms/Dropdown",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
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
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
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
} as Meta<typeof Dropdown>;

const defaultProps = {
  ...popover.defaultVariants,
  ...dropdown.defaultVariants,
  offset: 7,
  isDisabled: false,
  defaultOpen: false,
  placement: "bottom",
};

const items = [
  {
    key: "new",
    label: "New file",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },
];

const Template = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu color={color} variant={variant} aria-label="Actions">
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" color="danger" className="text-danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const ItemCloseOnSelectTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <>
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>Trigger</Button>
      </DropdownTrigger>
      <DropdownMenu color={color} variant={variant} aria-label="Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          closeOnSelect={false}
          className="text-danger"
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>Trigger</Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        variant={variant}
        aria-label="Actions"
        closeOnSelect={false}
      >
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" color="danger" className="text-danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);

const DynamicTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      color={color}
      items={items}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
    >
      {(item) => (
        <DropdownItem
          key={item.key}
          color={item.key === "delete" ? "danger" : "default"}
          className={item.key === "delete" ? "text-danger" : ""}
        >
          {item.label}
        </DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>
);

const DividerTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
    >
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit" showDivider>
        Edit file
      </DropdownItem>
      <DropdownItem key="delete" color="danger" className="text-danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const DisabledKeysTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
      disabledKeys={["edit", "delete"]}
    >
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" color="danger" className="text-danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const SingleSelectionTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const [selected, setSelected] = React.useState<Set<Key> | string>(
    new Set(["text"])
  );

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [selected]
  );

  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        variant={variant}
        aria-label="Actions"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const MultipleSelectionTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const [selected, setSelected] = React.useState<Set<Key> | string>(
    new Set(["text"])
  );

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [selected]
  );

  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        variant={variant}
        aria-label="Actions"
        closeOnSelect={false}
        disallowEmptySelection
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={setSelected}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithShortcutTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & {
  color: DropdownMenuProps["color"];
  variant: DropdownMenuProps["variant"];
}) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
    >
      <DropdownItem key="new" shortcut="⌘N">
        New file
      </DropdownItem>
      <DropdownItem key="copy" shortcut="⌘C">
        Copy link
      </DropdownItem>
      <DropdownItem key="edit" shortcut="⌘⇧E">
        Edit file
      </DropdownItem>
      <DropdownItem
        key="delete"
        color="danger"
        shortcut="⌘⇧D"
        className="text-danger"
      >
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const WithStartContentTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const iconClasses =
    "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button
          variant="flat"
          color="secondary"
          disableAnimation={disableAnimation}
        >
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        onAction={alert}
        variant={variant}
        aria-label="Actions"
      >
        <DropdownItem
          key="new"
          shortcut="⌘N"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          shortcut="⌘⇧D"
          className="text-danger"
          startContent={
            <DeleteDocumentBulkIcon
              className={clsx(iconClasses, "!text-danger")}
            />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithEndContentTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const iconClasses =
    "text-2xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button
          color="success"
          variant="faded"
          disableAnimation={disableAnimation}
        >
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        onAction={alert}
        variant={variant}
        aria-label="Actions"
      >
        <DropdownItem
          key="new"
          endContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          endContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          endContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          className="text-danger"
          endContent={
            <DeleteDocumentBulkIcon
              className={clsx(iconClasses, "!text-danger")}
            />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithDescriptionTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const iconClasses =
    "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button
          variant="flat"
          color="secondary"
          disableAnimation={disableAnimation}
        >
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        onAction={alert}
        variant={variant}
        aria-label="Actions"
      >
        <DropdownItem
          key="new"
          shortcut="⌘N"
          description="Create a new file"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          description="Copy the file link"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          description="Allows you to edit the file"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          shortcut="⌘⇧D"
          className="text-danger"
          description="Permanently delete the file"
          startContent={
            <DeleteDocumentBulkIcon
              className={clsx(iconClasses, "!text-danger")}
            />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithSectionsTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const iconClasses =
    "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button
          variant="flat"
          color="secondary"
          disableAnimation={disableAnimation}
        >
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color={color}
        onAction={alert}
        variant={variant}
        aria-label="Actions"
        closeOnSelect={false}
      >
        <DropdownSection title="Actions">
          <DropdownItem
            key="new"
            shortcut="⌘N"
            description="Create a new file"
            startContent={<AddNoteBulkIcon className={iconClasses} />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            shortcut="⌘C"
            description="Copy the file link"
            startContent={<CopyDocumentBulkIcon className={iconClasses} />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            description="Allows you to edit the file"
            startContent={<EditDocumentBulkIcon className={iconClasses} />}
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            color="danger"
            shortcut="⌘⇧D"
            className="text-danger"
            description="Permanently delete the file"
            startContent={
              <DeleteDocumentBulkIcon
                className={clsx(iconClasses, "!text-danger")}
              />
            }
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

const CustomTriggerTemplate = ({
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  return (
    <div className="flex items-center gap-10">
      <Dropdown {...args} placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            size="md"
            isBordered
            as="button"
            color="secondary"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu
          color="secondary"
          variant={variant}
          aria-label="Profile Actions"
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown {...args} placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            name="Tony Reichert"
            description="@tonyreichert"
            className="transition-transform"
            avatarProps={{
              size: "md",
              isBordered: true,
              color: "primary",
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
          />
        </DropdownTrigger>
        <DropdownMenu
          color="primary"
          variant={variant}
          aria-label="User Actions"
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const CustomHTMLTrigger = ({
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <span className="flex items-center gap-2">Profile</span>
      </DropdownTrigger>
      <DropdownMenu variant={variant} aria-label="Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" color="danger" className="text-danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Dynamic = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithArrow = {
  render: Template,

  args: {
    ...defaultProps,
    showArrow: true,
  },
};

export const WithDivider = {
  render: DividerTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisabledKeys = {
  render: DisabledKeysTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisabledTrigger = {
  render: Template,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const SingleSelection = {
  render: SingleSelectionTemplate,

  args: {
    ...defaultProps,
  },
};

export const MultipleSelection = {
  args: {
    ...defaultProps,
  },

  render: MultipleSelectionTemplate,
};

export const WithShortcut = {
  render: WithShortcutTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: WithStartContentTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,

  args: {
    ...defaultProps,
    variant: "faded",
    color: "success",
  },
};

export const WithDescription = {
  render: WithDescriptionTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    className: "min-w-[240px]",
  },
};

export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    className: "min-w-[240px]",
  },
};

export const WithCustomTrigger = {
  render: CustomTriggerTemplate,

  args: {
    ...defaultProps,
    offset: 14,
    variant: "flat",
  },
};

export const WithCustomHTMLTrigger = {
  render: CustomHTMLTrigger,

  args: {
    ...defaultProps,
    offset: 14,
    variant: "flat",
  },
};

export const DisableAnimation = {
  render: WithStartContentTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    variant: "flat",
    color: "secondary",
    disableAnimation: true,
  },
};

export const ItemCloseOnSelect = {
  args: {
    ...defaultProps,
  },

  render: ItemCloseOnSelectTemplate,
};
