/* eslint-disable tailwindcss/no-custom-classname */
import { tv } from "@nextui-org/react";

import { useSidebarContext } from "@/hooks/useLayoutContext";

const StyledBurgerButton = tv({
  variants: {
    open: {
      true: "[&",
    },
  },
  base: "absolute z-[202] flex size-6 cursor-pointer flex-col justify-around border-none bg-transparent p-0 focus:outline-none [&_div]:relative [&_div]:h-px [&_div]:w-6 [&_div]:origin-[1px] [&_div]:rounded-xl  [&_div]:bg-default-900  [&_div]:transition-all ",
  //   "",
  //   "& div": {

  //     "&:first-child": {
  //       transform: "translateY(-4px) rotate(0deg)",
  //       height: "1px",
  //       marginTop: "10px",
  //     },
  //     "&:nth-child(2)": {
  //       transform: "translateY(4px) rotate(0deg)",
  //       height: "1px",
  //       marginBottom: "10px",
  //     },
  //   },
  //   variants: {
  //     open: {
  //       true: {
  //         "& div": {
  //           "&:first-child": {
  //             marginTop: "0px",
  //             transform: "translateY(1px) rotate(45deg)",
  //           },
  //           "&:nth-child(2)": {
  //             marginBottom: "0px",
  //             transform: "translateY(4px) rotate(-45deg)",
  //           },
  //         },
  //       },
  //     },
  //   },
});

export const BurgerButton = () => {
  const { setCollapsed, collapsed: _collapsed } = useSidebarContext();

  return (
    <div
      //   open={collapsed}
      onClick={setCollapsed}
      className={StyledBurgerButton()}
    >
      <div />
      <div />
    </div>
  );
};
