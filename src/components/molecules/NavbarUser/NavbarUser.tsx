"use client";

import { useCallback } from "react";

import {
  Avatar,
  Dropdown,
  NavbarItem,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

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
            src={session?.user.avatar}
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
