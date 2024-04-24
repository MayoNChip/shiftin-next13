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
import { useSession } from "next-auth/react";
import { TiDelete } from "react-icons/ti";

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
  const { data: session } = useSession();
  const [shiftSchedule, setShiftSchedule] = useState<shiftSchedule[]>([]);
  const dragConstraintsRef = useRef(null);
  const [active, setActive] = useState<[string, string]>();

  const form = useForm<shiftSchedule[]>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: [
      { shiftTypeId: "", workDayId: "", userId: "", employees: [] },
    ],
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

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    shiftTypeId: string,
    workDayId: string
  ) => {
    console.log(
      "dropped",
      shiftTypeId,
      workDayId,
      userEmployees?.filter(
        (emp) => emp.id === e.dataTransfer.getData("employeeId")
      )[0].firstName
    );
    setActive(undefined);
    const employeeId = e.dataTransfer.getData("employeeId");
    if (!e.dataTransfer?.getData("employeeId") || !session?.user) return;

    let selectedShift = shiftSchedule
      ?.filter((s) => s?.workDayId === workDayId)
      ?.filter((s) => s?.shiftTypeId === shiftTypeId)[0];

    if (selectedShift) {
      if (selectedShift.employees.includes(employeeId)) return;
      selectedShift.employees = [...selectedShift.employees, employeeId];
      setShiftSchedule([...shiftSchedule]);
    } else {
      selectedShift = {
        shiftTypeId,
        workDayId,
        userId: session?.user?.id,
        employees: [employeeId],
      };
      setShiftSchedule([...shiftSchedule, selectedShift]);
    }
  };

  const handleRemoveEmployee = (
    workDayId: string,
    shiftTypeId: string,
    employeeId: string
  ) => {
    const selectedShift = shiftSchedule
      .filter((s) => s.shiftTypeId === shiftTypeId)
      .filter((s) => s.workDayId === workDayId)[0];
    const employeeIndex = selectedShift.employees.findIndex(
      (e) => e === employeeId
    );

    selectedShift.employees.splice(employeeIndex, 1);
    setShiftSchedule([...shiftSchedule]);
  };

  console.log(shiftSchedule);

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col">
          <div className="text-center text-gray-400/50">day/shift</div>
          {shiftTypes?.map((st) => (
            <div
              key={st.id}
              className="h-48 border-r-2 border-primary flex items-center p-6"
            >
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
                  key={st.id}
                  layout
                  layoutId={st.id}
                  onDragOver={(e) => handleDragOver(e, day.id, st.id)}
                  onDragLeave={() => setActive(undefined)}
                  onDrop={(e) => handleDrop(e, st.id, day.id)}
                  className={cn(
                    active &&
                      active[0] === day.id &&
                      active[1] === st.id &&
                      "bg-secondary",
                    "w-48 h-48 border-secondary border-2"
                  )}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    {shiftSchedule
                      .filter((s) => s?.shiftTypeId === st.id)
                      .filter((dayId) => dayId?.workDayId === day.id)
                      .map((shift) => {
                        return (
                          <div
                            key={shift.shiftTypeId + shift.workDayId}
                            className="relative p-1"
                          >
                            {shift.employees.map((empId) => (
                              <div key={empId}>
                                <div
                                  onClick={() =>
                                    handleRemoveEmployee(day.id, st.id, empId)
                                  }
                                  className="w-4 h-4 rounded-full absolute  justify-center items-center top-1 right-0 bg-amber-700 flex"
                                >
                                  <TiDelete />
                                </div>
                                <h1 className="size-8 bg-primary/80 p-2 rounded-xl my-2">
                                  {
                                    userEmployees?.filter(
                                      (emp) => emp.id === empId
                                    )[0].firstName
                                  }
                                </h1>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                  </div>
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
                // e.preventDefault()
                e.dataTransfer.setData("employeeId", emp.id);
                console.log(e.dataTransfer.getData("employeeId"));
              }}
              key={emp.id}
              className="flex w-24 h-24 bg-secondary items-center cursor-grab active:cursor-grabbing text-white p-4 m-4 rounded"
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
