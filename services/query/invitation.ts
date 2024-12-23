import { post } from "@/lib/fetch";
import { clientResHandler } from "@/utils";
import { Json } from "@/types/database.types";
import { MEMBER_INVITE } from "@/constants/endpoint";

export const createInvitationQuery: (
  businessId: string
) => Promise<Json> = async (businessId) => {
  const response = await post(`${MEMBER_INVITE}`, {
    body: JSON.stringify({ businessId }),
  });
  return clientResHandler(response);
};
