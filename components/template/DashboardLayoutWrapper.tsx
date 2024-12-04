"use client";

import React from "react";

import { useLockedBody } from "@/hooks/useBodyLock";
import { SidebarContext } from "@/hooks/useLayoutContext";
import { NavbarWrapper } from "@/components/organisms/Navbar";
import { SidebarWrapper } from "@/components/organisms/Sidebar";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayoutWrapper = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
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
  );
};
