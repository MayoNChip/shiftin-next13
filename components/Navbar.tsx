import Link from "next/link";
import { LoginButton, LogoutButton, RegisterButton } from "./ui/authButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { navbarItems } from "@/lib/NavbarItems";
import { ModeToggle } from "./ModeToggle";

export default async function Navbar() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  return (
    <div className="top-0 flex items-center justify-between w-full px-6 py-4 shadow-md text-secondary-foreground bg-secondary min-h-48">
      <div className="flex items-center gap-6">
        <div>LOGO</div>
        {session && session.user?.configured
          ? navbarItems.map((item) => (
              <div key={item.id}>
                <Link href={item.path}>{item.title}</Link>
              </div>
            ))
          : navbarItems
              .filter((item) => !item.protected)
              .map((item) => (
                <div key={item.id}>
                  <Link href={item.path}>{item.title}</Link>
                </div>
              ))}
      </div>
      <div className="flex space-x-3">
        {session ? (
          <div className="flex items-center gap-2">
            <h1 className="capitalize">{session.user?.name}</h1>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LoginButton />
            {/* <MyDialog /> */}
            {/* <RegisterButton /> */}
            <RegisterButton />
          </div>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
