import { apiResHandler } from "@/utils";
import { createSupaClient } from "@/lib/supabase";

/**
 * This is an example JSDoc referring to the other class
 * @see MyClassName
 * /member/invite
 */
export const createBusinessInvitation = async (_req: Request) => {
  const supabase = await createSupaClient();
  const { data, error } = await supabase.rpc("create_invitation", {
    account_role: "member",
    invitation_type: "one_time",
    account_id: "5f1a524e-0639-4880-8574-c8e2d353ba15",
  });
  return apiResHandler(data, error);
};
