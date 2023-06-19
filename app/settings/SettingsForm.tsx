"use client";

import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useForkRef } from "@mui/material";
import React from "react";
import SettingsFormStep from "./SettingsWeekStep";
import { ShiftType } from "@prisma/client";
import SettingsShiftsStep from "./SettingsShiftsStep";
import SettingsWeekStep from "./SettingsWeekStep";

interface Props {
	shiftsTypes: ShiftType[];
	handleAddShiftType: (shiftType: ShiftType) => void;
}

function SettingsForm({ shiftsTypes, handleAddShiftType }: Props) {
	const { currentStepIndex, next, steps, step, back } = useMultiStepForm([
		<SettingsWeekStep />,
		<SettingsShiftsStep
			shiftsTypes={shiftsTypes}
			handleAddShiftType={handleAddShiftType}
		/>,
	]);
	return (
		<div className="flex flex-col items-center w-1/2 p-6 border-2 border-slate-500">
			{step}
			<div className="flex items-center justify-around w-72">
				<Button variant="outline" onClick={back}>
					Back
				</Button>
				<Button onClick={next}>Next</Button>
			</div>
		</div>
	);
}

export default SettingsForm;
