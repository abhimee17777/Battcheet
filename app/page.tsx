import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./libs/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return redirect("/conversations");
} 