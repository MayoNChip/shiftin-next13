import AddEmployee from "@/components/AddEmployee";
import { revalidatePath } from "next/cache";
import { DataTable } from "./data-table";
import { TeamColumns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShiftType } from "@prisma/client";

export default async function team() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.configured) {
		redirect("/signin?callbackUrl=/team");
		// <div className="flex items-center justify-center w-full min-h-screen">
		// 	<h1 className="text-3xl text-bold">Please sign in to access this page</h1>
		// </div>;
	}

	const employeeList = await prisma.employee.findMany({
		include: {
			shiftTypeToEmployee: true,
		},
	});
	const ShiftTypes = await prisma.shiftType.findMany();

	const createEmployee = async (employee: {
		firstName: string;
		lastName: string;
		roles: ShiftType["shiftType"][];
	}) => {
		"use server";
		console.log("employee to add", employee);
		await prisma.employee.create({
			data: {
				firstName: employee.firstName,
				lastName: employee.lastName,
				shiftTypeToEmployee: {
					createMany: {
						data: [{ shiftName: employee.roles[0] }],
					},
				},
			},
		});

		revalidatePath("/team");
	};

	return (
		<div className="flex flex-col w-full py-20">
			{/* <EmployeeList employees={employeeList} /> */}
			<DataTable
				columns={TeamColumns}
				data={employeeList}
				title="Employee List"
			/>
			<AddEmployee createEmployee={createEmployee} shiftTypes={ShiftTypes} />
		</div>
	);
}
