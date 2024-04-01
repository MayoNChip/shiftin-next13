"use server";

import { prisma } from "@/lib/prisma";
import { ShiftType, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createEmployee = async (employee: {
  firstName: string;
  lastName: string;
  roles: ShiftType["shiftType"][];
  userId: string;
}) => {
  "use server";
  console.log("employee to add", employee);
  // if (!employee.user) {
  // 	return { success: false, error: "Please login" };
  // }
  const res = await prisma.employee.create({
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      shiftTypeToEmployee: {
        create: employee.roles.map((role) => ({ shiftType: role })),
      },
      user: {
        connect: { id: employee.userId },
      },
    },
  });

  if (!res) {
    throw new Error("Failed to create employee");
  }

  revalidatePath("/team");
};
