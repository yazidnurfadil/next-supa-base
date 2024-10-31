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

export const get: typeof fetch = async (url, options) => {
  const fixedOptions = await getFetchOptions("GET", options);
  if ((<string>url).startsWith("/"))
    return fetch(<string>process.env.NEXT_PUBLIC_API_URL + url, fixedOptions);
  else return fetch(url, fixedOptions);
};

export const post: typeof fetch = async (url, options) => {
  const fixedOptions = await getFetchOptions("POST", options);
  if ((<string>url).startsWith("/"))
    return fetch(<string>process.env.NEXT_PUBLIC_API_URL + url, fixedOptions);
  else return fetch(url, fixedOptions);
};

export const update: typeof fetch = async (url, options) => {
  const fixedOptions = await getFetchOptions("UPDATE", options);
  if ((<string>url).startsWith("/"))
    return fetch(<string>process.env.NEXT_PUBLIC_API_URL + url, fixedOptions);
  else return fetch(url, fixedOptions);
};

export const patch: typeof fetch = async (url, options) => {
  const fixedOptions = await getFetchOptions("PATCH", options);
  if ((<string>url).startsWith("/"))
    return fetch(<string>process.env.NEXT_PUBLIC_API_URL + url, fixedOptions);
  else return fetch(url, fixedOptions);
};

export const del: typeof fetch = async (url, options) => {
  const fixedOptions = await getFetchOptions("DELETE", options);
  if ((<string>url).startsWith("/"))
    return fetch(<string>process.env.NEXT_PUBLIC_API_URL + url, fixedOptions);
  else return fetch(url, fixedOptions);
};
