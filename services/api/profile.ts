import { PostgrestError } from "@supabase/supabase-js";

import { apiResHandler } from "@/utils";
import { Json } from "@/types/database.types";
import { createSupaClient } from "@/lib/supabase";

import { profileSerializer } from "./serializer";

export const getProfile = async () => {
  const supabase = await createSupaClient();

  const { data, error } = await supabase.rpc("get_personal_account");
  if (error) {
    throw error;
  }
  const personalAcccount = profileSerializer(data);
  let activeBusiness = null;

  if (
    personalAcccount.account_role !== "super" &&
    personalAcccount.current_business
  ) {
    const { error: errorBusiness, data: businessAccount } = await supabase.rpc(
      "get_account",
      {
        account_id: personalAcccount.current_business,
      }
    );
    if (errorBusiness) {
      throw errorBusiness;
    }

    activeBusiness = businessAccount;
  } else if (personalAcccount.account_role !== "super") {
    const { data: allAccountData, error: errorAllAccount } =
      await supabase.rpc("get_accounts");
    if (errorAllAccount) {
      throw errorAllAccount;
    }
    const businessData = (allAccountData as Json[])?.filter(
      (account) => !(account as { personal_account: boolean }).personal_account
    );
    if (businessData?.length > 0) {
      activeBusiness = (
        businessData?.[0] as { account_id: string | number | null }
      ).account_id;
      await supabase.rpc("update_account", {
        account_id: personalAcccount.account_id,
        public_metadata: {
          current_business: activeBusiness,
        },
      });
    }
  }
  const fixData = {
    ...personalAcccount,
    active_business: activeBusiness,
  };

  return fixData;
};

export const retriveProfile = async () => {
  try {
    const data = await getProfile();
    return apiResHandler(data, null);
  } catch (error) {
    return apiResHandler(null, error as PostgrestError);
  }
};
