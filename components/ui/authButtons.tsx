"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./button";
import { redirect } from "next/navigation";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <>
      <Link href={"/signin"}>
        <Button>Sign In</Button>
      </Link>
    </>
  );
};

export const LogoutButton = () => {
  return (
    <>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </>
  );
};

export const RegisterButton = () => {
  return (
    <>
      <Link href={"/signup"}>
        <Button>Sign Up</Button>
      </Link>
    </>
  );
};
