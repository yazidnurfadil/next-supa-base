import { Database } from "@/types/database.types";

export type AccountSerialized = {
  name: string;
  email: string;
  image: string;
  phone: string;
  avatar: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  slug: string | null;
  billing_enabled: boolean;
  is_primary_owner: boolean;
  personal_account: boolean;
  billing_status: string | null;
  current_business: string | null;
  account_role: Database["basejump"]["Enums"]["account_role"];
};
