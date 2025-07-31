"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Navbar, NavbarContent } from "@heroui/react";

import { useNavbarContext } from "@/hooks/useLayoutContext";
import { NavbarUser } from "@/components/molecules/NavbarUser";
import { BurgerButton } from "@/components/molecules/BurgerButton";
import { NotificationsDropdown } from "@/components/molecules/NotificationsDropdown";

interface NavbarWrapperProps {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: NavbarWrapperProps) => {
  const { pageTitle, breadcrumb } = useNavbarContext();
  const pathname = usePathname();
  return (
    <div className="relative flex flex-1 flex-col lg:pt-2 lg:pl-2">
      <Navbar
        classNames={{
          wrapper: "w-full max-w-full top-0",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurgerButton />
        </NavbarContent>
        <NavbarContent>
          <div className="flex flex-col">
            <ul className="mb-1 flex gap-2 text-xs">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index !== 0 && <span>|</span>}
                  {item.icon}
                  {item.href && pathname !== item.href ? (
                    <Link href={item.href}>{item.title}</Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </li>
              ))}
            </ul>
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          </div>
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden"></NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:grow-0"
        >
          <NavbarContent>
            <NotificationsDropdown />
            <NavbarUser />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <div className="flex flex-1 flex-col border border-transparent bg-white text-foreground lg:rounded-tl-xl lg:shadow-lg dark:bg-black">
        {children}
      </div>
    </div>
  );
};
