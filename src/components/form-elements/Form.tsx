import type { FormEventHandler, ReactNode } from 'react';
import { css } from 'styled-system/css';

interface Props {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Form = ({ children, onSubmit }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={css({
        width: 'full',
        height: 'full',
      })}
    >
      {children}
    </form>
  );
};
