import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { css } from "styled-system/css";

const dropdownTriggerStyle = css({
  padding: "0.75rem 1rem",
  borderRadius: "8px",
  border: "1px solid #E0E0E0",
  backgroundColor: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  fontSize: "1rem",
  fontWeight: "500",
  color: "#1C1C1C",
});

const dropdownContentStyle = css({
  borderRadius: "8px",
  border: "1px solid #E0E0E0",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "300px",
  zIndex: "1000",
  maxHeight: "400px",
  overflowY: "auto",
});

const headerStyle = css({
  padding: "1rem",
  borderBottom: "1px solid #E0E0E0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1rem",
  fontWeight: "500",
  color: "#1C1C1C",
});

const itemStyle = css({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  fontWeight: "400",
  cursor: "pointer",
});

const buttonContainerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem",
  flexDirection: "column"
});

const buttonStyle = css({
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "500",
});

const resetButtonStyle = css({
  backgroundColor: "transparent",
  color: "#FF5722",
  border: "none",
});

const submitButtonStyle = css({
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
});

const triggerIconStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

interface DynamicDropdownProps {
  triggerLabel: string;
  items: Array<{ label: string; value: string }>;
  type: "checkbox" | "radio";
  onReset: () => void;
  onSubmit: (selectedItems: string[]) => void;
  showIcon?: boolean;
}

const IconSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 11H19.5V13H4.5V11ZM4.5 6.5H19.5V8.5H4.5V6.5ZM4.5 15.5H19.5V17.5H4.5V15.5Z" fill="currentColor" />
    <path d="M14.5 11L10.5 15L14.5 19V11Z" fill="currentColor" />
  </svg>
);

const DynamicDropdown: React.FC<DynamicDropdownProps> = ({ triggerLabel, items, type, onReset, onSubmit, showIcon = false }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCheckboxChange = (value: string) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleRadioChange = (value: string) => {
    setSelectedItems([value]);
  };

  const handleSubmit = () => {
    onSubmit(selectedItems);
    setIsOpen(false);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button className={dropdownTriggerStyle}>
          <div className={triggerIconStyle}>
            {showIcon && <IconSVG />}
            {triggerLabel}
          </div>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={dropdownContentStyle} sideOffset={5}>
          <div className={headerStyle}>
            <span className={triggerIconStyle}>
              <IconSVG />
              {triggerLabel}
            </span>
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className={itemStyle}
              onSelect={() => (type === "checkbox" ? handleCheckboxChange(item.value) : handleRadioChange(item.value))}
            >
              {type === "checkbox" ? (
                <>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.value)}
                    onChange={() => handleCheckboxChange(item.value)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <label>{item.label}</label>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    name="radio-group"
                    checked={selectedItems.includes(item.value)}
                    onChange={() => handleRadioChange(item.value)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <label>{item.label}</label>
                </>
              )}
            </DropdownMenu.Item>
          ))}
          <div className={buttonContainerStyle}>
            <button className={`${buttonStyle} ${resetButtonStyle}`} onClick={onReset}>Zurücksetzen</button>
            <button className={`${buttonStyle} ${submitButtonStyle}`} onClick={handleSubmit}>Übernehmen</button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DynamicDropdown;
