"use client";

import { Prisma, ShiftType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ShiftTypeNoId } from "../settings/page";
import { ShiftTypeT } from "../settings/SettingsShiftsStep";

type EmployeeWithShiftTypes = Prisma.EmployeeGetPayload<{
  include: { shiftTypeToEmployee: true };
}>;

export const TeamColumns: ColumnDef<EmployeeWithShiftTypes>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "shiftTypeToEmployee",
    header: "Role",
    cell: ({ row }) => {
      const roww = row.original.shiftTypeToEmployee.map((shiftType) => {
        return row.original.shiftTypeToEmployee.length !==
          row.original.shiftTypeToEmployee.length - 1
          ? `${shiftType.shiftType}, `
          : `${shiftType.shiftType}.`;
      });
      //   console.log(roww);
      return roww;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

export const ShiftTypesColumns: ColumnDef<ShiftTypeT>[] = [
  {
    accessorKey: "shiftType.shiftType",
    header: "Shift Name",
  },
  {
    accessorKey: "shiftType.startTime",
    header: "Start Time",
  },
  {
    accessorKey: "shiftType.endTime",
    header: "End Time",
  },
];
