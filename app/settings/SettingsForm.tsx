"use client";

import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { FormGroup, useForkRef } from "@mui/material";
import React, { FormEvent, useState } from "react";
import SettingsFormStep from "./SettingsWeekStep";
import { Shift, ShiftType } from "@prisma/client";
import SettingsShiftsStep from "./SettingsShiftsStep";
import SettingsWeekStep from "./SettingsWeekStep";

interface Props {
  shiftsTypes: ShiftType[];
  handleAddShiftType: (shiftType: ShiftType) => any;
}

const INITIAL_FORM_DATA = {
  weekWorkDays: [
    {
      id: 1,
      day: "sunday",
      active: false,
    },
    {
      id: 2,
      day: "monday",
      active: false,
    },
    {
      id: 3,
      day: "tuesday",
      active: false,
    },
    {
      id: 4,
      day: "wednesday",
      active: false,
    },
    {
      id: 5,
      day: "thursday",
      active: false,
    },
    {
      id: 6,
      day: "friday",
      active: false,
    },
    {
      id: 7,
      day: "saturday",
      active: false,
    },
  ],
  shifts: [
    {
      shiftType: "",
      startTime: new Date(),
      endTime: new Date(),
    },
  ],
};

export type INITIAL_FORM_DATA = typeof INITIAL_FORM_DATA;

function SettingsForm({ shiftsTypes, handleAddShiftType }: Props) {
  const [data, setData] = useState(INITIAL_FORM_DATA);
  const { currentStepIndex, next, steps, step, back, isLastStep } =
    useMultiStepForm([
      <SettingsWeekStep />,
      <SettingsShiftsStep
        {...data}
        shiftsTypes={shiftsTypes}
        handleAddShiftType={handleAddShiftType}
      />,
    ]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currentStepIndex, isLastStep);
    if (!isLastStep) {
      next();
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center w-1/2 p-6 border-2 border-slate-500">
      <form onSubmit={handleSubmitForm}>
        {step}
        <div className="flex items-center justify-around w-72">
          {/* <Button variant="outline" onClick={back}>
						Back
					</Button> */}
          <Button type="button" onClick={back}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
