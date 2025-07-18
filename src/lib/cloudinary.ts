import { v2 } from "cloudinary";

const config = {
  secure: true,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
};

export const uploadImage = async (
  imagePath: string,
  options?: Record<string, boolean | string>
) => {
  const cld = v2;
  cld.config(config);
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const opts = {
    overwrite: true,
    use_filename: true,
    unique_filename: false,
    ...options,
  };

  // Upload the image
  const result = await cld.uploader.upload(imagePath, opts);
  return result;
};

export const getAssetInfo = async (publicId: string) => {
  const cld = v2;
  cld.config(config);
  // Return colors in the response
  const options = {
    colors: true,
  };

  // Get details about the asset
  const result = await cld.api.resource(publicId, options);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};

export const getAssetUrl = async (publicId: string) => {
  const cld = v2;
  cld.config(config);
  const options = {
    quality: "auto",
    fetch_format: "auto",
  };

  // Get details about the asset
  const optimizeUrl = await cld.api.resource(publicId, options);
  // const optimizeUrl = cloudinary.url(publicId, options);
  return optimizeUrl as string;
};

// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url("shoes", {
//   crop: "auto",
//   gravity: "auto",
//   width: 500,
//   height: 500,
// });

// console.log(autoCropUrl);
