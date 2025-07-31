import { tv } from "@heroui/react";

export const SidebarWrapper = tv({
  variants: {
    collapsed: {
      true: "ml-0 translate-x-0 pt-20 [display:inherit]",
    },
  },

  base: "fixed z-202 h-full w-64 shrink-0 -translate-x-full flex-col overflow-y-auto border-divider bg-background px-3 py-6 transition-transform md:static md:ml-0 md:flex md:h-screen md:translate-x-0 ",
  // ""
  //   "@md": {
  //     marginLeft: "0",
  //     display: "flex",
  //     position: "static",
  //     height: "100vh",
  //     transform: "translateX(0)",
  //   },
  //   variants: {
  //     collapsed: {
  //       true: {
  //         display: "inherit",
  //         marginLeft: "0 ",
  //         transform: "translateX(0)",
  //       },
  //     },
  //   },
});
export const Overlay = tv({
  base: "fixed inset-0 z-201 bg-[rgb(15_23_42/0.3)] opacity-80 transition-opacity md:z-auto md:hidden md:opacity-100",
});

export const Header = tv({
  base: "flex items-center gap-8 pl-6",
});

export const Logo = tv({
  base: "flex-1 font-bold",
});

export const Notification = tv({
  base: "",
});

export const Body = tv({
  base: "mt-9 flex flex-col gap-6 px-2",
});

export const Footer = tv({
  base: "flex items-center justify-center gap-6 px-8 pb-8 pt-16 md:pb-0 md:pt-10",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Logo,
  Body,
  Header,
  Footer,
  Overlay,
  Notification,
});
