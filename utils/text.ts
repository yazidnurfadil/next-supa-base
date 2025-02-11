import type { User } from "next-auth";

export type JWT = {
  payload: User;
  header: string;
  signature: string;
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const decodeJWT = (token: string): JWT => {
  // Split the token into its three parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  // Decode the Base64Url encoded parts
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  const signature = parts[2];

  return {
    header: header,
    payload: payload,
    signature: signature,
  };
};

export const phonePrefixRemover = (phone: string) => {
  return phone.replace(/^(\+62|0)/g, "");
};

export const phonePrefixFormater = (phone: string) => {
  const phoneTruncated = phonePrefixRemover(phone);
  return `+62${phoneTruncated}`;
};

export const dateFormatter = (date: string | Date | null) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    year: "numeric",
    weekday: "long",
    month: "2-digit",
  });
};

export const priceFormatter = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  })
    .format(price)
    .replace(/(\.|,)00$/g, "");
};
