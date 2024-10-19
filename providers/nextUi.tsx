import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider as Provider } from "@nextui-org/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export const NextUIProvider = ({ children, themeProps }: ProvidersProps) => {
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
