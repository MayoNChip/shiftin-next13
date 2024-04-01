import * as React from "react";
import { DateTime } from "luxon";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { InitialFormDataType, ShiftTypeInterface } from "@/commonTypes";

interface DateTimePickerProps {
	date: Date;
	setDate: (date: Date) => void;
	//   shiftType: InitialFormDataType["shifts"][0];
	//   setShiftType: (shiftType: ShiftTypeInterface) => void;
}

export function DateTimePicker({
	date,
	setDate,
}: //   setShiftType,
//   shiftType,
DateTimePickerProps) {
	const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
		DateTime.fromJSDate(date)
	);

	const handleSelect: SelectSingleEventHandler = (day, selected) => {
		const selectedDay = DateTime.fromJSDate(selected);
		const modifiedDay = selectedDay.set({
			hour: selectedDateTime.hour,
			minute: selectedDateTime.minute,
		});

		setSelectedDateTime(modifiedDay);
		setDate(modifiedDay.toJSDate());
	};

	const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { value } = e.target;
		const hours = Number.parseInt(value.split(":")[0] || "00", 10);
		const minutes = Number.parseInt(value.split(":")[1] || "00", 10);
		const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });
		setSelectedDateTime(modifiedDay);
		setDate(modifiedDay.toJSDate());
		// const newShift = { ...shiftType, startTime: modifiedDay.toJSDate() };
		// setShiftType(newShift);
	};

	const footer = (
		<>
			<div className="px-4 pt-0 pb-4">
				<Label>Time</Label>
				<Input
					type="time"
					onChange={handleTimeChange}
					value={selectedDateTime.toFormat("HH:mm")}
				/>
			</div>
			{!selectedDateTime && <p>Please pick a day.</p>}
		</>
	);

	return (
		<Popover>
			<PopoverTrigger asChild className="z-10">
				<Button
					variant="outline"
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="w-4 h-4 mr-2" />
					{date ? (
						selectedDateTime.toFormat("DDD HH:mm")
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={selectedDateTime.toJSDate()}
					onSelect={handleSelect}
					initialFocus
				/>
				{footer}
			</PopoverContent>
		</Popover>
	);
}
