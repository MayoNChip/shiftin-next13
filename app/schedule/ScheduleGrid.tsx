"use client";

import { cn } from "@/utils";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  Employee,
  ShiftType,
  ShiftTypeToEmployee,
  shiftTypeToUser,
  UserToWorkDay,
  WorkDay,
} from "@prisma/client";
import React, { useState } from "react";
import EmployeeDraggable from "./_components/EmployeeDraggable";
import ShiftDroppable from "./_components/ShiftDroppable";
import { Button } from "@/components/ui/button";

export type UserShiftType = shiftTypeToUser & { shiftType: ShiftType };
export type UserWorkDay = UserToWorkDay & { workDay: WorkDay };
type Props = {
  shiftTypes: UserShiftType[];
  userWorkDays: UserWorkDay[];
  userEmployees:
    | ({ shiftTypeToEmployee: ShiftTypeToEmployee[] } & Employee)[]
    | undefined;
};

function ScheduleGrid({ shiftTypes, userWorkDays, userEmployees }: Props) {
  const [isDropped, setIsDropped] = useState(false);
  const [schedule, setSchedule] = useState<
    { shiftTypeId: string; workDayId: string; employeeId: string }[]
  >([]);
  const filtered = (st: UserShiftType, wd: UserWorkDay) => {
    const res = schedule?.filter((shift) => {
      console.log(
        "params",
        st.id,
        wd.id,
        "shift",
        shift.shiftTypeId,
        shift.workDayId,
        shift.shiftTypeId === st.id,
        shift.workDayId === wd.id
      );
      return shift.shiftTypeId === st.id && shift.workDayId === wd.id;
    });
    return res;
  };

  // const draggableMarkup = <Draggable>Drag me</Draggable>;

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      console.log(event);
      const newShift = {
        workDayId: event.over.data.current?.workDay.id.toString(),
        shiftTypeId: event.over.data.current?.shiftType.id.toString(),
        employeeId: event.active.id.toString(),
      };
      console.log("newShift", newShift);
      setSchedule([...schedule, newShift]);
      setIsDropped(true);
    }
  }

  // console.log("schedule", schedule);

  function handleDragStart(event: DragStartEvent) {
    console.log("DRAG START", event);
  }

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
                shiftEmployees={filtered(st, wd)}
              />
            ))
        )}
      </div>
      <div className="flex">
        {userEmployees?.map((employee) => {
          return <EmployeeDraggable {...employee} key={employee.id} />;
        })}
      </div>
    </DndContext>
  );
}

export default ScheduleGrid;
