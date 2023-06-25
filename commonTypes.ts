export interface INITIAL_FORM_DATA {
	weekWorkDays: [
		{
			id: 1;
			day: "sunday";
			active: false;
		},
		{
			id: 2;
			day: "monday";
			active: false;
		},
		{
			id: 3;
			day: "tuesday";
			active: false;
		},
		{
			id: 4;
			day: "wednesday";
			active: false;
		},
		{
			id: 5;
			day: "thursday";
			active: false;
		},
		{
			id: 6;
			day: "friday";
			active: false;
		},
		{
			id: 7;
			day: "saturday";
			active: false;
		}
	];
	shifts: ShiftTypeInterface[];
}

export interface ShiftTypeInterface {
	shiftType: string;
	startTime: Date;
	endTime: Date;
}
