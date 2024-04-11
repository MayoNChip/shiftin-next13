"use client";

import { createNewSchedule } from "@/actions/scheduleActions";
import { Button } from "@/components/ui/button";
import { Schedule } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ScheduleList({ openedSchedules }: { openedSchedules: Schedule[] }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateSchedule = async () => {
    const scheduleRes = await createNewSchedule({ userId: session?.user?.id });
    // if (scheduleRes?.id) {
    //   setScheduleId(scheduleRes.id);
    // }
    router.push(`/schedule/${scheduleRes?.id}`);
  };

  return (
    <div className="flex flex-col items-center">
      {openedSchedules.map((schedule) => {
        return (
          <div
            key={schedule.id}
            className="flex w-1/2 justify-between mx-auto mt-10"
          >
            <div>{schedule.id}</div>
            <Button
              type="button"
              onClick={() => router.push(`/schedule/${schedule.id}`)}
            >
              Edit Schedule
            </Button>
          </div>
        );
      })}
      <Button onClick={handleCreateSchedule}>New Schedule</Button>
    </div>
  );
}

export default ScheduleList;
