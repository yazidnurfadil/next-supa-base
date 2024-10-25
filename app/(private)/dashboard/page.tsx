import { Metadata } from "next";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dasbor",
};

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-4">
      <span className="text-3xl font-bold">Dashboard</span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
