"use client";

import useSchedule from "@/utils/useSchedule";
import { shiftTypeToUser, UserToWorkDay } from "@prisma/client";
import React from "react";

type Props = {
  shiftTypes: shiftTypeToUser[];
  workDays: UserToWorkDay[];
};

async function ScheduleGrid({ shiftTypes, workDays }: Props) {
  // const { getShiftNames } = useSchedule({
  //   shiftTypesIds: shiftTypes.map((st) => st.shiftTypeId),
  //   workDaysIds: workDays.map((wd) => wd.workDayId),
  // });

  // const shiftNames = await getShiftNames();

  return (
    // create a grid of shift types / work days
    <div
      className={`grid grid-cols-${workDays.length + 1} grid-rows-${
        shiftTypes.length
      }  gap-4 w-2/3`}
    >
      <div className="col-start-1 h-8 w-fit">
        <h1 className="self-end"> Shift Types / Work Days</h1>
      </div>
      {workDays.map((workDay, i) => (
        <div
          key={workDay.workDayId}
          className={`col-start-${
            i + 2
          } border-b border-r border-gray-200 dark:border-gray-700 h-8`}
        >
          {workDay.workDayId}
        </div>
      ))}
      {shiftTypes.map((shiftType) => (
        <div
          key={shiftType.id}
          className="border-r border-gray-200 dark:border-gray-700 col-start-1 h-24"
        >
          {/* {shiftNames?.filter((s) => s. === shiftType.shiftTypeId)[0].name} */}
          {shiftType.shiftTypeId}
        </div>
      ))}
      {shiftTypes.map((st, rowIndex) =>
        workDays.map((wd, colIndex) => (
          <div
            key={`${wd.workDayId}-${st.shiftTypeId}`}
            className="border border-gray-200 dark:border-gray-700"
            style={{
              gridColumnStart: colIndex + 2,
              gridRowStart: rowIndex + 2,
            }}
          >
            {`${st.shiftTypeId}${wd.workDayId}`}
          </div>
        ))
      )}
    </div>
  );
}

export default ScheduleGrid;
