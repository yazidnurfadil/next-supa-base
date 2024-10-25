import { ReactNode } from "react";

import type { NextUIProviderProps } from "@/providers/NextUIProvider";
import { NextUIProvider } from "@/providers/NextUIProvider";

export interface ProvidersProps extends NextUIProviderProps {
  children: ReactNode;
}

const Providers = ({ children, themeProps }: ProvidersProps) => (
  <NextUIProvider themeProps={themeProps}>{children}</NextUIProvider>
);

export default Providers;
