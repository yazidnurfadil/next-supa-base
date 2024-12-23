import { Session } from "next-auth";

import { groupBy } from "lodash-es";

import { HomeIcon } from "@/components/atoms/Icons/sidebar/home-icon";
import { ProductsIcon } from "@/components/atoms/Icons/sidebar/products-icon";
import { AccountsIcon } from "@/components/atoms/Icons/sidebar/accounts-icon";
import { CustomersIcon } from "@/components/atoms/Icons/sidebar/customers-icon";

export const menu = [
  {
    icon: HomeIcon,
    key: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    showOnRole: ["super", "owner", "member"],
  },
  {
    group: "data",
    key: "businesses",
    href: "/business",
    icon: ProductsIcon,
    title: "Businesses",
    showOnRole: ["super"],
  },
  {
    group: "data",
    key: "accounts",
    title: "Accounts",
    href: "/accounts",
    icon: AccountsIcon,
    showOnRole: ["super", "owner"],
  },
  {
    group: "data",
    key: "customers",
    title: "Customers",
    href: "/customers",
    icon: CustomersIcon,
    showOnRole: ["super", "owner"],
  },
];

export const generateSidebarMenu = (session: Session | null) => {
  const filteredMenu = menu.filter((item) => {
    return item.showOnRole.includes(session?.user.account_role as string);
  });
  return groupBy(filteredMenu, "group");
};
