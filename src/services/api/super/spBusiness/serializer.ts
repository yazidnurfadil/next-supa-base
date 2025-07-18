import { User } from "@supabase/supabase-js";
import { getCldImageUrl } from "next-cloudinary";

import { Json } from "@/types/database.types";
import { BusinessRes } from "@/types/business.type";

export const createBusinessSelializer = (data: User | null) => {
  if (!data) return {};
  const { id, email, user_metadata } = data;
  let avatar = user_metadata.avatar;
  let logo = user_metadata.logo;
  if (user_metadata.avatar) {
    avatar = getCldImageUrl({
      width: 160,
      height: 160,
      src: user_metadata.avatar,
    });
  }
  if (user_metadata.logo) {
    logo = getCldImageUrl({
      width: 160,
      height: 160,
      src: user_metadata.logo,
    });
  }
  return {
    id,
    email,
    avatar,
    logo: logo,
    name: user_metadata?.name,
    slug: user_metadata?.slug,
    phone: user_metadata?.phone,
    business_name: user_metadata?.business_name,
    business_phone: user_metadata?.business_phone,
  };
};

export const businessSelializer = (data: Json): BusinessRes => {
  // @ts-expect-error expect any
  const { metadata, personal_account: _personal_account, ...business } = data;
  const { business_image, ...newMetadata } = metadata;
  const logo = business_image
    ? getCldImageUrl({
        width: 160,
        height: 160,
        src: business_image,
      })
    : null;
  return { ...business, logo, ...newMetadata } as BusinessRes;
};
