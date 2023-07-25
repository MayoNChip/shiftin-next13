import AddEmployee from "@/components/AddEmployee";
import { revalidatePath } from "next/cache";
import { DataTable } from "./data-table";
import { TeamColumns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShiftType } from "@prisma/client";
import { Router } from "next/router";
import nProgress from "nprogress";
import { getEmployeeList, getShiftTypes } from "@/services/employeeService";
// import { useEffect } from "react";

export default async function team() {
  const session = await getServerSession(authOptions);

  // if (!session?.user?.configured) {
  // 	redirect("/signin?callbackUrl=/team");
  // 	// <div className="flex items-center justify-center w-full min-h-screen">
  // 	// 	<h1 className="text-3xl text-bold">Please sign in to access this page</h1>
  // 	// </div>;
  // }

  //   useRouter.events.on("routeChangeStart", (url) => {
  //     nProgress.start();
  //   });

  //   Router.events.on("routeChangeComplete", (url) => {
  //     nProgress.done(false);
  //   });

  const employeeList = await getEmployeeList();
  const ShiftTypes = await getShiftTypes();

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
          create: employee.roles.map((role) => ({ shiftName: role })),
        },
      },
    });

    // employee.roles.map((role) => {
    // 	await prisma.
    // })

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
