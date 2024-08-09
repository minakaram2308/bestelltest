"use client";
import React, { forwardRef, useImperativeHandle, SetStateAction } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { switchStyles } from "./style";
import { Flex } from "styled-system/jsx";
import { Controller, Control } from "react-hook-form";

interface ControlledSwitchPropsT {
  label?: string;
  checked: boolean;
  setChecked?: React.Dispatch<SetStateAction<boolean>>;
  control?: Control<any>;
  name: string;
}
interface SwitchPropsT {
  label?: string;
  checked: boolean;
  setChecked: React.Dispatch<SetStateAction<boolean>>;
}

export const ControlledSwitch = forwardRef(
  (
    { checked, setChecked, label, control, name }: ControlledSwitchPropsT,
    ref
  ) => {
    const classes = switchStyles();

    useImperativeHandle(ref, () => ({
      get checked() {
        return checked;
      },
      setChecked: (value: boolean) => setChecked && setChecked(value),
    }));

    return (
      <Controller
        name={name}
        control={control && control}
        render={({ field }) => (
          <Flex alignItems="center" gap={4}>
            {label && (
              <label className="Label" htmlFor={`${label || "some"}-switch`}>
                {label}
              </label>
            )}
            <RadixSwitch.Root
              checked={field.value}
              onCheckedChange={(value) => field.onChange(value)}
              className={classes.root}
              id={`${label || "some"}-switch`}
            >
              <RadixSwitch.Thumb className={classes.thumb} />
            </RadixSwitch.Root>
          </Flex>
        )}
      />
    );
  }
);
ControlledSwitch.displayName = "ControlledSwitch";

export const Switch = ({ checked, setChecked, label }: SwitchPropsT) => {
  const classes = switchStyles();
  return (
    <Flex alignItems="center" gap={4}>
      {label && (
        <label className="Label" htmlFor={`${label || "some"}-switch`}>
          {label}
        </label>
      )}
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={() => setChecked((prev) => !prev)}
        className={classes.root}
        id={`${label || "some"}-switch`}
      >
        <RadixSwitch.Thumb className={classes.thumb} />
      </RadixSwitch.Root>
    </Flex>
  );
};
Switch.displayName = "Switch";

export default Switch;
