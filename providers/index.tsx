import { ReactNode } from "react";

import type { NextUIProviderProps } from "@/providers/NextUIProvider";

import { JotaiProviders } from "@/providers/Jotai";
import { ToasterContainer } from "@/providers/Toaster";
import { TanstackProvider } from "@/providers/Tanstack";

import { SessionProvider } from "./NextAuth";
import { FetchProvider } from "./FetchProvider";
import { NextUIProvider } from "./NextUIProvider";

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
