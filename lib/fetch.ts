type DefaultFetchOptions = {
  headers: Record<string, string | undefined>;
} & RequestInit;

export const defaultOptions: DefaultFetchOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "omit" as RequestCredentials,
  mode: "cors" as RequestMode,
};

type fetcherOptions = {
  params?: Record<string, string | number | undefined>;
} & RequestInit;

const getFetchOptions: (
  method: string,
  options?: RequestInit
) => Promise<RequestInit> = async (method, options) => {
  const { headers: defaultHeaders, ...restDefaultOptions } = defaultOptions;
  const { headers: propsHeaders, ...restPropsOptions } = options || {};
  const fixedOptions = {
    headers: {
      ...defaultHeaders,
      ...propsHeaders,
    },
    ...restDefaultOptions,
    ...restPropsOptions,
    method,
  };
  return fixedOptions as RequestInit;
};

const getFetchUrl = (url: string | URL, params?: fetcherOptions["params"]) => {
  if (typeof url === "string") {
    url = new URL(
      (url.startsWith("/") ? <string>process.env.NEXT_PUBLIC_API_URL : "") + url
    );
  }
  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) url.searchParams.append(key, params[key] as string);
    });
  }
  return url.toString();
};

const fetcher = async (
  type: string,
  url: string | URL,
  options?: fetcherOptions
) => {
  const { params, ...fetchOpt } = options || {};
  const fixedOptions = await getFetchOptions(type, fetchOpt);
  const fixedUrl = getFetchUrl(url, params);
  return fetch(fixedUrl, fixedOptions);
};

export const get: (
  url: string | URL,
  options?: fetcherOptions
) => Promise<Response> = (...args) => fetcher("GET", ...args);

export const post: (
  url: string | URL,
  options?: fetcherOptions
) => Promise<Response> = (...args) => fetcher("POST", ...args);

export const update: (
  url: string | URL,
  options?: fetcherOptions
) => Promise<Response> = (...args) => fetcher("UPDATE", ...args);

export const patch: (
  url: string | URL,
  options?: fetcherOptions
) => Promise<Response> = (...args) => fetcher("PATCH", ...args);

export const del: (
  url: string | URL,
  options?: fetcherOptions
) => Promise<Response> = (...args) => fetcher("DELETE", ...args);
