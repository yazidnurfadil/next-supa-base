import { post } from "@/lib/fetch";
import { clientResHandler } from "@/utils";
import { UPLOAD } from "@/constants/endpoint";

type PostUpload = (payload: PostUploadPayload) => Promise<PostUploadResponse>;
type PostUploadPayload = {
  name: string;
  type?: string;
  image: string;
};

type PostUploadResponse = {
  url: string;
  type: string;
  format: string;
  asset_id: string;
  uploaded_by: string;
  display_name: string;
};

export const postUpload: PostUpload = async (payload) => {
  const response = await post(UPLOAD, { body: JSON.stringify(payload) });
  return clientResHandler<PostUploadResponse>(response);
};
