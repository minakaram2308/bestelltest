"use client";

import type { ReactNode } from "react";
import { type Control, type FieldValues, useFormState } from "react-hook-form";

import { Button, type ButtonSizes, type ButtonVariants, Spinner } from "../";

interface Props<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  children: ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

export function SubmitButton<TFormValues extends FieldValues>({
  control,
  children,
  variant,
  size,
  ...rest
}: Props<TFormValues>) {
  const { isSubmitting } = useFormState({ control });

  return (
    <Button variant={variant} size={size} {...rest}>
      {isSubmitting ? <Spinner /> : children}
    </Button>
  );
}
