import React, { ReactNode } from "react";

interface FormWrapperType {
	title: string;
	children: ReactNode;
}

function FromWrapper({ title, children }: FormWrapperType) {
	return (
		<div className="flex flex-col items-center w-full">
			<h1 className="text-2xl">{title}</h1>
			{children}
		</div>
	);
}

export default FromWrapper;
