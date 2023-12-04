import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import styles from '@/app/(protected-segment)/home/(header)/header.module.css'
import UserPicture from "./picture";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  const { user } = session!;

  return (
    <div className={styles.userInfoContainer}>
      <h1 className={styles.username}>Olá, {user!.name}</h1>
      <UserPicture imageUrl={user?.image!} />
    </div>
  )
}