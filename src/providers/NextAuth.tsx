"use server";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";

export const SessionProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};
