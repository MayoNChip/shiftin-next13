import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ShiftType, WorkDay } from "@prisma/client";
import prisma from "@/utils/PrismaClient";
import ShiftTypes from "@/components/ShiftTypes";
import { revalidatePath } from "next/cache";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import SettingsFrom from "./SettingsFrom";

const weekFormData = {
  monthWeek: { week: 0, month: "january" },
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
};

// type WeekFormType = typeof weekFormData | null;
type WeekFormType = {
  monthWeek: { week: number; month: string };
  weekWorkDays: Partial<WorkDay>[];
};

export default async function index() {
  const workDays = await prisma.workDay.findMany();
  const shiftsTypes = await prisma.shiftType.findMany();

  const handleAddShiftType = async (shiftType: ShiftType) => {
    "use server";

    await prisma.shiftType.create({
      data: {
        ...shiftType,
      },
    });
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
    <div className="m-auto mt-6 w-[800px] rounded-md bg-gray-200">
      <div className=" flex w-[50%] flex-col  pt-4">
        <h1 className="px-4 text-xl font-semibold ">Define days of work</h1>
        {/* {weekDays.map((day, idx) => {
					return (
						<div
							className="flex flex-col items-center w-full ml-10"
							key={day.day}
						>
							<div>{idx}</div>
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
				})} */}
        <ShiftTypes
          shiftsTypes={shiftsTypes}
          handleAddShiftType={handleAddShiftType}
        />

        {/* <Button onClick={handleCreateSchedule}>Set Working Days</Button> */}
      </div>
      <SettingsFrom />
    </div>
  );
}
