import { Container } from "@/components/atoms/Container";
import { DashboardLayoutWrapper } from "@/components/template/DashboardLayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutWrapper>
      <Container>{children}</Container>
    </DashboardLayoutWrapper>
  );
}
