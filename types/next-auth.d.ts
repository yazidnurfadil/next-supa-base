// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultJWT, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    exp: number;
    iss: string;
    name: string;
    email: string;
  }
  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
    permissions: string[];
  }
}
