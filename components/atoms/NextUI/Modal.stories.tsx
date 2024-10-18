/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import Lorem from "react-lorem-component";
import { Meta } from "@storybook/react";

import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useDisclosure,
} from "@nextui-org/modal";
import { LockFilledIcon, MailFilledIcon } from "@nextui-org/shared-icons";
import { modal } from "@nextui-org/theme";

export default {
  title: "Atoms/Modal",
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "full",
      ],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg"],
    },
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    isDismissable: {
      control: {
        type: "boolean",
      },
    },
    isKeyboardDismissDisabled: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Modal>;

const defaultProps = {
  ...modal.defaultVariants,
  isDismissable: true,
  isKeyboardDismissDisabled: false,
};

const content = (
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            endContent={
              <MailFilledIcon className="pointer-events-none shrink-0 text-2xl text-default-400" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={
              <LockFilledIcon className="pointer-events-none shrink-0 text-2xl text-default-400" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          <div className="flex justify-between px-1 py-2">
            <Checkbox
              classNames={{
                label: "text-sm",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Sign in
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
);

const Template = (args: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    defaultOpen: args.defaultOpen,
  });

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        {content}
      </Modal>
    </>
  );
};

const InsideScrollTemplate = (args: ModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={10} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const OutsideScrollTemplate = (args: ModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal
        {...args}
        isOpen={isOpen}
        scrollBehavior="outside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={10} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const OpenChangeTemplate = (args: ModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const DefaultOpen = {
  render: Template,

  args: {
    ...defaultProps,
    defaultOpen: true,
  },
};

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
    scrollBehavior: "inside",
  },
};

export const InsideScroll = {
  render: InsideScrollTemplate,

  args: {
    ...defaultProps,
    scrollBehavior: "inside",
  },
};

export const OutsideScroll = {
  render: OutsideScrollTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const CustomMotion = {
  render: Template,

  args: {
    ...defaultProps,
    motionProps: {
      variants: {
        enter: {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        exit: {
          y: 20,
          opacity: 0,
          duration: 0.3,
        },
      },
    },
  },
};
