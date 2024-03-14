import AuthSignIn from "@/components/auth/auth.signin";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <AuthSignIn></AuthSignIn>
    </div>
  );
};

export default SignInPage;
