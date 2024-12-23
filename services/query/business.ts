import { get, post } from "@/lib/fetch";
import { clientResHandler } from "@/utils";
import { Business } from "@/types/business.type";
import { DataListApiResponse } from "@/types/api";
import { postUpload } from "@/services/query/upload";
import { BUSINESS, CREATE_BUSINESS } from "@/constants/endpoint";

type getBussinessQueryProps =
  | {
      sort?: string;
      page?: number;
      limit?: number;
      search?: string;
      signal?: AbortSignal;
    }
  | undefined;

type PostBusinessQueryProps = {
  name: string;
  slug: string;
  logo?: string;
  email: string;
  phone: string;
  avatar?: string;
  businessName: string;
  businessPhone?: string;
};
export const getBusinessQuery = async ({
  search,
  signal,
  page = 0,
  limit = 10,
  sort = "createdDate",
}: getBussinessQueryProps = {}): Promise<DataListApiResponse<Business>> => {
  const response = await get(BUSINESS, {
    signal,
    params: { page, sort, limit, search },
  });

  return clientResHandler<DataListApiResponse<Business>>(response);
};

export const postBusinessQuery = async ({
  slug,
  name,
  logo,
  email,
  phone,
  avatar,
  businessName,
  businessPhone,
}: PostBusinessQueryProps): Promise<Business> => {
  const imagesUpload = [];
  let avatarIndex = null;
  let logoIndex = null;
  if (avatar) {
    const emailwithout = email.split("@")[0];
    imagesUpload.push(
      postUpload({ image: avatar, name: `avatar-${emailwithout}` })
    );
    avatarIndex = 0;
  }
  if (logo) {
    imagesUpload.push(postUpload({ image: logo, name: `logo-${slug}` }));
    logoIndex = avatar ? 1 : 0;
  }
  const imagesRes = await Promise.all(imagesUpload);
  const response = await post(CREATE_BUSINESS, {
    body: JSON.stringify({
      name,
      slug,
      email,
      phone,
      business_name: businessName,
      business_phone: businessPhone,
      logo: logoIndex !== null ? imagesRes?.[logoIndex]?.asset_id : undefined,
      avatar:
        avatarIndex !== null ? imagesRes?.[avatarIndex]?.asset_id : undefined,
    }),
  });
  return clientResHandler<Business>(response);
};
