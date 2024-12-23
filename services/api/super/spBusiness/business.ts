import { NextRequest, NextResponse } from "next/server";

import * as crypto from "node:crypto";

import { apiResHandler } from "@/utils";
import { createSupaClient } from "@/lib/supabase";
import { businessSelializer } from "@/services/api/super/spBusiness/serializer";

export const createBusiness = async (req: Request) => {
  const supabase = await createSupaClient();
  const {
    name,
    slug,
    logo,
    email,
    phone,
    avatar,
    business_name,
    business_phone,
  } = await req.json();

  const passId = crypto.randomBytes(20).toString("hex");
  const { error: errorNewUser } = await supabase.auth.signUp({
    phone,
    email,
    password: passId,
    options: {
      emailRedirectTo: "https://example.com/welcome",
      data: {
        name,
        slug,
        logo,
        phone,
        avatar,
        business_name,
        business_phone,
      },
    },
  });

  if (errorNewUser?.code === "23505") {
    return NextResponse.json({ error: "slug already exists" }, { status: 400 });
  }

  const { data: newBusinessId, error: errorFindBusiness } = await supabase.rpc(
    "get_account_id",
    {
      slug,
    }
  );

  const { data: newData } = await supabase
    .from("business_accounts")
    .select("*")
    .eq("id", newBusinessId!)
    .limit(1);

  const res = businessSelializer(newData?.[0] ?? {});

  return apiResHandler(res, errorNewUser);
};

export const getBusiness = async (req: NextRequest) => {
  const supabase = await createSupaClient();
  const queryParams = req.nextUrl.searchParams;
  const page = Number(queryParams.get("page") || 1);
  const limit = Number(queryParams.get("limit") || 15);
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("business_accounts")
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);

  const res = data?.map((business) => businessSelializer(business)) || [];

  return apiResHandler(
    { page, data: res, total: count, per_page: limit },
    error
  );
};
