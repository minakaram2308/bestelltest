import { Close } from '@radix-ui/react-dialog';
import { css, cva } from 'styled-system/css';
import { engine } from 'styled-system/jsx';

import { Icon } from '..';

export const dialogCloseRecepie = cva({
  base: {
    position: 'absolute',
    right: 4,
    top: 4,
    opacity: 0.7,
    borderRadius: 'hug',
    transitionDuration: '200ms',

    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
    '&:focus': {
      outline: 'none',
      ring: 2,
      ringColor: 'ring',
      ringOffset: 2,
    },
  },
});

export const CustomDialogClose = engine(Close, dialogCloseRecepie);

export const DialogClose = () => {
  return (
    <CustomDialogClose>
      <Icon icon='jam:close' fontSize='2xl' ml='auto' />
      <span
        className={css({
          srOnly: true,
        })}
      >
        Close
      </span>
    </CustomDialogClose>
  );
};
