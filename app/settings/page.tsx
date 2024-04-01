import SettingsFrom from "./SettingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@prisma/client";

export const INITIAL_FORM_DATA = {
  weekWorkDays: [
    {
      id: 1,
      day: "sunday",
      active: false,
    },
    {
      id: 2,
      day: "monday",
      active: false,
    },
    {
      id: 3,
      day: "tuesday",
      active: false,
    },
    {
      id: 4,
      day: "wednesday",
      active: false,
    },
    {
      id: 5,
      day: "thursday",
      active: false,
    },
    {
      id: 6,
      day: "friday",
      active: false,
    },
    {
      id: 7,
      day: "saturday",
      active: false,
    },
  ],
  shifts: [
    {
      shiftType: "",
      startTime: new Date(),
      endTime: new Date(),
    },
  ],
};

export type ShiftTypeNoId = (typeof INITIAL_FORM_DATA)["shifts"][0] & {
  userId: string;
};

export default async function index() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin?callbackURL=/settings");
  }

  return (
    <div className="w-full h-screen pt-32">
      {!session?.user?.configured ? (
        <div className="flex justify-around h-full pb-24">
          <div className="flex flex-col space-y-10">
            <h1 className="text-6xl font-semibold ">
              Welcome {session.user.name}
            </h1>
            <h1 className="text-3xl font-extralight">
              Let's get started with setting up your account
            </h1>
          </div>
          <Button className="self-end">
            <Link href={"/settings/workdays"}>Start!</Link>
          </Button>
        </div>
      ) : (
        <div>
          <h1>To edit your settings, click on the button below</h1>
        </div>
      )}
    </div>
  );
}
