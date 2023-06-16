import { Employee } from "@prisma/client";
import React from "react";

export default function EmployeeList({ employees }: { employees: Employee[] }) {
	return (
		<div className="flex flex-col self-center w-1/2 h-full p-4 mt-20 bg-gray-200 gap-y-6">
			{employees?.map((employee) => (
				<div key={employee.id}>
					<h2>{employee.id}</h2>
					<h2>{employee.firstName}</h2>
					<h2>{employee.lastName}</h2>
				</div>
			))}
		</div>
	);
}
