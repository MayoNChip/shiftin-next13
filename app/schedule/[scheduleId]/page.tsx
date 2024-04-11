import { getScheduleById } from "@/actions/scheduleActions";
import { getUserSettings } from "@/actions/settingsActions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NewSchedule from "../NewSchedule";

export default async function Schedule({
  params,
}: {
  params: { scheduleId: string };
}) {
  const { scheduleId } = params;
  const session = await getServerSession(authOptions);
  const schedule = await getScheduleById(scheduleId);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    <div>
      <h1>schedule {scheduleId}</h1>
      <NewSchedule
        userEmployees={userSettings?.Employee}
        shiftTypes={userSettings?.shiftTypes}
        workDays={userSettings?.userToWorkDay}
      />
    </div>
  );
}
