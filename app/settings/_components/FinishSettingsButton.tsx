"use client";

import { setUserConfigured } from "@/actions/settingsActions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function FinishSettingsButton() {
  const { data: session } = useSession();

  return (
    <Button
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
