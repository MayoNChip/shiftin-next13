"use client";

import { Button } from "@mui/material";
import React, { ChangeEvent, useMemo, useState } from "react";
import FromWrapper from "./FromWrapper";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { InitialFormDataType, ShiftTypeInterface } from "@/commonTypes";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "./DateTimePicker";
import { ShiftType } from "@prisma/client";
import { DataTable } from "../team/data-table";
import { ShiftTypesColumns } from "../team/columns";

type Props = InitialFormDataType & {
  shiftsTypes: ShiftType[];
  handleAddShiftType: (shiftType: ShiftTypeInterface) => any;
};

function SettingsShiftsStep({ shiftsTypes, handleAddShiftType }: Props) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { currentStepIndex, next, steps, step, back } = useMultiStepForm([]);
  const [shiftType, setShiftType] = useState<InitialFormDataType["shifts"][0]>({
    shiftType: "",
    startTime: new Date(),
    endTime: new Date(),
  });
  useMemo(() => {
    const newShift = { ...shiftType, startTime: startDate, endTime: endDate };
    setShiftType(newShift);
  }, [startDate, endDate]);
  // useMemo(() => {
  //   const newShift = { ...shiftType, startTime: endDate };
  //   setShiftType(newShift);
  // }, [endDate]);

  console.log(shiftType);

  // const handleShiftNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const newShift = { ...shiftType, shiftType: e.target.value };
  //   setShiftType(newShift);
  // };

  // const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const selectedTime = new Date(startDate);
  //   console.log(startDate);
  //   const newShift = { ...shiftType, startTime: selectedTime };
  //   setShiftType(newShift);
  // };

  // const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const selectedTime = new Date(endDate);
  //   const newShift = { ...shiftType, endTime: selectedTime };
  //   setShiftType(newShift);
  // };

  return (
    <FromWrapper title="Shifts Setup">
      <div className="flex flex-col gap-4 ">
        <Input
          defaultValue={shiftType.shiftType}
          placeholder="Enter Shift Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setShiftType({ ...shiftType, shiftType: e.target.value });
          }}
        />
        <div className="flex gap-4 items-center">
          <label>Shift start time</label>
          <DateTimePicker date={startDate} setDate={setStartDate} />
          <label>Shift end time</label>
          <DateTimePicker date={endDate} setDate={setEndDate} />
        </div>
        <Button
          type="button"
          onClick={() => handleAddShiftType(shiftType)}
          variant="outlined"
          className="w-1/2 self-center"
        >
          Add Shift
        </Button>
      </div>

      <DataTable
        columns={ShiftTypesColumns}
        data={shiftsTypes}
        title="Shift Types"
      />

      {/* <div>
        {shiftsTypes &&
          shiftsTypes.map((shift: any) => {
            return (
              <div key={shift.id}>
                {shift.shiftType}
                <h1>
                  {shift.startTime.toTimeString()} -
                  {shift.endTime.toTimeString()}
                </h1>
              </div>
            );
          })}
      </div> */}
    </FromWrapper>
  );
}

export default SettingsShiftsStep;
