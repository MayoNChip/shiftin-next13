import { prisma } from "@/lib/prisma";

export const getEmployeeList = async () => {
  return await prisma.employee.findMany({
    include: {
      shiftTypeToEmployee: true,
    },
  });
};

export const getShiftTypes = async () => {
  return await prisma.shiftType.findMany();
};
