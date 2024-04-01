"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { signUpUser } from "@/actions/authActions";

const FormSchema = z.object({
	name: z.string().min(2, { message: "name must be at least 2 characters." }),
	email: z.string().email(),
	password: z.string().min(6, {
		message: "password must be at least 6 characters.",
	}),
});

export function SignUpForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("adding user", data);
		const userId = await signUpUser(data);
		if (userId) {
			toast({
				title: "User created successfully",
				description: <div>You're being redirected to the home page</div>,
			});
			signIn(
				"credentials",
				{
					email: data.email,
					password: data.password,
				},
				{ callbacks: "/Settings" }
			);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Enter your name" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Enter your email" {...field} />
								</FormControl>
								<FormDescription>
									We will never send you junk email :)
								</FormDescription>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<div className="flex flex-col space-y-2">
					<Button type="submit">Submit</Button>
					<Button
						type="button"
						onClick={() => {
							signIn("google");
						}}
						variant="ghost"
					>
						Sign in with Google
					</Button>
				</div>
			</form>
		</Form>
	);
}
