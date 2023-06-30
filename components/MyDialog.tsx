import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

function MyDialog() {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Sign Up</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Welcome!</DialogTitle>
					<DialogDescription>sign up form</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default MyDialog;
