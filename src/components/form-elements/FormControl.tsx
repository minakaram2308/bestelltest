'use client'

import { ReactNode } from 'react'
import { Control, useController } from 'react-hook-form'
import { css } from 'styled-system/css'
import { Stack } from 'styled-system/jsx'

interface Props {
  name: string
  children: ReactNode
  control: Control<any>
}

export const FormControl = ({ name, children, control }: Props) => {
  const {
    formState: { isValid, errors },
  } = useController({ name, control })

  return (
    <Stack>
      {children}
      {!isValid ? (
        <span className={css({ color: 'red.400', marginTop: 0, fontSize: 'sm', lineHeight: 1 })}>
          {errors?.[name]?.message as string}
        </span>
      ) : null}
    </Stack>
  )
}
