"use client";
import React, { useState, forwardRef } from "react";
import { css, cx } from "styled-system/css";
import { ChildrenT } from "@/types";
import { Input, InputVariants } from "../Input";
import { Icon } from "../Icon";

const containerStyle = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
});

const textStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  color: "primary",
  fontWeight: "bold",
  backgroundColor: "#F4F4F4",
  border: "1px solid #E7E7E1",
  borderRight: "none",
  borderRadius: "12px 0 0 12px",
  padding: "1rem",
  whiteSpace: "nowrap",
  height: "55px",
});

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text: React.ReactNode;
  variant?: InputVariants;
  onInputChange?: (section: string) => void;
}

export const InputWithText = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ text, type, onChange, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    const inputClasses = cx(
      css({
        width: "100%",
        borderLeft: "none",
        borderRadius: "0 12px 12px 0",
        height: "55px",
        paddingLeft: "1rem",
      }),
      className
    );

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const eyeButtonStyle = css({
      position: "absolute",
      right: "10px",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "#9A9FA5",
      fontSize: "1rem",
    });

    return (
      <div className={containerStyle}>
        <span className={textStyle}>{text}</span>
        <Input
          autoComplete={props?.name}
          type={inputType}
          className={inputClasses}
          onInputChange={onChange}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputWithText.displayName = "InputWithText";

export default InputWithText;
