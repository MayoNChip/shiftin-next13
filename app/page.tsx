import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {/* <Header /> */}
      {session && (
        <h1 className="text-3xl font-bold">Hello {session?.user?.name}</h1>
      )}
    </main>
  );
}
