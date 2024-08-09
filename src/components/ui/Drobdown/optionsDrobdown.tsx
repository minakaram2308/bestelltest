import React, { forwardRef, useImperativeHandle, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { css } from "styled-system/css";

const dropdownContentStyle = css({
  borderRadius: "8px",
  left:'-200px',
  top:0,
  position: "absolute",
  border: "1px solid #E0E0E0",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: "1000",
  minWidth: "150px",
  padding: "0.5rem 0",
});

const itemStyle = css({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  fontWeight: "400",
  color: "#1C1C1C",
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
});

const iconStyle = css({
  marginRight: "0.5rem",
});

interface DynamicDropdownProps {
  items: Array<{ label: string; value: string; icon: React.ReactNode }>;
  onAction: (value: string) => void;
  customTrigger: React.ReactNode;
}

const DynamicDropdown = forwardRef(({ items, onAction, customTrigger }: DynamicDropdownProps, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleDropdown: () => setOpen(!open),
    closeDropdown: () => setOpen(false),
  }));

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        {customTrigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={dropdownContentStyle}>
        {items.map((item, index) => (
          <DropdownMenu.Item
            key={index}
            className={itemStyle}
            onSelect={() => onAction(item.value)}
          >
            {item.icon && React.cloneElement(item.icon, { className: iconStyle })}
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
});

DynamicDropdown.displayName = 'DynamicDropdown';

export default DynamicDropdown;
