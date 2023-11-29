import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedSegmentLayout({ children }: { children: ReactNode}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/')

  return <>{children}</>
}