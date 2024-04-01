import React from "react";
import { DataTable } from "../data-table";
import AddEmployee from "@/components/AddEmployee";
import { TeamColumns } from "../columns";
import { prisma } from "@/lib/prisma";
import { ShiftType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ShiftTypeT } from "@/app/settings/SettingsShiftsStep";
import { setUserConfigured } from "@/actions/settingsActions";
import { redirect } from "next/navigation";

async function TeamList({ ShiftTypes }: { ShiftTypes: ShiftTypeT[] }) {
  const session = await getServerSession(authOptions);

  // if (!session || !session?.user?.id) {
  //   redirect("/signin?callbackUrl=/team");
  // }

  const employeeList = await prisma.employee.findMany({
    where: { userId: session?.user?.id },
    include: {
      shiftTypeToEmployee: true,
    },
  });

  console.log("employeeList", employeeList);
  return (
    <div className="flex flex-col w-full py-20">
      {/* <EmployeeList employees={employeeList} /> */}
      <DataTable
        columns={TeamColumns}
        data={employeeList}
        title="Employee List"
      />
      <AddEmployee shiftTypes={ShiftTypes} />
    </div>
  );
}

export default TeamList;
