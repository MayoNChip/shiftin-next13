"use client";

import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { FormGroup, useForkRef } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import SettingsFormStep from "./SettingsWeekStep";
import { Shift, ShiftType } from "@prisma/client";
import SettingsShiftsStep from "./SettingsShiftsStep";
import SettingsWeekStep from "./SettingsWeekStep";
import { InitialFormDataType, ShiftTypeInterface } from "@/commonTypes";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  shiftsTypes: ShiftType[];
  handleAddShiftType: (shiftType: ShiftTypeInterface) => any;
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

// export type INITIAL_FORM_DATA = typeof INITIAL_FORM_DATA;

function SettingsForm({ shiftsTypes, handleAddShiftType }: Props) {
  const [data, setData] = useState<InitialFormDataType>(INITIAL_FORM_DATA);

  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  const ChangeWeekFormData = (
    newWeek: {
      id: number;
      day: string;
      active: boolean;
    }[]
  ) => {
    setData((prev) => {
      return { ...prev, weekWorkDays: newWeek };
    });
  };

  const { currentStepIndex, next, steps, step, back, isLastStep } =
    useMultiStepForm([
      <SettingsWeekStep {...data} ChangeWeekFormData={ChangeWeekFormData} />,
      <SettingsShiftsStep
        {...data}
        shiftsTypes={shiftsTypes}
        handleAddShiftType={handleAddShiftType}
      />,
      <div>
        <h1>hello</h1>
      </div>,
    ]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!isLastStep) {
    console.log(currentStepIndex);
    if (currentStepIndex === 1) {
      if (shiftsTypes.length >= 2) {
        next();
      } else {
        toast({
          title: "Oops",
          description: "Please add atleast 2 shift types",
        });
        return;
      }
    }
    next();
    // } else {
    // 	return;
    // }
  };

  return (
    <div className="flex flex-col items-center w-1/2 p-6 border-x-2 border-opacity-30 border-slate-300 ">
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
