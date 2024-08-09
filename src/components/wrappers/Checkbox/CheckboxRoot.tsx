import { Root } from '@radix-ui/react-checkbox'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

export const checkboxRootStyle = cva({
  base: {
    height: '1.125rem',
    width: '1.125rem',
    flexShrink: '0',
    flexBasis: 'auto',
    cursor: 'pointer',
    borderRadius: '2px',

    _checked: {
      bgColor: 'secondary',
    },

    _invalid: {
      borderColor: 'red',

      color: 'red',
      _checked: {
        bgColor: 'red',
      },
    },
  },
  variants: {
    varaiant: {
      dark: {
        backgroundColor: 'placeholder',
        color: 'white',

        '& + label': {
          color: 'white',
        },
      },
      light: {
        backgroundColor: 'white',
        color: 'darkTextGray',
        border: '1px solid',
        borderColor: 'placeholder',

        '& + label': {
          color: 'darkTextGray',
        },
      },
    },
  },
  defaultVariants: {
    varaiant: 'dark',
  },
})

export const CheckboxRoot = engine(Root, checkboxRootStyle)
