import React, { PropsWithRef, Ref } from 'react';
import Image from 'next/image';
import styles from './header.module.css';

interface PopperButtonProps
  extends PropsWithRef<JSX.IntrinsicElements['button']> {
  text: string;
  image: string;
}

function PopperButton({ text, image, ...props }: PopperButtonProps, ref: Ref<HTMLButtonElement> | null) {
  return (
    <button {...props} ref={ref}>
      <span className={styles.popperText}>{text}</span>
      <Image src={image} alt='' width={15} height={15} />
    </button>
  );
}

export default React.forwardRef(PopperButton);
