import { Metadata } from "next";

import { BusinessContainer } from "@/components/pages/private/super/BusinessContainer";

export const metadata: Metadata = {
  title: "Business",
};

const BusinessPage = () => {
  return <BusinessContainer />;
};

export default BusinessPage;
