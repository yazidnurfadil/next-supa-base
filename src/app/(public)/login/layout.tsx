import { LoginLayoutWrapper } from "@/components/template/LoginLayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginLayoutWrapper>{children}</LoginLayoutWrapper>;
}
