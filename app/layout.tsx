import { RootLayoutWrapper } from "@/components/template/RootLayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutWrapper>{children}</RootLayoutWrapper>;
}
