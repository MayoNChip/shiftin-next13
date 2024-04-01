import { Button } from "@/components/ui/button";
import React from "react";

function Page() {
	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen space-y-8">
			<Button variant="secondary">Create your first schedule</Button>
			<Button>Go to your dashboard</Button>
		</div>
	);
}

export default Page;
