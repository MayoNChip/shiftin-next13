"use client";

import { Checkbox, FormControlLabel } from "@mui/material";
import { ShiftType, WorkDay } from "@prisma/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import FromWrapper from "./FromWrapper";
import { InitialFormDataType } from "@/commonTypes";

// interface Props {
// 	// handleSubmitForm: (
// 	// 	e: FormEvent<HTMLDivElement>,
// 	// 	shiftType: ShiftType,
// 	// 	next: () => void
// 	// ) => void;

// }

type Props = InitialFormDataType & {
	ChangeWeekFormData: (newWeek: InitialFormDataType["weekWorkDays"]) => void;
};

// const weekFormData = {
// 	monthWeek: { week: 0, month: "january" },
// 	weekWorkDays: [
// 		{
// 			id: 1,
// 			day: "sunday",
// 			active: false,
// 		},
// 		{
// 			id: 2,
// 			day: "monday",
// 			active: false,
// 		},
// 		{
// 			id: 3,
// 			day: "tuesday",
// 			active: false,
// 		},
// 		{
// 			id: 4,
// 			day: "wednesday",
// 			active: false,
// 		},
// 		{
// 			id: 5,
// 			day: "thursday",
// 			active: false,
// 		},
// 		{
// 			id: 6,
// 			day: "friday",
// 			active: false,
// 		},
// 		{
// 			id: 7,
// 			day: "saturday",
// 			active: false,
// 		},
// 	],
// };

function SettingsWeekStep({ weekWorkDays, ChangeWeekFormData }: Props) {
	const [weekDays, setWeekDays] = useState<WorkDay[]>(weekWorkDays);

	const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!weekDays) {
			return;
		}
		const idx = parseInt(e.currentTarget.value);
		const day = weekDays.filter((day, index) => index === idx)[0];
		const workDaysArray = [...weekDays];
		const dayToUpdate = workDaysArray.filter((day, indx) => indx === idx);
		if (day) {
			dayToUpdate[0] = { ...day, active: e.currentTarget.checked };
			workDaysArray[idx] = dayToUpdate[0];
		}
		console.log(workDaysArray);
		setWeekDays([...workDaysArray]);
		ChangeWeekFormData(workDaysArray);
	};
	return (
		<FromWrapper title="Work Week Setup">
			<div className="flex flex-col w-full">
				{/* <h1 className="px-4 text-xl font-semibold ">Define days of work</h1> */}
				{weekDays &&
					weekDays.map((day, idx) => {
						return (
							<div className="flex items-center w-full ml-10" key={day.day}>
								{/* <div>{idx}</div> */}
								<div className="flex items-center w-full">
									<FormControlLabel
										control={
											<Checkbox
												checked={day.active}
												name={day.day.toUpperCase()}
												value={idx}
												onChange={handleWeekChange}
											/>
										}
										label={day.day.toUpperCase()}
									/>
								</div>
							</div>
						);
					})}
			</div>
		</FromWrapper>
	);
}

export default SettingsWeekStep;
