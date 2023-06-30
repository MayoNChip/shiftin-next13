"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./button";

export const LoginButton = () => {
	return (
		<>
			<Button onClick={() => signIn("google", { callbackUrl: "/welcome" })}>
				Sign In
			</Button>
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
			<Button
				onClick={() => {
					console.log("Register");
				}}
			>
				Register
			</Button>
		</>
	);
};
