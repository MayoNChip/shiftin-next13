"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
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
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Button onClick={handleSignOut}>Sign Out</Button>
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
