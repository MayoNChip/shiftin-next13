"use client";

import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { Shift, ShiftType } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import FromWrapper from "./FromWrapper";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";

// import { handleAddShiftType } from "./controller";
import { InitialFormDataType, ShiftTypeInterface } from "@/commonTypes";
import { Input } from "@/components/ui/input";

type Props = InitialFormDataType & {
	shiftsTypes: ShiftType[];
	handleAddShiftType: (shiftType: ShiftTypeInterface) => any;
};

function SettingsShiftsStep({
	shiftsTypes,
	handleAddShiftType,
	shifts,
}: Props) {
	const { currentStepIndex, next, steps, step, back } = useMultiStepForm([]);
	const [shiftType, setShiftType] = useState<InitialFormDataType["shifts"][0]>({
		shiftType: "",
		startTime: new Date(),
		endTime: new Date(),
	});

	const handleShiftNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
			<div className="flex flex-col gap-4">
				<FormGroup className="gap-6">
					<div className="flex">
						{/* <FormControl size="small" className="w-fit"> */}
						{/* <TextField
								label="Shift Name"
								id="outlined-size-small"
								variant="outlined"
								size="small"
								type="text"
								className="w-[150px]"
								value={shiftType.shiftType}
								// onKeyUp={handleWeekNumberChange}
								onChange={handleShiftNameChange}
							/> */}
						<label>Shift start time</label>
						<Input
							className="w-fit"
							type="datetime-local"
							value={shiftType.shiftType}
							onChange={(e) => handleShiftNameChange(e)}
						/>
						{/* </FormControl> */}
						<FormControl size="small" className="w-fit">
							<TextField
								id="outlined-size-small"
								label="Start Time"
								variant="outlined"
								size="small"
								type="datetime-local"
								className="w-full"
								value={shiftType.startTime}
								// onKeyUp={handleWeekNumberChange}
								onChange={handleStartTimeChange}
							/>
						</FormControl>
						<label>Shift end time</label>
						<Input
							className="w-fit"
							type="datetime-local"
							value={shiftType.endTime.toUTCString()}
							onChange={(e) => handleEndTimeChange(e)}
						/>
						<FormControl size="small" className="w-fit">
							<TextField
								id="outlined-size-small"
								label="End Time"
								variant="outlined"
								size="small"
								type="datetime-local"
								value={shiftType.endTime}
								// className="w-[150px]"
								// onKeyUp={handleWeekNumberChange}
								onChange={handleEndTimeChange}
							/>
						</FormControl>
					</div>
					<Button
						type="button"
						onClick={() => handleAddShiftType(shiftType)}
						variant="outlined"
						className="w-fit"
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
