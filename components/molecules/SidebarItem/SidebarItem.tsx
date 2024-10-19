import React from "react";
import clsx from "clsx";
import NextLink from "next/link";

import { useSidebarContext } from "@/hooks/useLayoutContext";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="max-w-full text-default-900 active:bg-none"
    >
      <div
        className={clsx(
          isActive
            ? "bg-success-100 [&_svg_path]:fill-success-500"
            : "hover:bg-default-100",
          "flex size-full min-h-[44px] cursor-pointer items-center gap-2 rounded-xl px-3.5 transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span className="text-default-900">{title}</span>
      </div>
    </NextLink>
  );
};
