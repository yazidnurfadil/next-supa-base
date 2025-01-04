import { auth } from "@/lib/auth";
import { apiResHandler } from "@/utils";
// import { uploadImage } from "@/lib/cloudinary";
// import { uploadSerializer } from "@/services/api/serializer";

export const submitUpload = async (request: Request) => {
  const { name, type, image } = await request.json();
  const session = await auth();

  const res = {};
  const folderName: Record<string, string> = {
    logo: "logo",
    public: "public",
    profile: "account",
  };

  const folder = folderName[(type as string) || "public"];

  let error = null;
  try {
    // const resUpload = await uploadImage(image as string, {
    //   public_id: name,
    //   asset_folder: folder,
    //   metadata: `uploaded_by=${session!.user.account_id}`,
    // });
    // res = uploadSerializer(resUpload);
    return apiResHandler({ asdasd: "asdasdasdasd" }, error);
  } catch (err) {
    error = err as Error;
    return apiResHandler(res, error);
  }
};
