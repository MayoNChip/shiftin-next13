"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma, Schedule, ShiftToSchedule } from "@prisma/client";

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

export const getScheduleById = async (scheduleId: string, userId?: string) => {
  "use server";
  try {
    return await prisma.schedule.findUnique({
      where: { id: scheduleId, userId },
      include: {
        shift: {
          include: {
            shift: {
              include: { employees: true, shiftType: true, workDay: true },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export type ScheduleType = Prisma.UserGetPayload<{
  select: {
    Schedule: {
      include: {
        shift: {
          include: {
            shift: {
              include: {
                employees: {
                  include: {
                    employee: true;
                  };
                };
                shiftType: true;
                workDay: true;
              };
            };
          };
        };
      };
    };
  };
}>["Schedule"][0];

export const getScheduleShifts = async (
  scheduleId: string,
  userId?: string
) => {
  "use server";
  try {
    return await prisma.shift.findMany({
      where: {
        shiftToSchedule: { some: { scheduleId } },
        shiftsToUser: { some: { userId } },
      },
      include: { employees: { include: { employee: true } } },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export type ScheduleShifts =
  | Prisma.UserGetPayload<{
      select: {
        shifts: {
          include: {
            shift: { include: { employees: { include: { employee: true } } } };
          };
        };
      };
    }>["shifts"][0]["shift"][]
  | null
  | undefined;

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
    schedule.map(async (shift) => {
      await prisma.shift.create({
        data: {
          shiftTypeId: shift.shiftTypeId,
          workDayId: shift.workDayId,
          employees: {
            create: { employee: { connect: { id: shift.employeeId } } },
          },
          shiftsToUser: {
            connectOrCreate: { where: { id: userId }, create: { userId } },
          },
          shiftToSchedule: {
            connectOrCreate: {
              where: { id: scheduleId },
              create: { scheduleId },
            },
          },
        },
      });
    });
    revalidatePath("/schedule/[...scheduleId]", "page");
  } catch (error) {
    console.log("updating schedule error =>", error);
  }
};
