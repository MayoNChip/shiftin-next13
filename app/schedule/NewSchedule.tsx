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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [removeFromShift, setRemoveFromShift] = useState<ShiftTypeT>();

  const form = useForm<shiftSchedule[]>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: [
      { shiftTypeId: "", workDayId: "", userId: "", employees: [] },
    ],
  });

  const getShiftDetails = (
    data: { shiftType: string } | { workDay: string }
  ) => {
    if ("shiftType" in data) {
      return shiftTypes?.filter((shift) => shift.id === data.shiftType)[0];
    } else {
      return workDays?.filter((workDay) => workDay.id === data.workDay)[0];
    }
  };

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

  if (!shiftTypes || !workDays || !userEmployees) return <div>Loading...</div>;

  return (
    <div className="flex items-center">
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
                                {/* <TiDelete
                                  className="w-4 h-4 rounded-full absolute cursor-pointer justify-center items-center top-1 right-0 bg-primary flex"
                                  onClick={() =>
                                    handleRemoveEmployee(day.id, st.id, empId)
                                  }
                                /> */}
                                <AlertDialog>
                                  <AlertDialogTrigger
                                  // onClick={() =>
                                  //   setRemoveFromShift(
                                  //     getShiftById(
                                  //       shiftTypes,
                                  //       shift.shiftTypeId
                                  //     )
                                  //   )
                                  // }
                                  >
                                    <TiDelete className="w-4 h-4 rounded-full absolute cursor-pointer justify-center items-center top-1 right-0 bg-primary flex" />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Remove{" "}
                                        {
                                          userEmployees?.filter(
                                            (emp) => emp.id === empId
                                          )[0].firstName
                                        }
                                        ?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {
                                          userEmployees?.filter(
                                            (emp) => emp.id === empId
                                          )[0].firstName
                                        }{" "}
                                        will be removed from{" "}
                                        {/* {getShiftDetails({ shiftType: st.id })} */}
                                        shift on {day.workDay.day}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction>
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
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
      <div className="container flex flex-col items-center justify-center">
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
              className="flex w-24 h-24 bg-secondary items-center cursor-grab active:cursor-grabbing text-foreground p-4 m-4 rounded"
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
