/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { useCallback } from "react";

import {
  Avatar,
  Dropdown,
  NavbarItem,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { signOut, useSession } from "next-auth/react";

import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";

export const NavbarUser = () => {
  const handleLogout = useCallback(async () => {
    await signOut();
  }, []);
  const { data: session } = useSession();

  return (
    <Dropdown backdrop="blur">
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            size="md"
            as="button"
            color="secondary"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          isReadOnly
          showDivider
          key="profile"
          className="flex w-full cursor-default flex-col items-start justify-start"
        >
          <p className="font-semibold">{session?.user.name}</p>
          <p className="text-sm">{session?.user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem
          isReadOnly
          key="theme"
          showDivider
          className="cursor-default"
          endContent={<ThemeSwitcher />}
        >
          Theme
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={() => void handleLogout()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
