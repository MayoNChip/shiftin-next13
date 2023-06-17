import { supabase } from "@/lib/supabaseClient";
import EmployeeList from "../../components/EmployeeList";
import Modal from "../../components/Modal";
import { createClient } from "@supabase/supabase-js";
import { Employee, PrismaClient } from "@prisma/client";
import AddEmployee from "@/components/AddEmployee";
import prisma from "@/utils/PrismaClient";
import { revalidatePath } from "next/cache";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function team() {
  //   const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const { data } = await supabase.from("Employee").select();
  // console.log(data);
  // const prisma = new PrismaClient();
  const employeeList = await prisma.employee.findMany();

  const createEmployee = async (employee: {
    firstName: string;
    lastName: string;
    roleId: number;
  }) => {
    "use server";

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
    <div className="flex flex-col w-full">
      <AddEmployee createEmployee={createEmployee} />
      <EmployeeList employees={employeeList} />
      <DataTable columns={columns} data={employeeList} />
    </div>
  );
}
