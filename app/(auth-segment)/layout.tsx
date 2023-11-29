import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AuthSegmentLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session) redirect('/home');

  return <>{ children }</>
}