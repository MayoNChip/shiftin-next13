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
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submitting", data);
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });

    if (!res?.error) {
      toast({
        variant: "default",
        title: "Login successful",
        description: "Redirecting...",
      });
    } else {
      return toast({
        variant: "destructive",
        title: "Error",
        description: res?.error || "",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8">
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
          <p className="text-sm text-center">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="underline text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
