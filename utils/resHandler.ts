import { NextResponse } from "next/server";

import { errors as vineErrors } from "@vinejs/vine";
import { PostgrestError } from "@supabase/supabase-js";

import { Json } from "@/types/database.types";
import { objKeyCamelCase } from "@/utils/objKeyCamelCase";

export const apiResHandler = (
  data: Json,
  error: typeof vineErrors | PostgrestError | Error | null
) => {
  if (error) {
    if ((error as PostgrestError).code === "42501") {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    } else if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      // array created by SimpleErrorReporter
      return NextResponse.json({ error: error.messages }, { status: 422 });
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
};

export const clientResHandler = async <T = Json>(
  response: Response
): Promise<T> => {
  if (!response) {
    return Promise.resolve({}) as Promise<T>;
  }
  const jsonRes = await response.json();
  return Promise.resolve(objKeyCamelCase(jsonRes)) as Promise<T>;
};
