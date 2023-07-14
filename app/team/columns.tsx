"use client";

import { Employee, ShiftType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Employee = {
//   id: string;
//   firstName: string;
//   //   status: "pending" | "processing" | "success" | "failed";
//   lastName: string;
//   role: "waiter" | "manager" | "bar"
// };

export const TeamColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "canWorkShiftTypes",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

export const ShiftTypesColumns: ColumnDef<ShiftType[]>[] = [
  {
    accessorKey: "shiftType",
    header: "Shift Name",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
];
