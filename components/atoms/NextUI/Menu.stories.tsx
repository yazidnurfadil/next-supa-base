import React from "react";

import { menuItem } from "@heroui/theme";
import { clsx } from "@heroui/shared-utils";
import { Menu, MenuItem, MenuProps, MenuSection } from "@heroui/menu";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

import type { Key } from "@react-types/shared";

export default {
  component: Menu,
  title: "Atoms/Menu",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="w-full max-w-[260px] rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
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
  },
} as Meta<typeof Menu>;

const defaultProps = {
  ...menuItem.defaultVariants,
};

const Template = ({ color, variant, ...args }: MenuProps) => (
  <Menu
    color={color}
    onAction={alert}
    variant={variant}
    aria-label="Actions"
    {...args}
  >
    <MenuItem key="new">New file</MenuItem>
    <MenuItem key="copy">Copy link</MenuItem>
    <MenuItem key="edit">Edit file</MenuItem>
    <MenuItem key="delete" color="danger" className="text-danger">
      Delete file
    </MenuItem>
  </Menu>
);

const DisabledKeysTemplate = ({ color, variant, ...args }: MenuProps) => (
  <Menu
    color={color}
    onAction={alert}
    variant={variant}
    aria-label="Actions"
    disabledKeys={["edit", "delete"]}
    {...args}
  >
    <MenuItem key="new">New file</MenuItem>
    <MenuItem key="copy">Copy link</MenuItem>
    <MenuItem key="edit">Edit file</MenuItem>
    <MenuItem key="delete" color="danger" className="text-danger">
      Delete file
    </MenuItem>
  </Menu>
);

const SingleSelectionTemplate = ({ color, variant, ...args }: MenuProps) => {
  const [selected, setSelected] = React.useState<Set<Key> | string>(
    new Set(["text"])
  );

  return (
    <Menu
      color={color}
      variant={variant}
      aria-label="Actions"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      {...args}
    >
      <MenuItem key="text">Text</MenuItem>
      <MenuItem key="number">Number</MenuItem>
      <MenuItem key="date">Date</MenuItem>
      <MenuItem key="single_date">Single Date</MenuItem>
      <MenuItem key="iteration">Iteration</MenuItem>
    </Menu>
  );
};

const MultipleSelectionTemplate = ({ color, variant, ...args }: MenuProps) => {
  const [selected, setSelected] = React.useState<Set<Key> | string>(
    new Set(["text"])
  );

  return (
    <Menu
      color={color}
      variant={variant}
      aria-label="Actions"
      closeOnSelect={false}
      disallowEmptySelection
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={setSelected}
      {...args}
    >
      <MenuItem key="text">Text</MenuItem>
      <MenuItem key="number">Number</MenuItem>
      <MenuItem key="date">Date</MenuItem>
      <MenuItem key="single_date">Single Date</MenuItem>
      <MenuItem key="iteration">Iteration</MenuItem>
    </Menu>
  );
};

const WithShortcutTemplate = ({ color, variant, ...args }: MenuProps) => (
  <Menu
    color={color}
    onAction={alert}
    variant={variant}
    aria-label="Actions"
    {...args}
  >
    <MenuItem key="new" shortcut="⌘N">
      New file
    </MenuItem>
    <MenuItem key="copy" shortcut="⌘C">
      Copy link
    </MenuItem>
    <MenuItem key="edit" shortcut="⌘⇧E">
      Edit file
    </MenuItem>
    <MenuItem
      key="delete"
      color="danger"
      shortcut="⌘⇧D"
      className="text-danger"
    >
      Delete file
    </MenuItem>
  </Menu>
);

const WithStartContentTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: MenuProps) => {
  const iconClasses =
    "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Menu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
      disableAnimation={disableAnimation}
      {...args}
    >
      <MenuItem
        key="new"
        shortcut="⌘N"
        startContent={<AddNoteBulkIcon className={iconClasses} />}
      >
        New file
      </MenuItem>
      <MenuItem
        key="copy"
        shortcut="⌘C"
        startContent={<CopyDocumentBulkIcon className={iconClasses} />}
      >
        Copy link
      </MenuItem>
      <MenuItem
        key="edit"
        shortcut="⌘⇧E"
        startContent={<EditDocumentBulkIcon className={iconClasses} />}
      >
        Edit file
      </MenuItem>
      <MenuItem
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
      </MenuItem>
    </Menu>
  );
};

const WithEndContentTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: MenuProps) => {
  const iconClasses =
    "text-2xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Menu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
      disableAnimation={disableAnimation}
      {...args}
    >
      <MenuItem
        key="new"
        endContent={<AddNoteBulkIcon className={iconClasses} />}
      >
        New file
      </MenuItem>
      <MenuItem
        key="copy"
        endContent={<CopyDocumentBulkIcon className={iconClasses} />}
      >
        Copy link
      </MenuItem>
      <MenuItem
        key="edit"
        endContent={<EditDocumentBulkIcon className={iconClasses} />}
      >
        Edit file
      </MenuItem>
      <MenuItem
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
      </MenuItem>
    </Menu>
  );
};

const WithDescriptionTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: MenuProps) => {
  const iconClasses =
    "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Menu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
      disableAnimation={disableAnimation}
      {...args}
    >
      <MenuItem
        key="new"
        shortcut="⌘N"
        description="Create a new file"
        startContent={<AddNoteBulkIcon className={iconClasses} />}
      >
        New file
      </MenuItem>
      <MenuItem
        key="copy"
        shortcut="⌘C"
        description="Copy the file link"
        startContent={<CopyDocumentBulkIcon className={iconClasses} />}
      >
        Copy link
      </MenuItem>
      <MenuItem
        key="edit"
        shortcut="⌘⇧E"
        description="Allows you to edit the file"
        startContent={<EditDocumentBulkIcon className={iconClasses} />}
      >
        Edit file
      </MenuItem>
      <MenuItem
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
      </MenuItem>
    </Menu>
  );
};

const WithSectionsTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: MenuProps) => {
  const iconClasses =
    "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Menu
      color={color}
      onAction={alert}
      variant={variant}
      aria-label="Actions"
      closeOnSelect={false}
      disableAnimation={disableAnimation}
      {...args}
    >
      <MenuSection title="Actions">
        <MenuItem
          key="new"
          shortcut="⌘N"
          description="Create a new file"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </MenuItem>
        <MenuItem
          key="copy"
          shortcut="⌘C"
          description="Copy the file link"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </MenuItem>
        <MenuItem
          key="edit"
          shortcut="⌘⇧E"
          description="Allows you to edit the file"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </MenuItem>
      </MenuSection>
      <MenuSection title="Danger zone">
        <MenuItem
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
        </MenuItem>
      </MenuSection>
    </Menu>
  );
};

export const Default = {
  render: Template,
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
