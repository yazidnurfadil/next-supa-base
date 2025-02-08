import { ReactNode } from "react";

import type { HeroUIProviderProps } from "@/providers/HeroUIProvider";

import { JotaiProviders } from "@/providers/Jotai";
import { ToasterContainer } from "@/providers/Toaster";
import { SessionProvider } from "@/providers/NextAuth";
import { TanstackProvider } from "@/providers/Tanstack";
import { FetchProvider } from "@/providers/FetchProvider";
import { HeroUIProvider } from "@/providers/HeroUIProvider";

export interface ProvidersProps extends HeroUIProviderProps {
  children: ReactNode;
}

const Providers = ({ children, themeProps }: ProvidersProps) => (
  <>
    <ToasterContainer />
    <SessionProvider>
      {/* START Client Providers */}
      <FetchProvider>
        <JotaiProviders>
          <HeroUIProvider themeProps={themeProps}>
            <TanstackProvider>{children}</TanstackProvider>
          </HeroUIProvider>
        </JotaiProviders>
      </FetchProvider>
      {/* END Client Providers */}
    </SessionProvider>
  </>
);

export default Providers;
