import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider as Provider } from "@nextui-org/react";

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
        defaultTheme="system"
        attribute="class"
        {...themeProps}
      >
        {children}
      </NextThemesProvider>
    </Provider>
  );
};
