import { getScheduleById, getScheduleShifts } from "@/actions/scheduleActions";
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
  const schedule = await getScheduleById(scheduleId, session?.user?.id);
  const scheduleShifts = await getScheduleShifts(scheduleId);
  // const userSettings = await getUserSettings(session?.user?.id);
  const userScheduleSettings = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      userToWorkDay: { include: { workDay: true } },
      shiftTypes: { include: { shiftType: true } },
      Employee: { include: { shiftTypeToEmployee: true } },
      shifts: true,
    },
  });
  const userShiftTypes = await prisma.shiftType.findMany({
    where: { shiftTypeToUser: { some: { userId: session?.user?.id } } },
  });

  if (!userShiftTypes || !userScheduleSettings) return null;

  // console.log(
  //   "schedule shifts from db",
  //   scheduleShifts[0]?.employees[0].employee?.firstName
  //   // userShiftTypes
  // );

  // console.log(
  //   "schedule",
  //   schedule
  //   // userShiftTypes
  // );

  return (
    <div className="flex flex-col items-center pt-10">
      <h1>
        {`${schedule?.startDate.toDateString()} - ${schedule?.endDate.toDateString()}`}
      </h1>
      {/* <NewSchedule
        userEmployees={userSettings?.Employee}
        shiftTypes={userSettings?.shiftTypes}
        workDays={userSettings?.userToWorkDay}
      /> */}
      <ScheduleGrid
        scheduleId={scheduleId}
        userWorkDays={userScheduleSettings?.userToWorkDay}
        shiftTypes={userScheduleSettings?.shiftTypes}
        userEmployees={userScheduleSettings?.Employee}
        schedule={schedule}
        scheduleShifts={scheduleShifts}
      />
    </div>
  );
}
