export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const decodeJWT = (token: string) => {
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
