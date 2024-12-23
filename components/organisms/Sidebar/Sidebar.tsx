"use client";

import { usePathname } from "next/navigation";

import { Avatar, Tooltip } from "@heroui/react";

import { useSession } from "next-auth/react";

import { useSidebarContext } from "@/hooks/useLayoutContext";
import { SidebarItem } from "@/components/molecules/SidebarItem";
import { SidebarMenu } from "@/components/molecules/SidebarMenu";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";
import { NotificationsDropdown } from "@/components/molecules/NotificationsDropdown";

import { Sidebar } from "./Sidebar.styles";
import { generateSidebarMenu } from "./menu";

export const SidebarWrapper = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { undefined: noGroupMenuList, ...menuList } =
    generateSidebarMenu(session);

  return (
    <aside className="sticky top-0 z-20 h-screen">
      {collapsed ? (
        <div onClick={setCollapsed} className={Sidebar.Overlay()} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className={Sidebar.Logo()}>NEXTSUPA</div>
          <div className={Sidebar.Notification()}>
            <NotificationsDropdown />
          </div>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            {noGroupMenuList.map((item) => (
              <SidebarItem
                key={item.title}
                href={item.href}
                title={item.title}
                icon={<item.icon />}
                isActive={pathname === item.href}
              />
            ))}
            {Object.keys(menuList).map((itemKey) => (
              <SidebarMenu title="Data" key={itemKey}>
                {menuList[itemKey].map((item) => (
                  <SidebarItem
                    key={item.key}
                    href={item.href}
                    title={item.title}
                    icon={<item.icon />}
                    isActive={pathname === item.href}
                  />
                ))}
              </SidebarMenu>
            ))}
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip color="primary" content={"Settings"}>
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip color="primary" content={session?.user?.name}>
              <Avatar size="sm" src={session?.user?.avatar} />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
