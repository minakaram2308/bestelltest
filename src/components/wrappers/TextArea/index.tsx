"use client";
import React, { useState, forwardRef } from "react";
import { type RecipeVariantProps, cva, css } from "styled-system/css";
import { engine } from "styled-system/jsx";
import { Icon } from "../Icon";

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

export type InputVariants = NonNullable<
  RecipeVariantProps<typeof inputStyle>
>["variant"];

export const TextArea = engine("textarea", inputStyle);

const containerStyle = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
});

const eyeButtonStyle = css({
  position: "absolute",
  right: "10px",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "#9A9FA5",
  fontSize: "1rem",
});

const ForwardedInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { type, className, ...rest } = props;
  const inputType = type === "password" && showPassword ? "text" : type;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={containerStyle}>
      <TextArea rows={5} type={inputType} className={className} {...rest} ref={ref} />
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
});

ForwardedInput.displayName = "TextArea";

export default ForwardedInput;
