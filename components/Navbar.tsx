import Link from "next/link";
import { navbarItems } from "./NavbarItems";
import { LoginButton, LogoutButton, RegisterButton } from "./ui/authButtons";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyDialog from "./MyDialog";
import SignUpForm from "./SignUpForm";
import { Button } from "./ui/button";

export default async function Navbar() {
	// const { data: session } = useSession();
	const session = await getServerSession(authOptions);
	return (
		<div className="flex w-full items-center justify-between border-b-[1px] border-gray-400 bg-gray-700 px-4 py-4 pl-6 text-gray-200">
			<div className="flex items-center gap-6">
				<div>LOGO</div>
				{navbarItems.map((item) => (
					<div key={item.id}>
						<Link href={item.path}>{item.title}</Link>
					</div>
				))}
			</div>
			{session ? (
				<div className="flex items-center gap-2 text-slate-200">
					<h1 className="capitalize">{session.user?.name}</h1>

					<LogoutButton />
				</div>
			) : (
				<>
					<LoginButton />
					<MyDialog header="Sign Up">
						<SignUpForm />
					</MyDialog>

					{/* <RegisterButton /> */}
				</>
			)}
		</div>
	);
}
