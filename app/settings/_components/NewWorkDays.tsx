"use client";

import { handleSaveWeekWorkDays } from "@/actions/settingsActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserToWorkDay, WorkDay } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// type WorkDayType = UserToWorkDay & { workDay: WorkDay };
type WorkDayType = UserToWorkDay & WorkDay;

function WorkDays({ workDays }: { workDays: WorkDayType[] }) {
  const { data: session } = useSession();

  const [userWorkDays, setUserWorkDays] = useState<number[]>([]);

  //   const convertIdToString = (workDayId: number) =>
  //   defaultWorkDays.filter((day) => day.id === workDayId)[0].day;

  if (!session || !session.user) {
    redirect("http://localhost:3000/signin?callbackUrl=settings/workdays");
  }

  useEffect(() => {
    const format = workDays.filter((day) => day.active);
    console.log(format);
    // setUserWorkDays();
  }, []);

  const defaultWorkDays = [
    { id: 1, day: "sunday" },
    { id: 2, day: "monday" },
    { id: 3, day: "tuesday" },
    { id: 4, day: "wednesday" },
    { id: 5, day: "thursday" },
    { id: 6, day: "friday" },
    { id: 7, day: "saturday" },
  ];

  const FormSchema = z.object({
    workDays: z
      //   .object({
      //     id: z.number(),
      //     active: z.boolean(),
      //   })
      .array(z.number())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workDays: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    let workDaysToSubmit = [
      { workDayId: 1, active: false },
      { workDayId: 2, active: false },
      { workDayId: 3, active: false },
      { workDayId: 4, active: false },
      { workDayId: 5, active: false },
      { workDayId: 6, active: false },
      { workDayId: 7, active: false },
    ];

    const reformat = values.workDays.map((day) => {
      const res = workDaysToSubmit.map((workDay, index) => {
        if (day === workDay.workDayId) {
          workDaysToSubmit[index] = { workDayId: day, active: true };
        }
      });
      console.log("formated", workDaysToSubmit);
    });
    // const reformat = values.workDays.map((day) => {
    //   return workDaysToSubmit.map((value) => {
    //     if (value.id === day) {
    //       return {
    //         workDayId: day.id,
    //         active: true,
    //       };
    //     } else {
    //       return {
    //         workDayId: day.id,
    //         active: false,
    //       };
    //     }
    //   });
    // });
    // console.log("values after format", reformat);
    // const newWorkDays = workDays.map((day) => {
    //   //   const dayString = convertIdToString(day.workDayId);
    //   if (values.workDays.includes(day.)) {
    //     return {
    //       workDayId: day.workDayId,
    //       active: true,
    //     };
    //   } else {
    //     return {
    //       workDayId: day.workDayId,
    //       active: false,
    //     };
    //   }
    // });
    const res = await handleSaveWeekWorkDays(
      workDaysToSubmit,
      session?.user?.id
    );
    if (res.success) {
      toast({
        description: "Settings updated successfully",
        title: "Success",
      });
    }
  };

  console.log(new Set(userWorkDays));
  return (
    <div className="flex flex-col w-full my-40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center self-center w-full space-y-20 border-opacity-30 border-slate-300 px-auto"
        >
          <FormField
            control={form.control}
            name="workDays"
            render={() => (
              <FormItem>
                <div className="flex flex-col ">
                  {defaultWorkDays.map((day) => (
                    <FormField
                      key={day.id}
                      control={form.control}
                      name="workDays"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={
                                field.value.includes(day.id)
                                // day
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  //   if (userWorkDays.includes(day.id)) return;
                                  setUserWorkDays((prev) => [...prev, day.id]);
                                  field.onChange([...field.value, day.id]);
                                } else {
                                  const removeDay = userWorkDays.filter(
                                    (value) => value !== day.id
                                  )[0];
                                  const dayToRemoveIndex =
                                    userWorkDays.indexOf(removeDay);
                                  const newDays = userWorkDays.filter(
                                    (day, index) => index !== dayToRemoveIndex
                                  );

                                  setUserWorkDays(newDays);
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== day.id
                                    )
                                  );
                                }
                                // return checked
                                //   ? field.onChange([...field.value, day.id])
                                //   : field.onChange(
                                //       field.value?.filter(
                                //         (value) => value !== day.id
                                //       )
                                //     );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-md">{day.day}</FormLabel>
                        </FormItem>
                      )}
                    ></FormField>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <Button variant="outline" type="submit">
            Save
          </Button>
        </form>
      </Form>
      {/* {workDays.length > 0 && ( */}
      <Button
        disabled={userWorkDays.length === 0}
        className="absolute bottom-24 right-24"
        type="button"
      >
        <Link href="/settings/shifts">Next</Link>
      </Button>
      {/* )} */}
    </div>
  );
}

export default WorkDays;
