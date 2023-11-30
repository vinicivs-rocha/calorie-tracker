import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Image from "next/image"
import styles from '@/app/ui/home/header/header.module.css'

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  const { user } = session!;

  return (
    <div className={styles.userInfoContainer}>
      <h1 className={styles.username}>Olá, {user!.name}</h1>
      <div className={styles.userPicture}>
        <Image
          src={user!.image!}
          alt="User profile picture."
          width={35}
          height={35}
        />
      </div>
    </div>
  )
}