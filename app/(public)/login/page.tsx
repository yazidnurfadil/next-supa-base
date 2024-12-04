import { redirect } from "next/navigation";

import { Metadata } from "next";

import { auth } from "@/lib/auth";
import { LoginContainer } from "@/components/pages/public/LoginContainer";

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
