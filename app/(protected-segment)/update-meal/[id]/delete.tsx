import styles from "./update-meal.module.css";
import Image from "next/image";
import trashSign from "@/app/ui/assets/trash-sign.svg"


export default function DeleteButton() {
  return (
    <button className={styles.delete}>
      <Image src={trashSign} alt='' height={30} width={30} />
    </button>
  )
}
