import { getUserSettings } from "@/actions/settingsActions";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import NewSchedule from "./NewSchedule";
import { Button } from "@/components/ui/button";
import { createNewSchedule } from "@/actions/scheduleActions";
import ScheduleList from "./ScheduleList";

async function Schedule() {
  const session = await getServerSession(authOptions);

  const openedSchedules = await prisma.schedule.findMany({
    where: {
      userId: session?.user?.id,
      finished: false,
    },
  });

  if (!session || !session?.user) {
    redirect("/signin");
  }

  if (!session?.user?.configured) {
    redirect("/settings");
  }

  // return (
  //   <div>
  //     <NewSchedule
  //       workDays={userSettings?.userToWorkDay}
  //       shiftTypes={userSettings?.shiftTypes}
  //       userEmployees={userSettings?.Employee}
  //       schedules={openedSchedules}
  //     />
  //   </div>
  // );

  return <ScheduleList openedSchedules={openedSchedules} />;
}

export default Schedule;
