import React from "react";

import { Navbar, NavbarContent } from "@nextui-org/react";

import { BurguerButton } from "@/components/molecules/BurgerButton";
import { NavbarUser } from "@/components/molecules/NavbarUser";

interface NavbarWrapperProps {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: NavbarWrapperProps) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden"></NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:grow-0"
        >
          <NavbarContent>
            <NavbarUser />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
