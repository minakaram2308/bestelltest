import { Overlay } from '@radix-ui/react-dialog'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

export const DialogOverlayReciepe = cva({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    backgroundColor: '#000000cc',

    '&[data-state=open]': {
      animation: 'fade-in ',
    },
    '&[data-state=closed]': {
      animation: 'fade-out ',
    },
  },
})

export const DialogOverlay = engine(Overlay, DialogOverlayReciepe)
