import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamList from "./_components/TeamList";

export default async function team() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  const userShiftTypes = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    select: { shiftTypes: { include: { shiftType: true } } },
  });

  return <TeamList ShiftTypes={userShiftTypes?.shiftTypes} />;
}
//
