import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface Props {
	children: ReactNode;
	header: string;
	buttonText?: string;
}

function MyDialog({ children, buttonText, header }: Props) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>{buttonText ?? header}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{header}</DialogTitle>
					<DialogDescription>{children}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default MyDialog;
