"use client";

import { Control, useController } from "react-hook-form";

import { FormControl } from ".";
import { Checkbox as CustomCheckbox } from "../form-elements/Checkbox";

interface Props {
  name: string;
  label: string;
  control: Control<any>;
}

export const Checkbox = ({ name, label, control }: Props) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control}>
      <CustomCheckbox {...field}>{label}</CustomCheckbox>
    </FormControl>
  );
};
