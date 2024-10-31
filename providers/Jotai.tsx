"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";

export const JotaiProviders = ({ children }: { children: ReactNode }) => (
  <Provider>{children}</Provider>
);
