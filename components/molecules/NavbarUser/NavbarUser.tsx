"use client";

import React, { useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";

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
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          isReadOnly
          showDivider
          className="flex w-full cursor-default flex-col items-start justify-start"
        >
          <p className="font-semibold">{session?.user.name}</p>
          <p className="text-sm">{session?.user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem
          isReadOnly
          key="theme"
          className="cursor-default"
          showDivider
          endContent={<ThemeSwitcher />}
        >
          Theme
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
