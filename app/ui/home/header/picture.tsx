"use client";

import styles from "@/app/ui/home/header/header.module.css";
import exitSign from "@/app/ui/assets/exit-sign.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePopper } from "react-popper";
import clsx from "clsx";

export default function UserPicture({ imageUrl }: { imageUrl: string }) {
  const [userPicturePopperOpen, setUserPicturePopperOpen] = useState(false);
  const [caloriesPopperOpen, setCaloriesPopperOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLButtonElement>(null);
  const { styles: popperStyles, attributes } = usePopper(
    imageRef.current,
    popperRef.current,
    {
      modifiers: [
        { name: "pictureOffset", enabled: true, options: { offset: [12, 24] } },
      ],
    }
  );

  return (
    <>
      <div
        className={styles.userPicture}
        ref={imageRef}
        onClick={() => setUserPicturePopperOpen(!userPicturePopperOpen)}
      >
        <Image
          src={imageUrl}
          alt="User profile picture."
          width={35}
          height={35}
        />
      </div>
      <button
        className={clsx(styles.userPicturePopper, {
          [styles.hidden]: !userPicturePopperOpen,
        })}
        style={popperStyles.popper}
        ref={popperRef}
        {...attributes.popper}
      >
        <span className={styles.popperText}>Encerrar sessão</span>
        <Image src={exitSign} alt="" width={15} height={15} />
      </button>
    </>
  );
}
