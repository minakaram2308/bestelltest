import { SelectIcon, Trigger } from '@radix-ui/react-select';
import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { type HTMLEngineProps, engine } from 'styled-system/jsx';

import { Icon } from '..';

const selectTriggerStyles = cva({
  base: {
    display: 'flex',
    width: 'full',
    alignItems: 'center',
    justifyContent: 'space-between',
    rounded: 'md',
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: 'placeholder',
    px: 3,
    py: 2,
    fontSize: 'sm',

    _focus: {
      outline: 'none',
    },

    _hover: {
      color: 'secondary',
      borderColor: 'secondary',
    },

    _placeholder: {
      color: 'placeholder',
    },
  },
});

const CustomSelectTrigger = engine(Trigger, selectTriggerStyles);

interface Props extends HTMLEngineProps<'button'> {
  children: ReactNode;
}
export const SelectTrigger = ({ children, ...rest }: Props) => {
  return (
    <CustomSelectTrigger {...rest}>
      {children}
      <SelectIcon asChild>
        <Icon icon='iconamoon:arrow-down-2' />
      </SelectIcon>
    </CustomSelectTrigger>
  );
};
