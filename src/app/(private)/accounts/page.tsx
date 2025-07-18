import { Metadata } from "next";

import { AccountsContainer } from "@/components/pages/private/AccountsContainer";

export const metadata: Metadata = {
  title: "Account",
};

const AccountPage = () => {
  return <AccountsContainer />;
};

export default AccountPage;
