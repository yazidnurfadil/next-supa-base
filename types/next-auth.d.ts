// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultJWT, DefaultSession } from "next-auth";

import { Database } from "@/types/database.types";

declare module "next-auth" {
  interface AdapterUser {
    exp: number;
    iss: string;
    name: string;
    email: string;
  }

  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    access?: string;
    user: DefaultSession["user"] &
      Database["basejump"]["Tables"]["accounts"]["Row"] &
      Database["basejump"]["Tables"]["account_user"]["Row"] & {
        // The user's postal address
        image: string;
        avatar: string;
        address: string;
      };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
