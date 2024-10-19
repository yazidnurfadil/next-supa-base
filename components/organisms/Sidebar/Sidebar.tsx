import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Avatar, Tooltip } from "@nextui-org/react";

import { generateSidebarMenu } from "./menu";
import { Sidebar } from "./Sidebar.styles";

import { AccountsIcon } from "@/components/atoms/Icons/sidebar/accounts-icon";
import { BalanceIcon } from "@/components/atoms/Icons/sidebar/balance-icon";
import { ChangeLogIcon } from "@/components/atoms/Icons/sidebar/changelog-icon";
import { CustomersIcon } from "@/components/atoms/Icons/sidebar/customers-icon";
import { DevIcon } from "@/components/atoms/Icons/sidebar/dev-icon";
import { HomeIcon } from "@/components/atoms/Icons/sidebar/home-icon";
import { PaymentsIcon } from "@/components/atoms/Icons/sidebar/payments-icon";
import { ProductsIcon } from "@/components/atoms/Icons/sidebar/products-icon";
import { ReportsIcon } from "@/components/atoms/Icons/sidebar/reports-icon";
import { SettingsIcon } from "@/components/atoms/Icons/sidebar/settings-icon";
import { ViewIcon } from "@/components/atoms/Icons/sidebar/view-icon";
import { CollapseItems } from "@/components/molecules/CollapseItems";
import { NotificationsDropdown } from "@/components/molecules/NotificationsDropdown";
import { SidebarItem } from "@/components/molecules/SidebarItem";
import { SidebarMenu } from "@/components/molecules/SidebarMenu";
import { useSidebarContext } from "@/hooks/useLayoutContext";

export const SidebarWrapper = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { undefined: noGroupMenuList, ...menuList } = generateSidebarMenu();

  return (
    <aside className="sticky top-0 z-20 h-screen">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
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
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Data">
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={session?.user?.name} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
