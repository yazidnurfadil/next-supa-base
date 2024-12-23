import { apiResHandler } from "@/utils";
import { createSupaClient } from "@/lib/supabase";

type getMemberParams = {
  params: Promise<{ businessId: string }>;
};

export const getBusinessMember = async (
  _request: Request,
  { params }: getMemberParams
) => {
  const supabase = await createSupaClient();
  const businessId = (await params).businessId;
  const { data, error } = await supabase.rpc("get_account_members", {
    account_id: businessId,
  });

  return apiResHandler(data, error);
};
