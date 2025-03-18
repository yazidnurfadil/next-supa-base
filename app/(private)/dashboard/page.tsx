import { Metadata } from "next";

import { auth } from "@/lib/auth";
import DashboardContainer from "@/components/pages/private/DashboardContainer/DashboardContainer";

export const metadata: Metadata = {
  title: "Dasbor",
};

const DashboardPage = async () => {
  const session = await auth();

  return (
    <DashboardContainer
      session={session as unknown as Record<string, string>}
    />
  );
};

export default DashboardPage;
