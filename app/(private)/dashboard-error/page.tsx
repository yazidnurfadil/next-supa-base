import { ErrorpageContainer } from "@/components/pages/public/ErrorpageContainer";

type CustomDashboardErrorPageProps = {
  searchParams: Promise<{ status: string; statusText: string }>;
};

export async function generateMetadata({
  searchParams,
}: CustomDashboardErrorPageProps) {
  const { status } = await searchParams;
  return {
    title: status,
  };
}

export default async function CustomDashboardErrorPage({
  searchParams,
}: CustomDashboardErrorPageProps) {
  const { status, statusText } = await searchParams;
  const errorInstance = new Error(statusText);
  return (
    <ErrorpageContainer error={errorInstance} statusCode={Number(status)} />
  );
}
