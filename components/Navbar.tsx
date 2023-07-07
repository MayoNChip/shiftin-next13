import Link from "next/link";
import { LoginButton, LogoutButton, RegisterButton } from "./ui/authButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { navbarItems } from "@/lib/NavbarItems";

export default async function Navbar() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-full items-center justify-between border-b-[1px] border-gray-400 bg-gray-700 px-4 py-4 pl-6 text-gray-200">
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
      {session ? (
        <div className="flex items-center gap-2 text-slate-200">
          <h1 className="capitalize">{session.user?.name}</h1>

          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-slate-200">
          <LoginButton />
          {/* <MyDialog /> */}
          {/* <RegisterButton /> */}
          <RegisterButton />
        </div>
      )}
    </div>
  );
}
