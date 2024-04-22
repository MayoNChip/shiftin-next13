"use client";

import { setUserConfigured } from "@/actions/settingsActions";
import { Button } from "@/components/ui/button";
import { Employee, ShiftTypeToEmployee } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
  employees: ({
    shiftTypeToEmployee: ShiftTypeToEmployee[];
  } & Employee)[];
};

function FinishSettingsButton({ employees }: Props) {
  const { data: session } = useSession();

  return (
    <Button
      disabled={employees.length < 1}
      className="absolute bottom-24 right-24"
      type="button"
      onClick={() => {
        setUserConfigured(session?.user?.id);
      }}
    >
      <Link href="/nextsteps">Finish</Link>
    </Button>
  );
}

export default FinishSettingsButton;
