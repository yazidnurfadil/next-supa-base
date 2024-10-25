import { ReactNode } from "react";

import { SessionProvider } from "./NextAuth";
import { NextUIProvider } from "./NextUIProvider";

import type { NextUIProviderProps } from "@/providers/NextUIProvider";

export interface ProvidersProps extends NextUIProviderProps {
  children: ReactNode;
}

const Providers = ({ children, themeProps }: ProvidersProps) => (
  <SessionProvider>
    <NextUIProvider themeProps={themeProps}>{children}</NextUIProvider>
  </SessionProvider>
);

export default Providers;
