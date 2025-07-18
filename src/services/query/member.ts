import { get } from "@/lib/fetch";
import { clientResHandler } from "@/utils";
import { MEMBER } from "@/constants/endpoint";
import { Json } from "@/types/database.types";

export const getMembersQuery: (businessId: string) => Promise<Json> = async (
  businessId
) => {
  const response = await get(`${MEMBER}/${businessId}`);
  return clientResHandler(response);
};
