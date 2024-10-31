"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import tanstackClient from "@/lib/tanstack";

export const TanstackProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={tanstackClient}>{children}</QueryClientProvider>
);
