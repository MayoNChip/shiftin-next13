"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, ReactNode } from "react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { ShiftType } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { createEmployee } from "@/actions/teamActions";
// import { addUserToShift } from "@/actions/scheduleActions";
import { useSession } from "next-auth/react";
import { ShiftTypeT } from "@/app/settings/SettingsShiftsStep";

interface Props {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shiftTypes: ShiftTypeT[];
}

interface newUserType {
  firstName: string;
  lastName: string;
  roles: ShiftType["shiftType"][];
}

// interface CreateEmployee

function AddEmployeeModal({ isOpen, setIsModalOpen, shiftTypes }: Props) {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  console.log("shift types", shiftTypes);
  const { data: session } = useSession();

  // const [newUserDetails, setNewUserDetails] = React.useState<newUserType>({
  // 	firstName: "",
  // 	lastName: "",
  // 	canWorkShiftTypes: 1,
  // });

  if (!session || !session.user) {
    return (
      <div>
        <h1>Please login</h1>
      </div>
    );
  }

  console.log(session);

  const FormSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    roles: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      roles: [],
    },
  });

  // const handleCreateEmployee = (
  // 	e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  // 	if (
  // 		!newUserDetails.canWorkShiftTypes ||
  // 		!newUserDetails.firstName ||
  // 		!newUserDetails.lastName
  // 	)
  // 		return;

  // 	createEmployee({ ...newUserDetails });
  // 	setIsModalOpen(false);
  // };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    if (!session?.user) {
      return toast({
        title: "Error",
        description: "Please login first",
      });
    }
    try {
      await createEmployee({ ...data, userId: session?.user?.id });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  // const handleFirstNameChange = (
  // 	e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  // 	console.log(e.target.value);
  // 	setNewUserDetails({ ...newUserDetails, firstName: e.target.value });
  // };
  // const handleLastNameChange = (
  // 	e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  // 	console.log(e.target.value);
  // 	setNewUserDetails({ ...newUserDetails, lastName: e.target.value });
  // };

  // const handleRoleChange = (e: FormEvent<HTMLButtonElement>) => {
  // 	// console.log(e.target.);
  // 	setNewUserDetails({
  // 		...newUserDetails,
  // 		canWorkShiftTypes: 1,
  // 	});
  // };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-teal-700 text-opacity-50">
              Add Employees
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      {/* <FormDescription>
													This is your public display name.
												</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      {/* <FormDescription>
													This is your public display name.
												</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Roles</FormLabel>
                    <FormDescription>
                      Select the roles this employee can fulfill.
                    </FormDescription>
                  </div>
                  {shiftTypes?.map((shift) => (
                    <FormField
                      control={form.control}
                      key={shift.id}
                      name="roles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={shift.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(
                                  shift.shiftType.shiftType
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        shift.shiftType.shiftType,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) =>
                                            value !== shift.shiftType.shiftType
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {shift.shiftType.shiftType}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    ></FormField>
                  ))}
                  ;
                </FormItem>
                <DialogFooter>
                  <div className="flex items-center justify-end w-full gap-4 ">
                    <Button type="button" onClick={handleClose}>
                      Cancel
                    </Button>
                    {/* <Button onClick={() => addUserToShift()}>
                      Add to shift
                    </Button> */}
                    <Button type="submit">Create</Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddEmployeeModal;

// ("use client");

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";

// const items = [
// 	{
// 		id: "recents",
// 		label: "Recents",
// 	},
// 	{
// 		id: "home",
// 		label: "Home",
// 	},
// 	{
// 		id: "applications",
// 		label: "Applications",
// 	},
// 	{
// 		id: "desktop",
// 		label: "Desktop",
// 	},
// 	{
// 		id: "downloads",
// 		label: "Downloads",
// 	},
// 	{
// 		id: "documents",
// 		label: "Documents",
// 	},
// ] as const;

// export function CheckboxReactHookFormMultiple() {
// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
// 				<FormField
// 					control={form.control}
// 					name="items"
// 					render={() => (
// 						<FormItem>
// 							<div className="mb-4">
// 								<FormLabel className="text-base">Sidebar</FormLabel>
// 								<FormDescription>
// 									Select the items you want to display in the sidebar.
// 								</FormDescription>
// 							</div>
// 							{items.map((item) => (
// 								<FormField
// 									key={item.id}
// 									control={form.control}
// 									name="items"
// 									render={({ field }) => {
// 										return (
// 											<FormItem
// 												key={item.id}
// 												className="flex flex-row items-start space-x-3 space-y-0"
// 											>
// 												<FormControl>
// 													<Checkbox
// 														checked={field.value?.includes(item.id)}
// 														onCheckedChange={(checked) => {
// 															return checked
// 																? field.onChange([...field.value, item.id])
// 																: field.onChange(
// 																		field.value?.filter(
// 																			(value) => value !== item.id
// 																		)
// 																  );
// 														}}
// 													/>
// 												</FormControl>
// 												<FormLabel className="text-sm font-normal">
// 													{item.label}
// 												</FormLabel>
// 											</FormItem>
// 										);
// 									}}
// 								/>
// 							))}
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<Button type="submit">Submit</Button>
// 			</form>
// 		</Form>
// 	);
// }
