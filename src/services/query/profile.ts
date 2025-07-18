/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Database } from "@/types/database.types";

import { get } from "@/lib/fetch";
import { PROFILE } from "@/constants/endpoint";
// import { Anggota } from "@/types/anggota";
// import { DataListApiResponse } from "@/types/api";

export const getProfileQuery: () => Promise<
  Database["public"]["Functions"]["get_personal_account"]
> = async () => {
  const response = await get(`${PROFILE}`);
  if (!response) {
    return {};
  }
  const jsonRes = await response.json();
  return jsonRes.data.content;
};
