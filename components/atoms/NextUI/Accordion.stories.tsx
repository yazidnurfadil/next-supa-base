import React from "react";

import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { button, accordionItem } from "@heroui/theme";
import {
  Accordion,
  AccordionItem,
  AccordionProps,
  AccordionItemProps,
} from "@heroui/accordion";
import {
  SunIcon,
  InfoIcon,
  MoonIcon,
  AnchorIcon,
  InvalidCardIcon,
  MonitorMobileIcon,
  ShieldSecurityIcon,
} from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

import type { Selection } from "@react-types/shared";

export default {
  component: Accordion,
  title: "Atoms/Accordion",
  argTypes: {
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
    selectionMode: {
      options: ["single", "multiple"],
      control: {
        type: "select",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "shadow", "bordered", "splitted"],
    },
  },
} as Meta<typeof Accordion>;

const defaultProps = {
  ...accordionItem.defaultVariants,
  selectionMode: "single",
};

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Template = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="1" title="Accordion 1" aria-label="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="2" title="Accordion 2" aria-label="Accordion 2">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" title="Accordion 3" aria-label="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithSubtitle = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem
      key="1"
      title="Accordion 1"
      aria-label="Accordion 1"
      subtitle="Press to expand"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="2"
      title="Accordion 2"
      aria-label="Accordion 2"
      subtitle={
        <span>
          Press to expand <strong>key 2</strong>
        </span>
      }
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="3"
      title="Accordion 3"
      aria-label="Accordion 3"
      subtitle="Press to expand"
    >
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithStartContent = (args: AccordionProps) => (
  <Accordion {...args} variant="shadow">
    <AccordionItem
      key="1"
      title="Chung Miller"
      aria-label="Chung Miller"
      subtitle="4 unread messages"
      startContent={
        <Avatar
          isBordered
          radius="lg"
          color="primary"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      }
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="2"
      title="Janelle Lenard"
      aria-label="Janelle Lenard"
      subtitle="3 incompleted steps"
      startContent={
        <Avatar
          isBordered
          radius="lg"
          color="success"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      }
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="3"
      title="Zoey Lang"
      aria-label="Zoey Lang"
      subtitle={
        <p className="flex">
          2 issues to&nbsp;<span className="text-primary">fix now</span>
        </p>
      }
      startContent={
        <Avatar
          isBordered
          radius="lg"
          color="warning"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      }
    >
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const VariantsTemplate = (args: AccordionProps) => (
  <div className="mb-24 flex flex-col gap-8">
    <div className="flex flex-col gap-4">
      <h3>Default</h3>
      <Accordion {...args}>
        <AccordionItem key="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Shadow</h3>
      <Accordion {...args} variant="shadow">
        <AccordionItem key="1" title="Accordion 1" aria-label="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2" aria-label="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3" aria-label="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Bordered</h3>
      <Accordion {...args} variant="bordered">
        <AccordionItem key="1" title="Accordion 1" aria-label="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2" aria-label="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3" aria-label="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Splitted</h3>
      <Accordion {...args} variant="splitted">
        <AccordionItem key="1" title="Accordion 1" aria-label="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2" aria-label="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3" aria-label="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

const CustomInidicatorTemplate = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem
      key="anchor"
      title="Anchor"
      aria-label="Anchor"
      indicator={<AnchorIcon />}
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="moon"
      title="Moon"
      aria-label="Moon"
      indicator={<MoonIcon />}
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="sun"
      title="Sun"
      aria-label="Sun"
      indicator={<SunIcon />}
    >
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const ControlledTemplate = (args: AccordionProps) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["1"])
  );

  console.log(selectedKeys);

  return (
    <div className="flex flex-col gap-4">
      <Accordion {...args} selectedKeys={selectedKeys}>
        <AccordionItem key="1" title="Accordion 1" aria-label="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2" aria-label="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3" aria-label="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2">
        <Button
          onPress={() => {
            setSelectedKeys(new Set(["1"]));
          }}
        >
          Open 1
        </Button>
        <Button
          onPress={() => {
            setSelectedKeys(new Set(["2"]));
          }}
        >
          Open 2
        </Button>
        <Button
          onPress={() => {
            setSelectedKeys(new Set(["3"]));
          }}
        >
          Open 3
        </Button>
      </div>
    </div>
  );
};

