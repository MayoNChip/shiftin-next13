"use client";

import { createNewSchedule } from "@/actions/scheduleActions";
import MyDialog from "@/components/MyDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schedule } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateTimePicker } from "../settings/DateTimePicker";
import { useMemo, useState } from "react";
import NewScheduleForm from "./_components/NewScheduleForm";

function ScheduleList({ openedSchedules }: { openedSchedules: Schedule[] }) {
  const router = useRouter();

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
      <MyDialog title="Create New Schedule" buttonTitle="New Schedule">
        <NewScheduleForm />
      </MyDialog>
      {/* <Button onClick={handleCreateSchedule}>New Schedule</Button> */}
    </div>
  );
}

export default ScheduleList;
