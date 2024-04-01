import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userSchedules = await prisma.shift.findMany({ take: 1 });

  console.log(session);

  !session && redirect("/signin");

  !session?.user?.configured && redirect("/settings");

  userSchedules.length < 1 && redirect("/nextsteps");

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {session && (
        <h1 className="text-3xl font-bold">Hello {session?.user?.name}</h1>
      )}
    </main>
  );
}
