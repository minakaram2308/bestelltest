import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { type HTMLEngineProps, engine } from 'styled-system/jsx';

export const badgeStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'hug-xl',
    width: 'full',
    maxWidth: '44',
    py: 6,
    backgroundColor: 'teritary/10',
    color: 'disabled-text',
    fontSize: 'lg',
    transition: 'all 0.3s ease-in-out',
    gap: 2,

    _hover: {
      backgroundColor: 'primary',
      color: 'white',
      cursor: 'pointer',
    },

    '&[data-active=true]': {
      backgroundColor: 'primary',
      color: 'white',
    },
  },
});

export const BadgeFactory = engine('button', badgeStyles);

interface BadgeProps extends HTMLEngineProps<'button'> {
  children: ReactNode;
  isActive?: boolean;
}

export const Badge = ({ children, isActive, ...rest }: BadgeProps) => (
  <BadgeFactory data-active={isActive} {...rest}>
    {children}
  </BadgeFactory>
);
