"use client";

import { useContext, createContext } from "react";

export type Breadcrumb = {
  href: string;
  title: string;
  icon?: React.ReactNode;
};

interface SidebarContext {
  collapsed: boolean;
  setCollapsed: () => void;
}

interface NavbarContext {
  pageTitle: string;
  breadcrumb: Breadcrumb[];
  setPageTitle: (title: string) => void;
  setBreadcrumb: (
    breadcrumb: {
      href: string;
      title: string;
      icon?: React.ReactNode;
    }[]
  ) => void;
}

export const SidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => {},
});

export const NavbarContext = createContext<NavbarContext>({
  breadcrumb: [],
  pageTitle: "Dashboard",
  setPageTitle: () => {},
  setBreadcrumb: () => {},
});

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export const useNavbarContext = () => {
  return useContext(NavbarContext);
};
