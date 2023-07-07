import AddEmployee from "@/components/AddEmployee";
import prisma from "@/utils/PrismaClient";
import { revalidatePath } from "next/cache";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function team() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.configured) {
    redirect("/signin?callbackUrl=/team");
    // <div className="flex items-center justify-center w-full min-h-screen">
    // 	<h1 className="text-3xl text-bold">Please sign in to access this page</h1>
    // </div>;
  }

  const employeeList = await prisma.employee.findMany();

  const createEmployee = async (employee: {
    firstName: string;
    lastName: string;
    roleId: number;
  }) => {
    "use server";
    console.log("employee to add", employee);
    await prisma.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        roleId: employee.roleId,
      },
    });

    revalidatePath("/team");
  };

  return (
    <div className="flex flex-col w-full py-20">
      {/* <EmployeeList employees={employeeList} /> */}
      <DataTable columns={columns} data={employeeList} title="Employee List" />
      <AddEmployee createEmployee={createEmployee} />
    </div>
  );
}
