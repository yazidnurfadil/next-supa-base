"use client";

import { usePathname } from "next/navigation";

import { Avatar, Tooltip } from "@nextui-org/react";

import { useSession } from "next-auth/react";

import { useSidebarContext } from "@/hooks/useLayoutContext";
import { SidebarItem } from "@/components/molecules/SidebarItem";
import { SidebarMenu } from "@/components/molecules/SidebarMenu";
import { DevIcon } from "@/components/atoms/Icons/sidebar/dev-icon";
import { CollapseItems } from "@/components/molecules/CollapseItems";
import { HomeIcon } from "@/components/atoms/Icons/sidebar/home-icon";
import { ViewIcon } from "@/components/atoms/Icons/sidebar/view-icon";
import { BalanceIcon } from "@/components/atoms/Icons/sidebar/balance-icon";
import { ReportsIcon } from "@/components/atoms/Icons/sidebar/reports-icon";
import { AccountsIcon } from "@/components/atoms/Icons/sidebar/accounts-icon";
import { PaymentsIcon } from "@/components/atoms/Icons/sidebar/payments-icon";
import { ProductsIcon } from "@/components/atoms/Icons/sidebar/products-icon";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";
import { ChangeLogIcon } from "@/components/atoms/Icons/sidebar/changelog-icon";
import { CustomersIcon } from "@/components/atoms/Icons/sidebar/customers-icon";
import { NotificationsDropdown } from "@/components/molecules/NotificationsDropdown";

import { Sidebar } from "./Sidebar.styles";
import { generateSidebarMenu } from "./menu";

export const SidebarWrapper = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { undefined: noGroupMenuList, ...menuList } = generateSidebarMenu();

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
          <div className={Sidebar.Logo()}>ABC</div>
          <div className={Sidebar.Notification()}>
            <NotificationsDropdown />
          </div>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            <SidebarItem
              href="/"
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
            />
            <SidebarMenu title="Data">
              <SidebarItem
                href="customers"
                title="Customers"
                icon={<CustomersIcon />}
                isActive={pathname === "/customers"}
              />
              <SidebarItem
                href="accounts"
                title="Accounts"
                icon={<AccountsIcon />}
                isActive={pathname === "/accounts"}
              />
              <SidebarItem
                title="Payments"
                icon={<PaymentsIcon />}
                isActive={pathname === "/payments"}
              />
              <CollapseItems
                title="Balances"
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
              />
              <SidebarItem
                title="Products"
                icon={<ProductsIcon />}
                isActive={pathname === "/products"}
              />
              <SidebarItem
                title="Reports"
                icon={<ReportsIcon />}
                isActive={pathname === "/reports"}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                title="Developers"
                icon={<DevIcon />}
                isActive={pathname === "/developers"}
              />
              <SidebarItem
                icon={<ViewIcon />}
                title="View Test Data"
                isActive={pathname === "/view"}
              />
              <SidebarItem
                title="Settings"
                icon={<SettingsIcon />}
                isActive={pathname === "/settings"}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                title="Changelog"
                icon={<ChangeLogIcon />}
                isActive={pathname === "/changelog"}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip color="primary" content={"Settings"}>
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip color="primary" content={"Fulan Someone" as string}>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
