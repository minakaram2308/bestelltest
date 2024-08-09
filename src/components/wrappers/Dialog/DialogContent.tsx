import { Content, DialogPortal } from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { engine } from 'styled-system/jsx';

import { DialogOverlay } from '..';
import { DialogClose } from './DialogCloseWrapper';

export const dialogContentRecepie = cva({
  base: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    zIndex: 50,
    width: '100%',
    maxWidth: 'lg',
    transform: 'translateX(-50%) translateY(-50%)',
    gap: 4,
    padding: 6,
    shadow: 'lg',
    backgroundColor: 'white',
    borderRadius: 'md',

    '&[data-state=open]': {
      animation: 'fade-in',
    },
    '&[data-state=closed]': {
      animation: 'fade-out',
    },
  },
});

export const CustomDialogContent = engine(Content, dialogContentRecepie);

export const DialogContent = ({ children }: { children: ReactNode }) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <CustomDialogContent>
        <DialogClose />
        {children}
      </CustomDialogContent>
    </DialogPortal>
  );
};
