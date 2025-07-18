import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

import { Database } from "@/types/database.types";
// import { objKeyCamelCase } from "@/utils";

// const { fetch: originalFetch } = globalThis;

export const createSupaClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      // global: {
      //   fetch: async (...args) => {
      //     const [resource, config] = args;
      //     // request interceptor here
      //     const response = await originalFetch(resource, config);
      //     // response interceptor here
      //     console.log("supabase interceptor", response);
      //     const interceptedRes = objKeyCamelCase(response);
      //     return interceptedRes;
      //   },
      // },
    }
  );
};
