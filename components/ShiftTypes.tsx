"use client";

import { Button, FormControl, TextField } from "@mui/material";
import { ShiftType } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";

interface Props {
	shiftsTypes: ShiftType[];
	handleAddShiftType: (shiftType: ShiftType) => Promise<ShiftType>;
}

function ShiftTypes({ shiftsTypes, handleAddShiftType }: Props) {
	const [shiftType, setShiftType] = useState<ShiftType>({
		id: 1,
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
		<>
			<div className="flex w-[250px] flex-col gap-4">
				<div>
					<h1>Define Shifts</h1>
				</div>
				{/* <h1>Shift Name</h1> */}
				<FormControl size="small" className="w-fit">
					<TextField
						id="outlined-size-small"
						label="Shift Name"
						variant="outlined"
						size="small"
						type="text"
						className="w-[150px]"
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
					/>
				</FormControl>
				<Button
					variant="outlined"
					onClick={() => {
						handleAddShiftType(shiftType);
					}}
				>
					Add Shift
				</Button>
			</div>
			<div>
				{shiftsTypes &&
					shiftsTypes.map((shift) => {
						return (
							<div key={shift.id}>
								{shift.shiftType}
								<h1>
									{shift.startTime.toLocaleTimeString()} -
									{shift.endTime.toLocaleTimeString()}
								</h1>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default ShiftTypes;
