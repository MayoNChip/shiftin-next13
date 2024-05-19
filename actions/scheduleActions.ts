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

    const workDays = await prisma.userToWorkDay.findMany({
      where: {
        userId,
      },
    });

    const shiftTypes = await prisma.shiftTypeToUser.findMany({
      where: {
        userId,
      },
    });
    // console.log("creating shifts after creating schedule", res.id);
    // for (const workDay of workDays) {
    //   for (const shiftType of shiftTypes) {
    //     await prisma.shift.create({
    //       data: {
    //         shiftToSchedule: {
    //           connect: {
    //             id: res.id,
    //           },
    //         },
    //         shiftTypeId: shiftType.id,
    //         workDayId: workDay.id,
    //       },
    //     });
    //   }
    // }

    for (const shift of shiftTypes) {
      for (const workDay of workDays) {
        await prisma.shift.create({
          data: {
            shiftToSchedule: {
              create: {
                scheduleId: res.id,
              },
            },
            shiftTypeId: shift.id,
            workDayId: workDay.id,
          },
        });
      }
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
  userId,
}: {
  schedule: { shiftTypeId: string; workDayId: string; employeeId: string }[];
  scheduleId: string;
  userId: string;
}) => {
  "use server";
  try {
    schedule.forEach(async (shift) => {
      await prisma.shift.update({
        where: {
          id: shift.shiftTypeId,
          AND: {
            workDayId: shift.workDayId,
          },
        },
        data: {
          employees: {
            create: {
              employee: {
                connect: {
                  id: shift.employeeId,
                },
              },
            },
          },
        },
      });
    });

    // const shiftsToSchedule = schedule.map((shift) => {
    //   return {
    //     scheduleId: scheduleId,
    //     shiftId: shift.shiftTypeId,
    //   };
    // });

    // await prisma.shiftToSchedule.({
    //   data: shiftsToSchedule,
    // });
  } catch (error) {
    console.log("updating schedule error =>", error);
  }
};
