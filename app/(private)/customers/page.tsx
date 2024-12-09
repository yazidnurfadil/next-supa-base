import { Metadata } from "next";

import { CustomerContainer } from "@/components/pages/private/CustomerContainer";

export const metadata: Metadata = {
  title: "Customer",
};

const AccountPage = () => {
  return <CustomerContainer />;
};

export default AccountPage;
