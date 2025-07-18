"use client";

import React from "react";

import type { Breadcrumb } from "@/hooks/useLayoutContext";

import { useLockedBody } from "@/hooks/useBodyLock";
import { NavbarWrapper } from "@/components/organisms/Navbar";
import { SidebarWrapper } from "@/components/organisms/Sidebar";
import { NavbarContext, SidebarContext } from "@/hooks/useLayoutContext";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayoutWrapper = ({ children }: Props) => {
  const [pageTitle, setPageTitle] = React.useState("Dashboard");
  const [breadcrumb, setBreadcrumb] = React.useState<Breadcrumb[]>([]);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <NavbarContext.Provider
      value={{
        pageTitle: pageTitle,
        breadcrumb: breadcrumb,
        setPageTitle: (string) => {
          setPageTitle(string);
        },
        setBreadcrumb: (breadcrumbArr: Breadcrumb[]) => {
          setBreadcrumb(breadcrumbArr);
        },
      }}
    >
      <SidebarContext.Provider
        value={{
          collapsed: sidebarOpen,
          setCollapsed: handleToggleSidebar,
        }}
      >
        <section className="flex">
          <SidebarWrapper />
          <NavbarWrapper>{children}</NavbarWrapper>
        </section>
      </SidebarContext.Provider>
    </NavbarContext.Provider>
  );
};
