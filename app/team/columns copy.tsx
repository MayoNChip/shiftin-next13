"use client";

import { Prisma, ShiftType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
