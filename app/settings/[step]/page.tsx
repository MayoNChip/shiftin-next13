import SettingsShiftsStep from "../SettingsShiftsStep";
import { prisma } from "@/lib/prisma";
import WorkDays from "../_components/WorkDays";
import TeamList from "@/app/team/_components/TeamList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FinishSettingsButton from "../_components/FinishSettingsButton";
import { getUserSettings } from "@/actions/settingsActions";
import { redirect } from "next/navigation";

export default async function SettingsSteps({
  params,
}: {
  params: { step: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }
  const weekWorkDays = await prisma.userToWorkDay.findMany({
    where: { userId: session?.user?.id },
    include: { workDay: { include: { userToWorkDay: true } } },
  });

  const userShiftTypes = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      shiftTypes: { include: { shiftType: true } },
    },
  });

  const userSettings = await getUserSettings(session?.user?.id);

  if (!userShiftTypes || !session?.user || !userSettings?.Employee) {
    return <h1>loading...</h1>;
  }

  console.log("step ", params.step, weekWorkDays);
  if (params.step === "workdays") {
    return (
      <div className="flex w-full py-20">
        <WorkDays workDays={weekWorkDays} />
      </div>
    );
  }

  if (params.step === "shifts") {
    return (
      <div className="flex items-center justify-center py-20">
        <SettingsShiftsStep shiftTypes={userShiftTypes?.shiftTypes} />
      </div>
    );
  }

  if (params.step === "team") {
    return (
      <div className="py-20">
        <TeamList ShiftTypes={userShiftTypes?.shiftTypes} />
        <FinishSettingsButton employees={userSettings?.Employee} />
      </div>
    );
  }
}
