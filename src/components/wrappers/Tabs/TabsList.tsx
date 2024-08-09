import { List } from '@radix-ui/react-tabs';
import { cva } from 'styled-system/css';
import { engine } from 'styled-system/jsx';

const tabListStyles = cva({
  base: {
    display: 'flex',
    minHeight: 16,
    padding: 2,
    borderRadius: 'hug-lg',
    position: 'relative',

    // gradient border on :before
    _before: {
      content: '""',
      position: 'absolute',
      top: '-1px',
      right: '-1px',
      bottom: '-1px',
      left: '-1px',
      borderRadius: 'hug-lg',
      backgroundImage: 'linear-gradient(to right, #ED8121, #4F5BF3)',
      zIndex: -1,
    },
  },

  variants: {
    variant: {
      light: {
        backgroundColor: '#181A37',
      },
      dark: {
        backgroundColor: 'darkGray',
      },
      simple: {
        backgroundColor: 'transparent',
        minHeight: 0,
        justifyContent: 'center',
        gap: 12,
      },
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});

export const TabsList = engine(List, tabListStyles);
