interface SupabaseClient {
  rpc(procedureName: string, params: object): Promise<unknown>;
}

type SupabaseToken = {
  iss?: string;
  sub?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role?: string;
  aud?: string[] | string;
};
