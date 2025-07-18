import { Link } from "@heroui/link";
import { User } from "@heroui/user";

import { Meta } from "@storybook/react";

export default {
  component: User,
  title: "Atoms/User",
} as Meta<typeof User>;

const url = "https://avatars.githubusercontent.com/u/30373425?v=4";

export const Default = {
  args: {
    name: "Junior Garcia",
    avatarProps: {
      src: url,
    },
  },
};

export const isFocusable = {
  args: {
    isFocusable: true,
    name: "Junior Garcia",
    avatarProps: {
      src: url,
    },
  },
};

export const WithDefaultAvatar = {
  args: {
    name: "Junior Garcia",
    avatarProps: {
      name: "Junior Garcia",
      getInitials: (name: string) =>
        name
          .split(" ")
          .map((n) => n[0])
          .join(""),
    },
  },
};

export const WithDescription = {
  args: {
    name: "Junior Garcia",
    description: "Software Engineer",
    avatarProps: {
      src: url,
    },
  },
};

export const WithLinkDescription = {
  args: {
    name: "Junior Garcia",
    avatarProps: {
      src: url,
    },
    description: (
      <Link size="sm" href="https://x.com/jrgarciadev">
        @jrgarciadev
      </Link>
    ),
  },
};
