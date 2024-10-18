import { ReactNode } from "react";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider as Provider } from "@nextui-org/react";

// import { Theme } from "@/types/utils";

export const NextUIProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};
