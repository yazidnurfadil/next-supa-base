// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultJWT, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface AdapterUser {
    exp: number;
    iss: string;
    name: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
