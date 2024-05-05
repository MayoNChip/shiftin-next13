import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EditSettings from "./_components/EditSettings";
import { getUserSettings } from "@/actions/settingsActions";
import { toast } from "@/components/ui/use-toast";

export default async function Settings() {
  const session = await getServerSession(authOptions);

  const userSettings = await getUserSettings(session?.user?.id);

  if (!userSettings?.userToWorkDay) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Try again after re-login",
    });
    redirect("/signin?callbackURL=/settings");
  }

  if (!session?.user) {
    redirect("/signin?callbackURL=/settings");
  }

  return (
    <div className="w-full h-screen">
      {!session?.user?.configured ? (
        <div className="flex justify-around h-full pb-24">
          <div className="flex flex-col space-y-10">
            <h1 className="text-6xl font-semibold ">
              Welcome {session.user.name}
            </h1>
            <h1 className="text-3xl font-extralight">
              Let&apos;s get started with setting up your account
            </h1>
          </div>
          <Button className="self-end">
            <Link href={"/settings/workdays"}>Start!</Link>
          </Button>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center space-x-4">
          <EditSettings
            workDays={userSettings?.userToWorkDay}
            shiftTypes={userSettings.shiftTypes}
          />
        </div>
      )}
    </div>
  );
}
