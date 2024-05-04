import { getScheduleById } from "@/actions/scheduleActions";
import { getUserSettings } from "@/actions/settingsActions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NewSchedule from "../NewSchedule";
import ScheduleGrid from "../ScheduleGrid";
import { prisma } from "@/lib/prisma";

export default async function Schedule({
  params,
}: {
  params: { scheduleId: string };
}) {
  const { scheduleId } = params;
  const session = await getServerSession(authOptions);
  const schedule = await getScheduleById(scheduleId);
  // const userSettings = await getUserSettings(session?.user?.id);
  const userWorkDays = await prisma.userToWorkDay.findMany({
    where: { userId: session?.user?.id },
  });
  const userShiftTypes = await prisma.shiftTypeToUser.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div>
      <h1>
        {`${schedule?.startDate.toDateString()} - ${schedule?.endDate.toDateString()}`}
      </h1>
      {/* <NewSchedule
        userEmployees={userSettings?.Employee}
        shiftTypes={userSettings?.shiftTypes}
        workDays={userSettings?.userToWorkDay}
      /> */}
      <ScheduleGrid workDays={userWorkDays} shiftTypes={userShiftTypes} />
    </div>
  );
}
