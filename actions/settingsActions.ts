"use server";

import { AddShiftFormSchema } from "@/app/settings/SettingsShiftsStep";
import { ShiftTypeInterface } from "@/commonTypes";
import { prisma } from "@/lib/prisma";
import { ShiftType, UserToWorkDay, WorkDay } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const handleAddShiftType = async (
  shiftType: ShiftTypeInterface & { userId?: string }
) => {
  "use server";
  console.log(shiftType);
  if (!shiftType.shiftType) return;
  const noId = delete shiftType?.userId;
  const res = await prisma.shiftType.create({
    data: {
      ...shiftType,
    },
  });
  console.log("res", res);
  revalidatePath("/settings");
};

export const handleSaveWeekWorkDays = async (
  data: { workDayId: number; active: boolean }[],
  userId?: string
) => {
  "use server";
  try {
    // console.log("new work days", data);

    if (!userId) return { success: false, error: "Please Login" };

    const currentWeek = await prisma.userToWorkDay.findMany({
      where: {
        userId,
      },
    });

    // console.log("current week", currentWeek);

    if (currentWeek.length > 0) {
      const deletedWeek = await prisma.userToWorkDay.deleteMany({
        where: {
          userId,
        },
      });
      console.log("deleted week", deletedWeek);
    }

    // const res = await prisma.userToWorkDay.createMany({
    // 	data: data.map((day) => {
    // 		return {
    // 			userId,
    // 			workDayId: day.id,
    // 			active: true,
    // 		};
    // 	}),
    // });

    const formatedData = data.map((day) => {
      return { ...day, userId };
    });

    // console.log("formated Data ", formatedData);

    const res = await prisma.userToWorkDay.createMany({
      data: formatedData,
    });

    // console.log("res", res);

    revalidatePath("/settings/workDays");

    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const getShiftTypes = async ({
  id,
}: {
  id?: string;
}): Promise<
  { success: true; data: ShiftType[] } | { success: false; error: string }
> => {
  "use server";
  try {
    const shiftTypes = await prisma.shiftType.findMany({});
    return { success: true, data: shiftTypes };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const getWorkDays = async ({
  userId,
}: {
  userId?: string;
}): Promise<
  { success: true; data: WorkDay[] } | { success: false; error: string }
> => {
  "use server";
  try {
    const allWorkDays = await prisma.workDay.findMany({});
    return { success: true, data: allWorkDays };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const addShiftType = async (
  data: z.infer<typeof AddShiftFormSchema>
) => {
  "use server";
  try {
    const shiftSchema = z.object({
      shiftType: z
        .string()
        .min(2, { message: "name must be at least 2 characters." }),
      startTime: z.date(),
      endTime: z.date(),
      userId: z.string(),
    });
    const { shiftType, endTime, startTime, userId } = shiftSchema.parse(data);
    console.log("userID from add shiftType", userId);
    const res = await prisma.shiftType.create({
      data: {
        startTime,
        endTime,
        shiftType,
        shiftTypeToUser: { create: { userId } },
      },
    });
    revalidatePath("/settings");
    return { success: true, data: res };
  } catch (error) {
    console.log("adding shift type error", error);
    return { success: false, error: (error as Error).message };
  }
};

export const setUserConfigured = async (userId?: string) => {
  if (!userId) return;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        configured: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
};

export const getUserSettings = async (userId?: string) => {
  if (!userId) return;
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      shifts: true,
      Employee: { include: { shiftTypeToEmployee: true } },
      userToWorkDay: { include: { workDay: true } },
      shiftTypes: { include: { shiftType: true } },
    },
  });
};

export const getEmployees = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { Employee: true },
  });
};
