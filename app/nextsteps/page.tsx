import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-8">
      <Button variant="secondary">
        <Link href="/schedule">Create your first schedule</Link>
      </Button>
      <Button>Go to your dashboard</Button>
    </div>
  );
}

export default Page;
