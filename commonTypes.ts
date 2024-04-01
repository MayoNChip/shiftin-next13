export interface InitialFormDataType {
	weekWorkDays: {
		id: number;
		day: string;
		// active: boolean;
	}[];
	shifts: ShiftTypeInterface[];
}

export interface ShiftTypeInterface {
	shiftType: string;
	startTime: Date;
	endTime: Date;
}

export interface SignUpUser {
	email: string;
	password: string;
	name: string;
	image?: string;
}
