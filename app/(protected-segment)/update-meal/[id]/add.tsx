import styles from "./update-meal.module.css"; 
import Image from "next/image";
import plusSign from "@/app/ui/assets/plus-sign.svg";

export default function AddFoodButton() {
  return (
    <button className={styles.add}>
      <Image src={plusSign} alt="" height={16} width={16}/>
    </button>
  )
}
