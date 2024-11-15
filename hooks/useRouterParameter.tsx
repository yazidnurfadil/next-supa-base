import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString } from "@/utils";

const useRouterParameter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback((name: string, value: string) => {
    router.replace(
      pathname + "?" + createQueryString(name, value, searchParams.toString())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteQueryParameter = useCallback(
    (query: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (Array.isArray(query)) {
        query.forEach((q) => params.delete(q));
      } else {
        params.delete(query);
      }
      const newParams = params.toString();
      router.replace(pathname + "?" + newParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    updateQueryString,
    deleteQueryParameter,
    router,
    pathname,
    searchParams,
  };
};

export default useRouterParameter;
