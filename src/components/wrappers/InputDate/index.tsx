"use client";
import React, { useState, forwardRef } from "react";
import { ChildrenT } from "@/types";
import { type RecipeVariantProps, cva, css, cx } from "styled-system/css";
import { engine } from "styled-system/jsx";


export const inputStyle = cva({
  base: {
    transition: "all 150ms ease-in-out",
    padding: 4,
    textStyle: "sm",
    fontWeight: "bold",
    borderRadius: "hug-lg",
    color: "black",
    border: "2px solid",
    borderColor: "#E7E7E1",

    _placeholder: {
      color: "#9A9FA5",
    },

    _focusVisible: {
      outline: "0px solid transparent",
      outlineOffset: "2px",
    },

    _focus: {
      borderColor: "primary",
    },

    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },

    _invalid: {
      borderColor: "danger",
    },
  },

  variants: {
    variant: {
      outline: {
        borderRadius: "lg",
        border: "1px solid",
        borderColor: "textGray",
        color: "textGray",

        _placeholder: {
          color: "textGray",
        },
      },
    },
  },
});

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
  color: "#1B1E1B",
});
export const Input = engine("input", inputStyle);

interface InputDateProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ChildrenT;
}

export const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  ({ icon, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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
          type='date'
          className={`custom-date-input ${inputClasses}`}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputDate.displayName = "InputDate";

export default InputDate;
