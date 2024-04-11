"use server";

import { prisma } from "@/lib/prisma";

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

export const createNewSchedule = async ({ userId }: { userId?: string }) => {
  if (!userId) {
    throw new Error("Please login first");
  }
  try {
    return await prisma.schedule.create({ data: { userId } });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
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
