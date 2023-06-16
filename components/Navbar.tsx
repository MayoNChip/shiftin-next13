import Link from "next/link";
import { navbarItems } from "./NavbarItems";

function Navbar() {
	return (
		<div className="top-0 flex items-center w-full gap-4 h-14 bg-slate-500">
			{navbarItems.map((item) => (
				<button className="px-6 py-2 text-white ">
					<Link key={item.id} href={item.path}>
						{item.title}
					</Link>
				</button>
			))}
		</div>
	);
}

export default Navbar;
