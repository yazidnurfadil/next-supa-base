import { ReactNode } from "react";

import { FetchProvider } from "./FetchProvider";
import { SessionProvider } from "./NextAuth";
import { NextUIProvider } from "./NextUIProvider";

import { JotaiProviders } from "@/providers/Jotai";
import type { NextUIProviderProps } from "@/providers/NextUIProvider";
import { TanstackProvider } from "@/providers/Tanstack";
import { ToasterContainer } from "@/providers/Toaster";

export interface ProvidersProps extends NextUIProviderProps {
  children: ReactNode;
}

const Providers = ({ children, themeProps }: ProvidersProps) => (
  <>
    <ToasterContainer />
    <SessionProvider>
      {/* START Client Providers */}
      <FetchProvider>
        <JotaiProviders>
          <NextUIProvider themeProps={themeProps}>
            <TanstackProvider>{children}</TanstackProvider>
          </NextUIProvider>
        </JotaiProviders>
      </FetchProvider>
      {/* END Client Providers */}
    </SessionProvider>
  </>
);

export default Providers;
