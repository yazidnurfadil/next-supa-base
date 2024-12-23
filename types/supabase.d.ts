interface SupabaseClient {
  rpc(procedureName: string, params: object): Promise<unknown>;
}
