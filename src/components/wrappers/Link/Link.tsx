import NextLink from 'next/link';
import type { ReactNode } from 'react';
import { type RecipeVariantProps, cva } from 'styled-system/css';
import { type HTMLEngineProps, engine } from 'styled-system/jsx';

const linkstyles = cva({
  base: {
    fontSize: 'sm',
    transition: 'color 0.2s ease-in-out',
    color: 'gray-text',

    _hover: {
      color: 'primary',
    },
  },
  variants: {
    variant: {
      backLink: {
        borderBottom: 'none',
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
      },

      header: {
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        borderBottom: 'none',
      },

      withIcon: {
        display: 'inline-flex',
        alignItems: 'center',
        borderBottom: 'none',
      },
    },

    size: {
      sm: {
        fontSize: 'sm',
      },
      md: {
        fontSize: 'md',
      },
      lg: {
        fontSize: 'lg',
      },
      '2xl': {
        fontSize: '2xl',
      },
      '3xl': {
        fontSize: '3xl',
      },
    },
  },
});

export const CustomLink = engine(NextLink, linkstyles);

type props = RecipeVariantProps<typeof linkstyles> &
  HTMLEngineProps<'a'> & {
    href: string;
    children: ReactNode;
    isExternal?: boolean;
  };

export const Link = ({
  href,
  children,
  size,
  variant,
  isExternal,
  ...rest
}: props) => {
  return (
    <CustomLink
      href={href}
      size={size}
      variant={variant}
      target={isExternal ? '_blank' : '_self'}
      {...rest}
    >
      {children}
    </CustomLink>
  );
};
