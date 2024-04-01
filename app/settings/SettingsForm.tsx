"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { useMultiStepForm } from "@/hooks/useMultiStepForm";
// import { FormGroup, useForkRef } from "@mui/material";
// import React, { FormEvent, useEffect, useState } from "react";
// import SettingsFormStep from "./SettingsWeekStep";
// import { Shift, ShiftType } from "@prisma/client";
// import SettingsShiftsStep from "./SettingsShiftsStep";
// import SettingsWeekStep from "./SettingsWeekStep";
// import { InitialFormDataType, ShiftTypeInterface } from "@/commonTypes";
// import { Toast } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";
// import { usePathname, useSearchParams } from "next/navigation";
// import { getShiftTypes, getWorkDays } from "@/actions/settingsActions";
// import { Skeleton } from "@/components/ui/skeleton";

// function SettingsForm() {
// 	const [data, setData] = useState<InitialFormDataType>(INITIAL_FORM_DATA);
// 	const [loading, setLoading] = useState(true);

// 	const { toast } = useToast();
// 	const pathname = usePathname();
// 	const searchParams = useSearchParams();

// 	useEffect(() => {
// 		const url = `${pathname}`;
// 		console.log(url);
// 		// You can now use the current URL
// 		// ...
// 		const getCurrentSettings = async () => {
// 			setLoading(true);
// 			const shiftTypes = await getShiftTypes({});
// 			const workDays = await getWorkDays({ userId: "1" });

// 			if (!shiftTypes.success || !workDays.success) {
// 				return toast({
// 					description: "Error while getting cuurent settings",
// 					title: "Error",
// 					variant: "destructive",
// 				});
// 			}
// 			setData({
// 				weekWorkDays: workDays.data,
// 				shifts: shiftTypes.data,
// 			});
// 			setLoading(false);
// 		};
// 		getCurrentSettings();
// 	}, []);

// 	const ChangeWeekFormData = (
// 		newWeek: {
// 			id: number;
// 			day: string;
// 			active: boolean;
// 		}[]
// 	) => {
// 		setData((prev) => {
// 			return { ...prev, weekWorkDays: newWeek };
// 		});
// 	};

// 	const { currentStepIndex, next, steps, step, back, isLastStep } =
// 		useMultiStepForm([
// 			<SettingsWeekStep {...data} setData={setData} loading={loading} />,
// 			<SettingsShiftsStep {...data} />,
// 			<div>
// 				<h1>hello</h1>
// 			</div>,
// 		]);

// 	const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		// if (!isLastStep) {
// 		console.log(currentStepIndex);
// 		if (currentStepIndex === 1) {
// 			if (data.shifts.length >= 2) {
// 				next();
// 			} else {
// 				toast({
// 					title: "Oops",
// 					description: "Please add atleast 2 shift types",
// 				});
// 				return;
// 			}
// 		}
// 		next();
// 		// } else {
// 		// 	return;
// 		// }
// 	};

// 	return (
// 		<div className="flex flex-col items-center w-1/2 p-6 border-x-2 border-opacity-30 border-slate-300 ">
// 			<form onSubmit={handleSubmitForm}>
// 				{step}
// 				<div className="flex items-center justify-around w-72">
// 					{/* <Button variant="outline" onClick={back}>
// 						Back
// 					</Button> */}
// 					<Button type="button" onClick={back}>
// 						Back
// 					</Button>
// 					<Button type="submit">Next</Button>
// 				</div>
// 			</form>
// 		</div>
// 	);
// }

// export default SettingsForm;

function SettingsForm() {
	const FormSchema = z
		.object({
			id: z.string(),
			day: z.string(),
			active: z.boolean(),
		})
		.array();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: [
			{
				id: "",
				day: "",
				active: false,
			},
		],
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values);
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>hello</form>
			</Form>
		</div>
	);
}

export default SettingsForm;
