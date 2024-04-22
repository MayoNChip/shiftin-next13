"use client";

import {
  Employee,
  ShiftTypeToEmployee,
  UserToWorkDay,
  WorkDay,
} from "@prisma/client";
import { ShiftTypeT } from "../settings/SettingsShiftsStep";
import { DragEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { cn } from "@/utils";

type Props = {
  workDays?: (UserToWorkDay & { workDay: WorkDay })[];
  shiftTypes?: ShiftTypeT[];
  userEmployees?: ({ shiftTypeToEmployee: ShiftTypeToEmployee[] } & Employee)[];
};

const ShiftSchema = z.object({
  shiftTypeId: z.string(),
  workDayId: z.string(),
  userId: z.string(),
  employees: z.string().array(),
});

type shiftSchedule = z.infer<typeof ShiftSchema>;

function NewSchedule({ shiftTypes, workDays, userEmployees }: Props) {
  const [shiftSchedule, setShiftSchedule] = useState<shiftSchedule[]>([]);
  const dragConstraintsRef = useRef(null);
  const [active, setActive] = useState<[string, string]>();

  const form = useForm<shiftSchedule>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: {
      shiftTypeId: "",
      workDayId: "",
      userId: "",
      employees: [],
    },
  });

  const onSubmit = (data: shiftSchedule) => {
    console.log(data);
    setShiftSchedule([...shiftSchedule, data]);
  };

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    workDayId: string,
    shiftTypeId: string
  ) => {
    e.preventDefault();
    setActive([workDayId, shiftTypeId]);
    console.log(
      "drag over",
      shiftTypeId,
      workDayId,
      e.dataTransfer?.getData("employeeId")
    );
  };

  // return (
  //   <table>
  //     <thead>my table</thead>
  //     <tr>
  //       <th>Shift/Day</th>
  //       {workDays
  //         ?.filter((d) => d.active)
  //         .map((day) => (
  //           <th key={day.id} className="capitalize">
  //             {day.workDay.day}
  //           </th>
  //         ))}
  //     </tr>
  //     <tbody>
  //       {shiftTypes?.map((st) => (
  //         <tr key={st.id}>
  //           <td>{st.shiftType.shiftType}</td>
  //           {workDays
  //             ?.filter((d) => d.active)
  //             .map((day) => (
  //               <td key={day.id} className="min-w-24 min-h-24">
  //                 <div className="w-24 h-24 flex items-center border-2 border-accent">
  //                   day {day.workDayId} {st.shiftType.shiftType}
  //                 </div>
  //               </td>
  //             ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );

  return (
    <div>
      {/* <Table className="w-fit" ref={dragConstraintsRef}>
        <TableHeader>
          <TableRow>
            <TableHead>Day/Shift</TableHead>
            {workDays
              ?.filter((d) => d.active)
              .map((day) => (
                <TableHead key={day.id} className="capitalize">
                  {day.workDay.day}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {shiftTypes?.map((st) => (
            <TableRow key={st.id}>
              <TableCell>{st.shiftType.shiftType}</TableCell>
              {workDays
                ?.filter((d) => d.active)
                .map((day) => (
                  <TableCell
                    key={day.id}
                    onDragOver={(e) => handleDragOver(e, day.id, st.id)}
                    onDrop={(e) =>
                      console.log(
                        "dropped",
                        st.shiftType.shiftType,
                        day.workDay.day,
                        userEmployees?.filter(
                          (emp) =>
                            emp.id === e.dataTransfer.getData("employeeId")
                        )[0].firstName
                      )
                    }
                    className="w-44 h-44 border-2 border-accent"
                  >
                    day {day.workDayId} {st.shiftType.shiftType}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <div className="flex">
        <div className="flex flex-col">
          <div className="text-center text-gray-400/50">day/shift</div>
          {shiftTypes?.map((st) => (
            <div className="h-48 border-r-2 border-primary flex items-center p-6">
              {st.shiftType.shiftType}
            </div>
          ))}
        </div>

        {workDays
          ?.filter((d) => d.active)
          .map((day, dayIndex) => (
            <div key={day.id} className="w-48 text-center">
              <h1 className="capitalize">{day.workDay.day}</h1>
              {shiftTypes?.map((st) => (
                <motion.div
                  layout
                  layoutId={st.id}
                  onDragOver={(e) => handleDragOver(e, day.id, st.id)}
                  onDragLeave={() => setActive(undefined)}
                  onDrop={(e) => {
                    console.log(
                      "dropped",
                      st.shiftType.shiftType,
                      day.workDay.day,
                      userEmployees?.filter(
                        (emp) => emp.id === e.dataTransfer.getData("employeeId")
                      )[0].firstName
                    );
                    setActive(undefined);
                  }}
                  className={cn(
                    active &&
                      active[0] === day.id &&
                      active[1] === st.id &&
                      "bg-secondary",
                    "w-48 h-48 border-secondary border-2"
                  )}
                >
                  shift
                </motion.div>
              ))}
            </div>
          ))}
      </div>
      <div className="container flex items-center justify-center">
        {userEmployees?.map((emp) => {
          return (
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("employeeId", emp.id);
                console.log(e.dataTransfer.getData("employeeId"));
              }}
              key={emp.id}
              className="flex w-24 h-24 bg-secondary items-center text-white p-4 m-4 rounded"
            >
              {emp.firstName}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewSchedule;
