import { SignUpUser } from "@/commonTypes";
import { SignUpForm } from "@/components/SignUpForm";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/PrismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
	const session = await getServerSession(authOptions);

	if (session?.user) {
		redirect("/");
		// <div className="flex items-center justify-center w-full min-h-screen">
		// 	<h1 className="text-3xl text-bold">Please sign in to access this page</h1>
		// </div>;
	}

	return (
		<div className="flex items-center justify-center w-full flex-column">
			<div className="flex flex-col self-center my-20">
				<div className="flex flex-col items-center min-w-[460px] shadow-md rounded-lg space-y-10 p-10">
					<div>
						<h1 className="text-2xl font-bold text-center">
							Sign in to your account
						</h1>
					</div>
					<SignUpForm />
				</div>
			</div>
		</div>
	);
}
