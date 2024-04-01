"use client";

import React, { ChangeEvent, useState } from "react";
import FromWrapper from "./FromWrapper";
import { InitialFormDataType } from "@/commonTypes";
import { Button } from "@/components/ui/button";
import { handleSaveWeekWorkDays } from "@/actions/settingsActions";
import { Skeleton } from "@/components/ui/skeleton";
import { INITIAL_FORM_DATA } from "./page";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = InitialFormDataType & {
	loading: boolean;
};

function SettingsWeekStep({ weekWorkDays, loading }: Props) {
	const [data, setData] = useState<InitialFormDataType>(INITIAL_FORM_DATA);

	const handleWeekChange = (checked: CheckedState) => {
		if (!weekWorkDays) {
			return;
		}
		console.log(checked);
		// const idx = parseInt(e.currentTarget.value);
		// const day = weekWorkDays.filter((day, index) => index === idx)[0];
		// const workDaysArray = [...weekWorkDays];
		// const dayToUpdate = workDaysArray.filter((day, indx) => indx === idx);
		// if (day) {
		// 	dayToUpdate[0] = { ...day, active: e.currentTarget.checked };
		// 	workDaysArray[idx] = dayToUpdate[0];
		// }
		// console.log(workDaysArray);
		// setData((prev) => {
		// 	return { ...prev, weekWorkDays: workDaysArray };
		// });
	};
	return (
		<FromWrapper title="Work Week Setup">
			<div className="flex flex-col w-full">
				{weekWorkDays &&
					weekWorkDays.map((day, idx) => {
						return (
							<div className="flex items-center w-full ml-10" key={day.day}>
								{loading ? (
									<Skeleton className="px-5 mt-3 rounded-full h-7 w-fit">
										<h1 className="opacity-0">{day.day}</h1>
									</Skeleton>
								) : (
									<div className="flex items-center w-full">
										{/* <FormControlLabel
											control={
												<Checkbox
													checked={day.active}
													name={day.day.toUpperCase()}
													value={idx}
													onChange={handleWeekChange}
												/>
											}
											label={day.day.toUpperCase()}
										/> */}
										<Checkbox
											checked={day.active}
											onCheckedChange={handleWeekChange}
										/>
									</div>
								)}
							</div>
						);
					})}
			</div>
			<Button
				type="button"
				className="w-1/2"
				onClick={() => {
					handleSaveWeekWorkDays(weekWorkDays);
				}}
			>
				Apply
			</Button>
		</FromWrapper>
	);
}

export default SettingsWeekStep;