const CustomWithClassNamesTemplate = (args: AccordionProps) => {
  const itemClasses: AccordionItemProps["classNames"] = {
    base: "py-0 w-full",
    indicator: "text-base",
    content: "text-sm px-2",
    title: "font-normal text-base",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
  };

  return (
    <Accordion
      {...args}
      variant="shadow"
      showDivider={false}
      className="flex w-full max-w-[300px] flex-col gap-1 p-2"
    >
      <AccordionItem
        key="1"
        classNames={itemClasses}
        title="Connected devices"
        aria-label="Connected devices"
        startContent={<MonitorMobileIcon className="text-primary" />}
        subtitle={
          <p className="flex">
            2 issues to&nbsp;<span className="text-primary">fix now</span>
          </p>
        }
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="2"
        classNames={itemClasses}
        title="Apps Permissions"
        aria-label="Apps Permissions"
        startContent={<ShieldSecurityIcon />}
        subtitle="3 apps have read permissions"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        title="Pending tasks"
        aria-label="Pending tasks"
        subtitle="Complete your profile"
        startContent={<InfoIcon className="text-warning" />}
        classNames={{ ...itemClasses, subtitle: "text-warning" }}
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Card expired"
        subtitle="Please, update now"
        classNames={{ ...itemClasses, subtitle: "text-danger" }}
        startContent={<InvalidCardIcon className="text-danger" />}
        title={
          <p className="flex items-center gap-1">
            Card expired
            <span className="text-sm text-default-400">*4812</span>
          </p>
        }
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

const WithFormTemplate = (args: AccordionProps) => {
  const form = (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        type="email"
        label="Email"
        placeholder="Enter your email"
        onValueChange={(value) => console.log(value)}
      />
      <Input
        isRequired
        type="password"
        label="Password"
        placeholder="Enter your password"
      />

      <div className="flex justify-end gap-2">
        <button className={button({ color: "primary" })}>Login</button>
      </div>
    </form>
  );

  return (
    <Accordion {...args}>
      <AccordionItem key="1" title="Accordion 1" aria-label="Accordion 1">
        {form}
      </AccordionItem>
      <AccordionItem key="2" title="Accordion 2" aria-label="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" title="Accordion 3" aria-label="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    size: "md",
  },
};

export const IsCompact = {
  render: Template,

  args: {
    ...defaultProps,
    isCompact: true,
  },
};

export const Multiple = {
  render: Template,

  args: {
    ...defaultProps,
    selectionMode: "multiple",
  },
};

export const DefaultExpanded = {
  render: Template,

  args: {
    ...defaultProps,
    defaultExpandedKeys: ["2"],
  },
};

export const KeepContentMounted = {
  render: Template,

  args: {
    ...defaultProps,
    keepContentMounted: true,
  },
};

export const DisabledKeys = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["2"],
  },
};

export const WithSubtitle = {
  render: TemplateWithSubtitle,

  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: TemplateWithStartContent,

  args: {
    ...defaultProps,
  },
};

export const Variants = {
  render: VariantsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomMotion = {
  render: Template,

  args: {
    ...defaultProps,
    motionProps: {
      variants: {
        exit: {
          y: -10,
          height: 0,
          opacity: 0,
          transition: {
            height: {
              duration: 0.25,
              easings: "ease",
            },
            opacity: {
              duration: 0.3,
              easings: "ease",
            },
          },
        },
        enter: {
          y: 0,
          opacity: 1,
          height: "auto",
          transition: {
            opacity: {
              duration: 1,
              easings: "ease",
            },
            height: {
              damping: 30,
              duration: 1,
              type: "spring",
              stiffness: 500,
            },
          },
        },
      },
    },
  },
};

export const CustomIndicator = {
  render: CustomInidicatorTemplate,

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

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
  },

  render: CustomWithClassNamesTemplate,
};
