"use client";

import * as Select from "@radix-ui/react-select";
import React from "react";
import classnames from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  [x: string]: any;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value, ...props }, forwardedRef) => (
    <Select.Item
      className={classnames("SelectItem", className)}
      {...props}
      ref={forwardedRef}
      value={value}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
);

SelectItem.displayName = "SelectItem";

interface SelectBoxProps {
  items: { value: string; label: string }[];
  ariaLabel: string;
  value: string;
  placeholder: string;
  onValueChange?: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ items, ariaLabel, value,placeholder, onValueChange }) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="SelectTrigger" aria-label={ariaLabel}>
        <Select.Value placeholder={placeholder ?? "- Please Select -"} />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectBox;