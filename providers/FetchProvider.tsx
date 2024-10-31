"use client";

import { useSession } from "next-auth/react";

import { defaultOptions } from "@/lib/fetch";

export const FetchProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  defaultOptions.headers.Authorization = `Bearer ${session?.user.token}`;

  return <>{children}</>;
};
