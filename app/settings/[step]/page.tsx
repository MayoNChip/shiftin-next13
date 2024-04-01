import SettingsShiftsStep from "../SettingsShiftsStep";
import { prisma } from "@/lib/prisma";
import WorkDays from "../_components/WorkDays";
import TeamList from "@/app/team/_components/TeamList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserToWorkDay } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { setUserConfigured } from "@/actions/settingsActions";
import FinishSettingsButton from "../_components/FinishSettingsButton";

export default async function Page({ params }: { params: { step: string } }) {
  const session = await getServerSession(authOptions);
  const shiftsTypes = await prisma.shiftsToUser.findMany({
    where: { userId: session?.user?.id },
  });

  const weekWorkDays = await prisma.userToWorkDay.findMany({
    where: { userId: session?.user?.id },
    include: { workDay: true },
  });

  const userSettings = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      shifts: true,
      Employee: true,
      userToWorkDay: { include: { workDay: true } },
      shiftTypes: { include: { shiftType: true } },
    },
  });

  if (!userSettings || !session?.user) {
    return <h1>loading...</h1>;
  }

  console.log("user settings", userSettings);

  console.log("step ", params.step, weekWorkDays);
  if (params.step === "workdays") {
    return (
      <div className="flex w-full py-20">
        <WorkDays workDays={userSettings.userToWorkDay} />
      </div>
    );
  }

  if (params.step === "shifts") {
    return (
      <div className="flex items-center justify-center py-20">
        <SettingsShiftsStep shiftTypes={userSettings.shiftTypes} />
      </div>
    );
  }

  if (params.step === "team") {
    return (
      <div className="py-20">
        <TeamList ShiftTypes={userSettings.shiftTypes} />
        <FinishSettingsButton />
      </div>
    );
  }
}
// import React from "react";

// function page() {
// 	return <div></div>;
// }

// export default page;
