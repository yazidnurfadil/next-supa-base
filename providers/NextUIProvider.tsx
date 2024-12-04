"use client";

import { NextUIProvider as Provider } from "@nextui-org/react";

import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface NextUIProviderProps {
  children: React.ReactNode;
  themeProps?: Partial<ThemeProviderProps>;
}

export const NextUIProvider = ({
  children,
  themeProps,
}: NextUIProviderProps) => {
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
