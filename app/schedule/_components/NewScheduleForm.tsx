"use client";

import { createNewSchedule } from "@/actions/scheduleActions";
import { DateTimePicker } from "@/app/settings/DateTimePicker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewScheduleSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

function NewScheduleForm({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateSchedule = async (
    values: z.infer<typeof NewScheduleSchema>
  ) => {
    console.log(values);

    const scheduleRes = await createNewSchedule({
      userId: session?.user?.id,
      startDate,
      endDate,
    });

    if (scheduleRes?.success) {
      toast({
        title: "Schedule Created Successfully",
        description: "Redirecting...",
      });
      router.push(`/schedule/${scheduleRes.data}`);
      setIsOpen(false);
    }

    // // if (scheduleRes?.id) {
    // //   setScheduleId(scheduleRes.id);
    // // }
    // router.push(`/schedule/${scheduleRes?.id}`);
  };

  const form = useForm<z.infer<typeof NewScheduleSchema>>({
    resolver: zodResolver(NewScheduleSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  useMemo(() => {
    form.setValue("startDate", startDate);
    form.setValue("endDate", endDate);
  }, [startDate, endDate, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateSchedule)}>
        <FormField
          name="startDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col  items-center gap-4">
                  <label>Shift start time</label>
                  <DateTimePicker date={startDate} setDate={setStartDate} />
                  <label>Shift end time</label>
                  <DateTimePicker date={endDate} setDate={setEndDate} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
        <Button>Close</Button>
      </form>
    </Form>
  );
}

export default NewScheduleForm;
