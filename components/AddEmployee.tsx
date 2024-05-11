"use client";
import React, { useState } from "react";
import Modal from "./AddEmployeeModal";
import { Employee, ShiftType } from "@prisma/client";
import { useSession } from "next-auth/react";
import AddEmployeeModal from "./AddEmployeeModal";
import { Button } from "./ui/button";
import { ShiftTypeT } from "@/app/settings/SettingsShiftsStep";

function AddEmployee({ shiftTypes }: { shiftTypes: ShiftTypeT[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="self-center">
      <Button
        className="flex items-center self-center px-4 py-2 my-6 w-fit"
        onClick={() => {
          setIsModalOpen(true);
          // 	//   employeeMutation.mutate({ firstName: "Ido", lastName: "Cohen" });
        }}
      >
        Add Employee
      </Button>
      <AddEmployeeModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        shiftTypes={shiftTypes}
      />
    </div>
  );
}

export default AddEmployee;
