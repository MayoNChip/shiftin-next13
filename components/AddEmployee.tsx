"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { Employee } from "@prisma/client";
import { useSession } from "next-auth/react";

function AddEmployee({
	createEmployee,
}: {
	createEmployee: (employee: {
		firstName: string;
		lastName: string;
		roleId: number;
	}) => void;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: session } = useSession();
	console.log(session);
	return (
		<div className="self-center">
			<button
				className="flex items-center self-center px-4 py-2 my-6 bg-purple-300 rounded w-fit"
				onClick={() => {
					setIsModalOpen(true);
					// 	//   employeeMutation.mutate({ firstName: "Ido", lastName: "Cohen" });
				}}
			>
				Add Employee
			</button>
			<Modal
				isOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				createEmployee={createEmployee}
			/>
		</div>
	);
}

export default AddEmployee;
