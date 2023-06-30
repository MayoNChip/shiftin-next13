import { authOptions } from "@/lib/auth";
import prisma from "@/utils/PrismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

export default async function page() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/");
	}

	return (
		<div className="flex flex-col items-center w-full p-10">
			<div className="w-2/3 text-center shadow-md h-[450px]">
				<h1 className="text-4xl font-bold">Welcome {session?.user?.name}</h1>
			</div>
		</div>
	);
}
