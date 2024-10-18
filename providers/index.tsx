import { ReactNode } from "react";

import { NextUIProvider } from "@/providers/nextUi";

const Providers = ({ children }: { children: ReactNode }) => (
  <NextUIProvider>{children}</NextUIProvider>
);

export default Providers;
