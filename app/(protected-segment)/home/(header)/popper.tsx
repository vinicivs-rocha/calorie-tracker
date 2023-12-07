import React, { PropsWithRef, Ref } from 'react';

interface PopperButtonProps
  extends PropsWithRef<JSX.IntrinsicElements['button']> {}

function PopperButton({ children, ...props }: PopperButtonProps, ref: Ref<HTMLButtonElement> | null) {
  return (
    <button {...props} ref={ref}>
      { children }
    </button>
  );
}

export default React.forwardRef(PopperButton);
