'use client';

import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import exitSign from '@/app/ui/assets/exit-sign.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import clsx from 'clsx';
import PopperButton from './popper';
import { signOut } from 'next-auth/react';

export default function UserPicture({ imageUrl }: { imageUrl: string }) {
  const [userPicturePopperOpen, setUserPicturePopperOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLButtonElement>(null);
  const { styles: popperStyles, attributes } = usePopper(
    imageRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [45, -35],
          },
        },
        { name: 'flip', options: { fallbackPlacements: ['left'] } },
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
          alt='User profile picture.'
          width={35}
          height={35}
          className={styles.userPictureImage}
        />
      </div>
      <PopperButton
        onClick={() => signOut()}
        className={clsx(styles.buttonPopper, {
          [styles.hidden]: !userPicturePopperOpen,
        })}
        style={popperStyles.popper}
        ref={popperRef}
        text='Encerrar sessão'
        image={exitSign}
        {...attributes.popper}
      />
    </>
  );
}
