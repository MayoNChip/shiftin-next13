import { ShiftType, WorkDay } from "@prisma/client";
import prisma from "@/utils/PrismaClient";
import { revalidatePath } from "next/cache";
import SettingsFrom from "./SettingsForm";
import { ShiftTypeInterface } from "@/commonTypes";

// type WeekFormType = typeof weekFormData | null;
type WeekFormType = {
	monthWeek: { week: number; month: string };
	weekWorkDays: Partial<WorkDay>[];
};

export default async function index() {
	const workDays = await prisma.workDay.findMany();
	const shiftsTypes = await prisma.shiftType.findMany();

	const handleAddShiftType = async (shiftType: ShiftTypeInterface) => {
		"use server";

		const res = await prisma.shiftType.create({
			data: {
				...shiftType,
			},
		});
		console.log("res", res);
		revalidatePath("/settings");
	};

	// const workDays = trpc.scheduleRouter.getWorkingDays.useQuery();
	// const [weekDays, setWeekDays] = useState<WorkDay[]>(
	// 	weekFormData.weekWorkDays
	// );

	// const shiftsTypes = trpc.scheduleRouter.getAllShiftTypes.useQuery();
	// const addShiftType = trpc.scheduleRouter.createShiftType.useMutation();
	// const scheduleMutation = trpc.scheduleRouter.initialSchdule.useMutation();

	if (!workDays) {
		return <>Not good</>;
	}

	// const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	if (!weekDays) {
	// 		return;
	// 	}
	// 	const idx = parseInt(e.currentTarget.value);
	// 	const day = weekDays.filter((day, index) => index === idx)[0];
	// 	const workDaysArray = [...weekDays];
	// 	const dayToUpdate = workDaysArray.filter((day, indx) => indx === idx);
	// 	if (day) {
	// 		dayToUpdate[0] = { ...day, active: e.currentTarget.checked };
	// 		workDaysArray[idx] = dayToUpdate[0];
	// 	}
	// 	console.log(workDaysArray);
	// 	setWeekDays([...workDaysArray]);
	// };

	// const handleCreateSchedule = () => {
	// 	if (weekDays.length < 0) {
	// 		return;
	// 	}
	// 	// console.log("Create", { weekDays });
	// 	const result = scheduleMutation.mutate(weekDays);
	// 	// console.log(result);
	// };

	return (
		<div className="flex flex-col items-center w-full m-auto mt-6 rounded-md">
			<SettingsFrom
				shiftsTypes={shiftsTypes}
				handleAddShiftType={handleAddShiftType}
			/>
			{/* <Button onClick={handleCreateSchedule}>Set Working Days</Button> */}
		</div>
	);
}
