"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { InitialFormDataType, ShiftTypeInterface } from "@/commonTypes";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "./DateTimePicker";
import { DataTable } from "../team/data-table";
import { ShiftTypesColumns } from "../team/columns";
import { addShiftType } from "@/actions/settingsActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Shift,
  ShiftType,
  UserToWorkDay,
  WorkDay,
  shiftTypeToUser,
  shiftsToUser,
} from "@prisma/client";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";

export type ShiftTypeT = { shiftType: ShiftType } & shiftTypeToUser;

export const AddShiftFormSchema = z.object({
  shiftType: z.string().min(1),
  startTime: z.date(),
  endTime: z.date(),
  userId: z.string(),
});

function SettingsShiftsStep({ shiftTypes }: { shiftTypes: ShiftTypeT[] }) {
  const { data: session, status } = useSession();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  //   const [shiftType, setShiftType] = useState<
  //     ShiftTypeInterface & { userId: string }
  //   >({
  //     shiftType: "",
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     userId: "",
  //   });

  useEffect(() => {
    if (!session?.user) return;
    form.setValue("userId", session?.user?.id);
  }, [shiftTypes]);

  const form = useForm<z.infer<typeof AddShiftFormSchema>>({
    resolver: zodResolver(AddShiftFormSchema),
    defaultValues: {
      shiftType: "",
      startTime: new Date(),
      //   startTime: "",
      endTime: new Date(),
      userId: undefined,
    },
  });

  useMemo(() => {
    form.setValue("startTime", startDate);
    form.setValue("endTime", endDate);
  }, [startDate, endDate]);

  const handleAddShift = async (values: z.infer<typeof AddShiftFormSchema>) => {
    if (!session?.user?.id) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "Please login first",
      });
    }
    form.setValue("userId", session?.user?.id);

    const res = await addShiftType(values);
    toast({
      variant: !res.success ? "destructive" : "default",

      title: !res.success ? "Error" : "Success",
      description: !res.success ? res.error : "Shift added successfully",
    });
    form.reset();
  };

  console.log("shift type settings", shiftTypes.length);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddShift)}
        className="flex flex-col items-center py-10 w-fit"
      >
        <h1 className="self-start py-4 text-6xl font-extralight">
          Your shift types
        </h1>
        {!shiftTypes ||
          (shiftTypes.length === 0 && (
            <h1 className="self-start py-6 text-xl font-extralight text-primary">
              Time to add your first shift type.
              <br /> Give it a name, a start time and an end time.
            </h1>
          ))}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="shiftType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter shift name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <label>Shift start time</label>
            <DateTimePicker date={startDate} setDate={setStartDate} />
            <label>Shift end time</label>
            <DateTimePicker date={endDate} setDate={setEndDate} />
          </div>
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className="self-center m-10 w-fit"
          >
            {!form.formState.isSubmitting ? "Add Shift" : <Loader />}
          </Button>
        </div>

        <DataTable
          columns={ShiftTypesColumns}
          data={shiftTypes}
          title="Shift Types"
        />
        <Button
          disabled={shiftTypes.length === 0}
          className="self-end m-10 w-fit"
          type="button"
        >
          {!form.formState.isSubmitting ? (
            <Link href="/settings/team">Next</Link>
          ) : (
            <Loader />
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SettingsShiftsStep;
