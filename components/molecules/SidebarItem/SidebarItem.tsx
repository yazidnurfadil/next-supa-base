import NextLink from "next/link";

import clsx from "clsx";

import { useSidebarContext } from "@/hooks/useLayoutContext";

interface Props {
  title: string;
  href?: string;
  isActive?: boolean;
  icon: React.ReactNode;
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
      className={`${isActive ? "z-10" : ""} relative max-w-full text-neutral-500 hover:text-default-900 active:bg-none`}
    >
      <div
        onClick={handleClick}
        className={clsx(
          isActive
            ? "bg-success-100 text-default-900 shadow-lg [&_svg_path]:fill-success-500"
            : "hover:bg-white dark:hover:bg-default-100",
          "flex size-full min-h-[44px] cursor-pointer items-center gap-2 rounded-xl px-3.5 transition-all duration-150 active:scale-[0.98]"
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    </NextLink>
  );
};
