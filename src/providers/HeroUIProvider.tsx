"use client";

import { HeroUIProvider as Provider } from "@heroui/react";

import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface HeroUIProviderProps {
  children: React.ReactNode;
  themeProps?: Partial<ThemeProviderProps>;
}

export const HeroUIProvider = ({
  children,
  themeProps,
}: HeroUIProviderProps) => {
  return (
    <Provider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        {...themeProps}
      >
        {children}
      </NextThemesProvider>
    </Provider>
  );
};
