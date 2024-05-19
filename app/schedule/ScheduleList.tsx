"use client";

import MyDialog from "@/components/MyDialog";
import { Button } from "@/components/ui/button";
import { Schedule } from "@prisma/client";
import { useRouter } from "next/navigation";
import NewScheduleForm from "./_components/NewScheduleForm";
import { useState } from "react";

function ScheduleList({ openedSchedules }: { openedSchedules: Schedule[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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
      <MyDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create New Schedule"
        buttonTitle="New Schedule"
      >
        <NewScheduleForm setIsOpen={setIsOpen} />
      </MyDialog>
      {/* <Button onClick={handleCreateSchedule}>New Schedule</Button> */}
    </div>
  );
}

export default ScheduleList;
