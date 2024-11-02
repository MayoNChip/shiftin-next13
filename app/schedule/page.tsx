import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import ScheduleList from "./ScheduleList";

async function Schedule() {
  const session = await getServerSession(authOptions);

  const openedSchedules = await prisma.schedule.findMany({
    where: {
      userId: session?.user?.id,
      finished: false,
    },
    include: {
      shift: {
        include: {
          shift: {
            include: {
              employees: { include: { employee: true } },
            },
          },
        },
      },
    },
  });

  if (!session || !session?.user) {
    redirect("/signin");
  }

  if (!session?.user?.configured) {
    redirect("/settings");
  }

  console.log("schedule", openedSchedules);
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
