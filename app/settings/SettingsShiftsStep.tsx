"use client";

import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { Shift, ShiftType } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import FromWrapper from "./FromWrapper";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { INITIAL_FORM_DATA } from "./SettingsForm";

// import { handleAddShiftType } from "./controller";
import { ShiftTypeInterface } from "@/commonTypes";

type Props = INITIAL_FORM_DATA & {
  shiftsTypes: ShiftType[];
  handleAddShiftType: (shiftType: ShiftTypeInterface) => any;
};

function SettingsShiftsStep({
  shiftsTypes,
  handleAddShiftType,
  shifts,
}: Props) {
  const { currentStepIndex, next, steps, step, back } = useMultiStepForm([]);
  const [shiftType, setShiftType] = useState<(typeof shifts)[0]>({
    shiftType: "",
    startTime: new Date(),
    endTime: new Date(),
  });

  const handleShiftNameChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newShift = { ...shiftType, shiftType: e.target.value };
    setShiftType(newShift);
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = new Date(e.target.value);
    console.log(e.target.value);
    const newShift = { ...shiftType, startTime: selectedTime };
    setShiftType(newShift);
  };
  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = new Date(e.target.value);
    const newShift = { ...shiftType, endTime: selectedTime };
    setShiftType(newShift);
  };
  return (
    <FromWrapper title="Shifts Setup">
      <div className="flex w-[2SettingsShiftsStep50px] flex-col gap-4">
        <div>{/* <h1>Define Shifts</h1> */}</div>
        {/* <h1>Shift Name</h1> */}
        <FormGroup>
          <FormControl size="small" className="w-fit">
            <TextField
              id="outlined-size-small"
              label="Shift Name"
              variant="outlined"
              size="small"
              type="text"
              className="w-[150px]"
              required
              // onKeyUp={handleWeekNumberChange}
              onChange={handleShiftNameChange}
            />
          </FormControl>
          <FormControl size="small" className="w-fit">
            <TextField
              id="outlined-size-small"
              // label="Start Time"
              variant="outlined"
              size="small"
              type="datetime-local"
              className="w-full"
              // onKeyUp={handleWeekNumberChange}
              onChange={handleStartTimeChange}
              required
            />
          </FormControl>
          <FormControl size="small" className="w-fit">
            <TextField
              id="outlined-size-small"
              // label="End Time"
              variant="outlined"
              size="small"
              type="datetime-local"
              // className="w-[150px]"
              // onKeyUp={handleWeekNumberChange}
              onChange={handleEndTimeChange}
              required
            />
          </FormControl>
          <Button
            type="button"
            onClick={() => handleAddShiftType(shiftType)}
            variant="outlined"
          >
            Add Shift
          </Button>
        </FormGroup>
      </div>
      <div>
        {shiftsTypes &&
          shiftsTypes.map((shift: ShiftType) => {
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
      </div>
    </FromWrapper>
  );
}

export default SettingsShiftsStep;
