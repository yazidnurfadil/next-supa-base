import { ErrorpageContainer } from "@/components/pages/public/ErrorpageContainer";

export default async function NotFound() {
  const notFoundError = new Error("Page's not Found");
  return <ErrorpageContainer error={notFoundError} statusCode={404} />;
}
