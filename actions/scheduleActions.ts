"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// export const addUserToShift = async (userId?: string, shiftId?: string) => {
// 	"use server";
// 	const res = await prisma.shift.create({
// 		data: {
// 			workDayId: 1,
// 			shiftTypeId: 1,
// 			shiftsToUser: {
// 				create: {
// 					userId
// 				}
// 			}
// 			employees: {
// 				create: {
// 					employeeId: "clt2o6nyp000ci5cgnqkffhrm",
// 				},
// 			},
// 		},
// 	});
// 	if (!res) {
// 		return false;
// 	}
// 	return res;
// };

export const createNewSchedule = async ({
  userId,
  startDate,
  endDate,
}: {
  userId?: string;
  startDate: Date;
  endDate: Date;
}) => {
  if (!userId) {
    throw new Error("Please login first");
  }
  try {
    const res = await prisma.schedule.create({
      data: { userId, startDate, endDate },
    });
    revalidatePath("/schedule");
    return { success: true, data: res.id };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }
};

export const getScheduleById = async (scheduleId: string) => {
  "use server";
  try {
    return await prisma.schedule.findUnique({ where: { id: scheduleId } });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
