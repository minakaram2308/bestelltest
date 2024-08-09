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

const iconStyle = css({
  position: "absolute",
  left: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  color: "#9A9FA5",
});

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ChildrenT;
  variant?: InputVariants;
  onInputChange?: (section: string) => void;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, type, className, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    const inputClasses = cx(
      css({
        width: "100%",
        paddingLeft: "3.5rem",
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
        <span className={iconStyle}>{icon}</span>
        <Input
          autoComplete={props?.name}
          type={inputType}
          className={inputClasses}
          onInputChange={onChange}
          {...props}
          ref={ref}
        />
        {type === "password" && (
          <button
            type="button"
            className={eyeButtonStyle}
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <Icon fontSize={24} icon="iconoir:eye-solid" />
            ) : (
              <Icon fontSize={24} icon="iconoir:eye" />
            )}
          </button>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
