"use client";

import {
  Employee,
  ShiftType,
  ShiftTypeToEmployee,
  shiftTypeToUser,
  UserToWorkDay,
  WorkDay,
} from "@prisma/client";
import React from "react";

type Props = {
  shiftTypes: (shiftTypeToUser & { shiftType: ShiftType })[] | undefined;
  userWorkDays: (UserToWorkDay & { workDay: WorkDay })[] | undefined;
  userEmployees:
    | ({ shiftTypeToEmployee: ShiftTypeToEmployee[] } & Employee)[]
    | undefined;
};

async function ScheduleGrid({
  shiftTypes,
  userWorkDays,
  userEmployees,
}: Props) {
  if (!userWorkDays || !shiftTypes) return null;

  return (
    <>
      <div
        className={`grid grid-cols-${userWorkDays.length + 1} grid-rows-${
          shiftTypes.length
        } w-2/3`}
      >
        <div className="col-start-1 py-2 border-2 border-secondary whitespace-nowrap my-auto">
          <h1> Shift Types / Work Days</h1>
        </div>
        {userWorkDays
          .filter((wd) => wd.active)
          .toSorted((a, b) => a.workDayId - b.workDayId)
          .map((workDay, i) => (
            <div
              key={workDay.id}
              className={`col-start-${
                i + 2
              } border-2 border-secondary h-fit px-4 py-2`}
            >
              {workDay.workDay.day}
            </div>
          ))}
        {shiftTypes.map((shiftType) => (
          <div
            key={shiftType.id}
            className="border-2 border-secondary col-start-1 p-10 flex justify-center"
          >
            {shiftType.shiftType.shiftType}
          </div>
        ))}
        {shiftTypes.map((st, rowIndex) =>
          userWorkDays
            .filter((wd) => wd.active)
            .map((wd, colIndex) => (
              <div
                key={`${wd.id}-${st.id}`}
                className="border-2 border-secondary rounded flex flex-col items-center py-2"
                style={{
                  gridColumnStart: colIndex + 2,
                  gridRowStart: rowIndex + 2,
                }}
              >
                {`${st.shiftType.shiftType}`}
              </div>
            ))
        )}
      </div>
      <div className="flex">
        {userEmployees?.map((employee) => {
          return (
            <div
              key={employee.id}
              className="bg-primary text-white p-2 m-2 rounded cursor-grab"
            >
              {employee.firstName} {employee.lastName}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ScheduleGrid;
