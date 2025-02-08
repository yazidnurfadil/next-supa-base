import React from "react";
import Lorem from "react-lorem-component";

import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { navbar } from "@heroui/theme";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  Lock,
  Flash,
  Scale,
  Server,
  TagUser,
  Activity,
  SearchIcon,
  ChevronDown,
} from "@heroui/shared-icons";
import {
  Navbar,
  NavbarItem,
  NavbarMenu,
  NavbarBrand,
  NavbarProps,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";

import { Meta } from "@storybook/react";

export default {
  component: Navbar,
  title: "Atoms/Navbar",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isBlurred: {
      control: {
        type: "boolean",
      },
    },
    position: {
      options: ["static", "fixed"],
      control: {
        type: "select",
      },
    },
    maxWidth: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
  },
} as Meta<typeof Navbar>;

const defaultProps = {
  ...navbar.defaultVariants,
};

const AcmeLogo = () => (
  <svg width="36" fill="none" height="36" viewBox="0 0 32 32">
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      fill="currentColor"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
    />
  </svg>
);

const App = React.forwardRef(
  ({ children }: React.PropsWithChildren, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="relative max-h-[90vh] max-w-[90%] overflow-x-hidden overflow-y-scroll border border-default shadow-md sm:max-w-[80%]"
      >
        {children}
        <div className="mt-8 flex max-w-5xl flex-col gap-4 px-10">
          <h1>Lorem ipsum dolor sit ame</h1>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Lorem
              key={i}
              count={1}
              sentenceUpperBound={40}
              className="mb-5 text-lg"
            />
          ))}
        </div>
      </div>
    );
  }
);

App.displayName = "App";

const Template = (args: NavbarProps) => {
  // for hide on scroll cases
  const parentRef = React.useRef<HTMLDivElement>(null);

  return (
    <App ref={parentRef}>
      <Navbar
        {...args}
        parentRef={parentRef as React.RefObject<HTMLDivElement>}
      >
        <NavbarBrand>
          <AcmeLogo />
          <p className="hidden font-bold text-inherit sm:block">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex">
          <NavbarItem>
            <Link href="#" color="foreground">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:block">
            <Link href="#" color="foreground">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button href="#" as={Link} variant="flat" color="primary">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

const WithMenuTemplate = (args: NavbarProps) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = React.useState<undefined | boolean>(
    false
  );

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <App ref={parentRef}>
      <Navbar
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
        parentRef={parentRef as React.RefObject<HTMLDivElement>}
        {...args}
      >
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="hidden font-bold text-inherit sm:block">ACME</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex">
          <NavbarItem>
            <Link href="#" color="foreground">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:block">
            <Link href="#" color="foreground">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button href="#" as={Link} variant="flat" color="primary">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href="#"
                size="lg"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </App>
  );
};

const WithDropdownTemplate = (args: NavbarProps) => {
  const icons = {
    chevron: <ChevronDown size={16} fill="currentColor" />,
    lock: <Lock size={30} fill="currentColor" className="text-success" />,
    scale: <Scale size={30} fill="currentColor" className="text-warning" />,
    flash: <Flash size={30} fill="currentColor" className="text-primary" />,
    user: <TagUser size={30} fill="currentColor" className="text-danger" />,
    server: <Server size={30} fill="currentColor" className="text-success" />,
    activity: (
      <Activity size={30} fill="currentColor" className="text-secondary" />
    ),
  };

  return (
    <App>
      <Navbar {...args}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="hidden font-bold text-inherit sm:block">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-0 sm:flex">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  radius="full"
                  variant="light"
                  endContent={icons.chevron}
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              className="w-[340px]"
              aria-label="ACME features"
              itemClasses={{
                base: "gap-4",
                wrapper: "py-3",
              }}
            >
              <DropdownItem
                key="autoscaling"
                startContent={icons.scale}
                description="ACME scales apps to meet user demand, automagically, based on load."
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="safe_and_sound"
                startContent={icons.lock}
                description="A secure mission control, without the policy headache. Permissions, 2FA, and more."
              >
                Safe and Sound
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                startContent={icons.activity}
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                startContent={icons.flash}
                description="ACME runs on ACME, join us and others serving requests at web scale."
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                startContent={icons.server}
                description="Applications stay on the grid with high availability and high uptime guarantees."
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                startContent={icons.user}
                description="Overcome any challenge with a supporting team ready to respond."
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem isActive>
            <Link href="#" className="px-4">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="px-4" color="foreground">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="px-4" color="foreground">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden px-4 lg:block">
            <Link href="#" color="foreground">
              Company
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button href="#" as={Link} variant="flat" color="primary">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

const WithAvatarUserTemplate = (args: NavbarProps) => {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Logout",
  ];

  return (
    <App>
      <Navbar {...args}>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href="#"
                size="lg"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-3 md:flex">
          <NavbarItem>
            <Link href="#" color="foreground">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" color="secondary">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Deployments
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Activity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                size="sm"
                isBordered
                as="button"
                color="secondary"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu color="secondary" aria-label="Profile Actions">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

const WithSearchInputTemplate = (args: NavbarProps) => {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Logout",
  ];

  return (
    <App>
      <Navbar {...args}>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href="#"
                size="lg"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent justify="start" className="hidden gap-3 md:flex">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarItem>
            <Link href="#" color="foreground">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" color="secondary">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Deployments
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Activity
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Input
            size="sm"
            className="w-fit"
            placeholder="Search..."
            classNames={{
              input: "text-base",
            }}
            onClear={() => {
              console.log("clear");
            }}
            startContent={
              <SearchIcon className="pointer-events-none shrink-0 text-base" />
            }
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                size="sm"
                isBordered
                as="button"
                color="secondary"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu color="secondary" aria-label="Profile Actions">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </App>
  );
};

export const Static = {
  render: Template,

  args: {
    ...defaultProps,
    position: "static",
  },
};

export const Sticky = {
  render: Template,

  args: {
    ...defaultProps,
    position: "sticky",
  },
};

export const HideOnScroll = {
  render: Template,

  args: {
    ...defaultProps,
    position: "sticky",
    shouldHideOnScroll: true,
  },
};

export const WithMenu = {
  render: WithMenuTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithDropdown = {
  render: WithDropdownTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAvatarUser = {
  render: WithAvatarUserTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithSearchInput = {
  render: WithSearchInputTemplate,

  args: {
    ...defaultProps,
  },
};
