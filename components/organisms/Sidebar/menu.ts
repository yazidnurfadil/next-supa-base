import { groupBy } from "lodash-es";

import { HomeIcon } from "@/components/atoms/Icons/sidebar/home-icon";

export const menu = [
  {
    key: "dasbor",
    icon: HomeIcon,
    title: "Dasbor",
    href: "/dashboard",
  },
];

export const generateSidebarMenu = () => {
  return groupBy(menu, "group");
};
