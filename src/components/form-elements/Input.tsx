"use client";

import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { engine } from "styled-system/jsx";

import { Input as CustomInput, type InputVariants } from "@/components";

import { FormControl } from ".";

// T here is the form values type
interface InputProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  type?: string;
  label?: string;
  placeholder?: string;
  control: Control<TFormValues>;
  variant?: InputVariants;
}

export function Input<TFormValues extends FieldValues>({
  type,
  label,
  placeholder,
  name,
  control,
  variant,
  ...rest
}: InputProps<TFormValues>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control}>
      {label && <engine.p color="white">{label}</engine.p>}
      <CustomInput
        {...field}
        type={type}
        variant={variant}
        placeholder={placeholder}
        {...rest}
      />
    </FormControl>
  );
}
