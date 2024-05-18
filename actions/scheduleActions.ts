"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Schedule, ShiftToSchedule } from "@prisma/client";

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

    const numberOfDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    for (let i = 0; i < numberOfDays; i++) {
      await prisma.shift.create({
        data: {
          shiftToSchedule: {
            connect: {
              id: res.id,
            },
          },
        },
      });
    }

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
    return await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { shift: true },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const updateSchedule = async ({
  schedule,
  scheduleId,
}: {
  schedule: { shiftTypeId: string; workDayId: string; employeeId: string }[];
  scheduleId: string;
}) => {
  "use server";
  try {
    const shifts = await prisma.shift.findMany({
      where: {
        shiftToSchedule: {
          every: {
            scheduleId: scheduleId,
          },
        },
      },
    });
    schedule.forEach(async (shift) => {
      await prisma.shift.create({
        data: {
          shiftToSchedule: {
            connect: {
              id: scheduleId,
            },
          },

          employees: {
            connect: {
              id: shift.employeeId,
            },
          },
        },
      });
    });

    const shiftsToSchedule = schedule.map((shift) => {
      return {
        scheduleId: scheduleId,
        shiftId: shift.shiftTypeId,
      };
    });

    await prisma.shiftToSchedule.createMany({
      data: shiftsToSchedule,
    });
  } catch (error) {
    console.log("updating schedule error =>", error);
  }
};
