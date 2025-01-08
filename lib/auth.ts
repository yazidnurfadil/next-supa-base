import { SupabaseAdapter } from "@auth/supabase-adapter";
import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig, CredentialsSignin } from "next-auth";

import { createSupaClient } from "@/lib/supabase";
import { getProfile } from "@/services/api/profile";

const BASE_PATH = "/api/auth";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const config = {
  basePath: BASE_PATH,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
  pages: {
    error: "/login",
    signIn: "/login",
  },
  adapter: SupabaseAdapter({
    url: <string>process.env.SUPABASE_URL,
    secret: <string>process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    jwt({ token }) {
      return token;
    },
    authorized: ({ auth, request: _req }) => {
      if (auth) {
        return true;
      }
      return false;
    },
    async session({ token, session }) {
      const userDetail = await getProfile();
      session.access_token = token as SupabaseToken;
      return { ...session, user: { ...session.user, ...userDetail } };
    },
  },
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        password: { type: "password", label: "Password" },
        email: {
          type: "email",
          label: "Email",
          placeholder: "example@domain.com",
        },
      },
      authorize: async (credentials) => {
        try {
          const supabase = await createSupaClient();
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // If no error and we have user data, return it
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          if (error) {
            throw new InvalidLoginError();
          }
          return data.user;
        } catch {
          // Return null if user data could not be retrieved
          throw new InvalidLoginError();
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

// Use it in server contexts
export const { auth, signIn, signOut, handlers } = NextAuth(config);
