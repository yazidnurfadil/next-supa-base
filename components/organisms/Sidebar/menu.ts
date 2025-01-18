import { Session } from "next-auth";

import { groupBy } from "lodash-es";

import { HomeIcon } from "@/components/atoms/Icons/sidebar/home-icon";
import { ProductsIcon } from "@/components/atoms/Icons/sidebar/products-icon";
import { AccountsIcon } from "@/components/atoms/Icons/sidebar/accounts-icon";
import { CustomersIcon } from "@/components/atoms/Icons/sidebar/customers-icon";

export const menu = [
  {
    key: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    showOnRole: ["super", "owner", "member"],
    icon: HomeIcon as React.FC<React.SVGProps<SVGSVGElement>>,
  },
  {
    group: "data",
    key: "businesses",
    href: "/business",
    title: "Businesses",
    showOnRole: ["super"],
    icon: ProductsIcon as React.FC<React.SVGProps<SVGSVGElement>>,
  },
  {
    group: "data",
    key: "accounts",
    title: "Accounts",
    href: "/accounts",
    showOnRole: ["super", "owner"],
    icon: AccountsIcon as React.FC<React.SVGProps<SVGSVGElement>>,
  },
  {
    group: "data",
    key: "customers",
    title: "Customers",
    href: "/customers",
    showOnRole: ["super", "owner"],
    icon: CustomersIcon as React.FC<React.SVGProps<SVGSVGElement>>,
  },
];

export const generateSidebarMenu = (session: Session | null) => {
  const filteredMenu = menu.filter((item) => {
    return item.showOnRole.includes(session?.user.account_role as string);
  });
  return groupBy(filteredMenu, "group");
};
