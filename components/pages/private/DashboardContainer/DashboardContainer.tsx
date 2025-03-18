"use client";

import { useEffect } from "react";

import { useNavbarContext } from "@/hooks/useLayoutContext";
import { HouseIcon } from "@/components/atoms/Icons/breadcrumb/house-icon";

const DashboardContainer = ({
  session,
}: {
  session: Record<string, string>;
}) => {
  "use client";

  const { setPageTitle, setBreadcrumb } = useNavbarContext();
  useEffect(() => {
    setPageTitle("Dashboard");
    setBreadcrumb([
      {
        title: "Home",
        href: "/dashboard",
        icon: <HouseIcon width={18} height={18} />,
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold">Current Session</span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default DashboardContainer;
