import { ErrorpageContainer } from "@/components/pages/public/ErrorpageContainer";

export const NotFound = () => {
  const notFoundError = new Error("Page's not Found");
  return <ErrorpageContainer statusCode={404} error={notFoundError} />;
};

export default NotFound;
