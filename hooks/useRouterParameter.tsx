import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString } from "@/utils";

const useRouterParameter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = (name: string, value: string) => {
    router.replace(
      pathname + "?" + createQueryString(name, value, searchParams.toString())
    );
  };

  return { updateQueryString, router, pathname, searchParams };
};

export default useRouterParameter;
