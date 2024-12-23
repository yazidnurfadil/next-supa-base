/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { UploadApiResponse } from "cloudinary";
import { getCldImageUrl } from "next-cloudinary";

import { Json } from "@/types/database.types";

type UploadSerializer = {
  type: string;
  uploaded_by: string;
} & Pick<UploadApiResponse, "display_name" | "asset_id" | "format" | "url">;

export const profileSerializer = (data: Json) => {
  // @ts-expect-error expect any
  const { metadata, ...profile } = data;

  if (metadata.image) {
    // metadata.avatar = await getAssetUrl(metadata.avatar);
    metadata.avatar = getCldImageUrl({
      width: 160,
      height: 160,
      src: metadata.image,
    });
  }
  return {
    ...profile,
    ...metadata,
  };
};

export const uploadSerializer = (data: UploadApiResponse) => {
  const {
    format,
    metadata,
    asset_id,
    secure_url,
    display_name,
    resource_type,
  } = data;
  return {
    format,
    asset_id,
    display_name,
    url: secure_url,
    type: resource_type,
    ...metadata,
  } as UploadSerializer;
};
