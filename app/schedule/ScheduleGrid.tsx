"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  Employee,
  ShiftType,
  ShiftTypeToEmployee,
  shiftTypeToUser,
  UserToWorkDay,
  WorkDay,
} from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import EmployeeDraggable from "./_components/EmployeeDraggable";
import ShiftDroppable from "./_components/ShiftDroppable";
import { Button } from "@/components/ui/button";
import {
  ScheduleShifts,
  ScheduleType,
  updateSchedule,
} from "@/actions/scheduleActions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export type UserShiftType = shiftTypeToUser & { shiftType: ShiftType };
export type UserWorkDay = UserToWorkDay & { workDay: WorkDay };

type Props = {
  scheduleId: string;
  shiftTypes: UserShiftType[];
  userWorkDays: UserWorkDay[];
  userEmployees: (Employee & { shiftTypeToEmployee: ShiftTypeToEmployee[] })[];
  schedule: ScheduleType | null | undefined;
  scheduleShifts: ScheduleShifts;
};

function ScheduleGrid({
  schedule,
  scheduleShifts,
  scheduleId,
  shiftTypes,
  userWorkDays,
  userEmployees,
}: Props) {
  const [isDropped, setIsDropped] = useState(false);
  const [scheduleData, setScheduleData] = useState<
    { shiftTypeId: string; workDayId: string; employeeId: string }[]
  >([]);
  const { data: session } = useSession();

  const filtered = (st: UserShiftType, wd: UserWorkDay) =>
    scheduleData?.filter(
      (shift) => shift.shiftTypeId === st.id && shift.workDayId === wd.id
    );

  // const draggableMarkup = <Draggable>Drag me</Draggable>;

  useEffect(() => {
    if (!scheduleShifts) return;
    const data = scheduleShifts.map((shift) => {
      return {
        shiftTypeId: shift.shiftTypeId!,
        workDayId: shift?.workDayId!,
        employeeId: shift.employees.filter((e) => e.shiftId === shift.id)[0]
          .employeeId!,
      };
    });
    setScheduleData(data);
  }, [schedule]);

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      const newShift = {
        workDayId: event.over.data.current?.workDay.id.toString(),
        shiftTypeId: event.over.data.current?.shiftType.id.toString(),
        employeeId: event.active.id.toString(),
      };
      setScheduleData([...scheduleData, newShift]);
      setIsDropped(true);
    }
  }

  const handleScheduleSubmit = () => {
    if (!session?.user?.id) {
      redirect("/signin");
    }
    const res = updateSchedule({
      schedule: scheduleData,
      scheduleId,
      userId: session?.user?.id,
    });
    setIsDropped(false);
  };
  // console.log("schedule", schedule);

  // function handleDragStart(event: DragStartEvent) {
  //   console.log("DRAG START", event);
  // }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className={`grid grid-cols-[fit-content(500px),auto] grid-cols-${
          userWorkDays.length + 1
        } grid-rows-${shiftTypes.length} w-2/3`}
      >
        <div className="col-start-1 py-2 border-2 px-2 border-secondary whitespace-nowrap my-auto min-h-[50px]">
          <h1 className="font-extralight text-sm"> Shift Types / Work Days</h1>
        </div>
        {userWorkDays
          .filter((wd) => wd.active)
          .toSorted((a, b) => a.workDayId - b.workDayId)
          .map((workDay, i) => (
            <div
              key={workDay.id}
              className={`col-start-${
                i + 2
              } border-2 border-secondary h-fit px-4 py-2 min-h-[50px] flex flex-col items-center justify-center `}
            >
              <h2 className="font-extralight text-sm">{workDay.workDay.day}</h2>
            </div>
          ))}
        {shiftTypes.map((shiftType) => (
          <div
            key={shiftType.id}
            className="border-2 border-secondary col-start-1 p-4 flex justify-center py-auto  items-center "
          >
            <h2 className="font-extralight text-sm">
              {shiftType.shiftType.shiftType}
            </h2>
          </div>
        ))}
        {shiftTypes.map((st, rowIndex) =>
          userWorkDays
            .filter((wd) => wd.active)
            .map((wd, colIndex) => (
              <ShiftDroppable
                key={`${st.id}${wd.workDayId}`}
                workDay={wd}
                shiftType={st}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isDropped={isDropped}
                userEmployees={userEmployees}
                shiftEmployees={scheduleData}
                scheduleShifts={scheduleShifts}
                schedule={schedule}
              />
            ))
        )}
      </div>
      <div className="flex">
        {userEmployees?.map((employee) => {
          return <EmployeeDraggable {...employee} key={employee.id} />;
        })}
      </div>
      <Button variant="outline" onClick={handleScheduleSubmit}>
        Update Schedule
      </Button>
    </DndContext>
  );
}

export default ScheduleGrid;
