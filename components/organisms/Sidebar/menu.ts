import { groupBy } from "lodash-es";

import { HomeIcon } from "@/components/atoms/Icons/sidebar/home-icon";

export const menu = [
  {
    key: "dasbor",
    title: "Dasbor",
    href: "/dashboard",
    icon: HomeIcon,
  },
];

export const generateSidebarMenu = () => {
  return groupBy(menu, "group");
};
