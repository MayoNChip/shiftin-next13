"use client";

import {
  Employee,
  Schedule,
  ShiftTypeToEmployee,
  UserToWorkDay,
  WorkDay,
} from "@prisma/client";
import { ShiftTypeT } from "../settings/SettingsShiftsStep";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createNewSchedule } from "@/actions/scheduleActions";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Props = {
  workDays?: (UserToWorkDay & { workDay: WorkDay })[];
  shiftTypes?: ShiftTypeT[];
  userEmployees?: ({ shiftTypeToEmployee: ShiftTypeToEmployee[] } & Employee)[];
};

const ShiftSchema = z.object({
  shiftTypeId: z.string(),
  workDayId: z.string(),
  userId: z.string(),
  employeeId: z.string(),
});

type shiftSchedule = z.infer<typeof ShiftSchema>;

function NewSchedule({ shiftTypes, workDays, userEmployees }: Props) {
  const { data: session } = useSession();
  const [shiftSchedule, setShiftSchedule] = useState<shiftSchedule[]>([]);

  const form = useForm<shiftSchedule>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: {
      shiftTypeId: "",
      workDayId: "",
      userId: "",
      employeeId: "",
    },
  });

  const onSubmit = (data: shiftSchedule) => {
    console.log(data);
    setShiftSchedule([...shiftSchedule, data]);
  };

  console.log(workDays);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Day/Shift</TableHead>
          {workDays
            ?.filter((d) => d.active)
            .map((day) => (
              <TableHead className="capitalize">{day.workDay.day}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {shiftTypes?.map((st) => (
          <TableRow>
            <TableCell>{st.shiftType.shiftType}</TableCell>
            {workDays
              ?.filter((d) => d.active)
              .map((day) => (
                <TableCell>day {day.workDayId}</TableCell>
              ))}
          </TableRow>
        ))}

        {/* {workDays
          ?.filter((d) => d.active)
          .map((day) => (
            <TableCell></TableCell>
          ))} */}

        {/* option to add employees here */}
      </TableBody>
    </Table>
  );
}

export default NewSchedule;
