import { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginContainer } from "@/components/pages/public/LoginContainer";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return <LoginContainer />;
};

export default LoginPage;
