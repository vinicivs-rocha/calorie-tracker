import Image from "next/image";
import plusSign from "@/app/ui/assets/plus-sign.svg";
import styles from "@/app/(protected-segment)/home/(current)/current.module.css";
import { poppins } from "../../../fonts";

export default function StartDayButton() {
  return (
    <button
      className={styles.startDayButton}
    >
      <Image src={plusSign} alt="" width={12} height={12} />
      <span className={`${styles.startDayText} ${poppins.className}`}>
        Iniciar novo dia
      </span>
    </button>
  );
}
