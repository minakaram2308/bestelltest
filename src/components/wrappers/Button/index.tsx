import { type RecipeVariantProps, cva } from "styled-system/css";
import { engine } from "styled-system/jsx";

const buttonStyles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textStyle: "md",
    fontWeight: "bold",
    transition: "all 300ms ease-in-out",
    cursor: "pointer",
    gap: 2,
    width: "full",
    height: "full",
    borderRadius: "hug-lg",

    _focusVisible: {
      outline: "2px solid transparent",
      outlineOffset: "2px",
    },

    _disabled: {
      backgroundColor: "disabled-background",
      opacity: "20%",
      cursor: "not-allowed",
      color: "disabled-text",
    },
  },

  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "white",

        _hover: {
          backgroundColor: "priamry-hover",
        },
      },
      secondary: {
        bg: "transparent",
        border: "1px solid",
        borderColor: "disabled-text",
        color: "secondary",

        _hover: {
          bg: "secondary",
          color: "white",
          borderColor: "transparent",
        },
      },
      teritary: {
        color: "teritary",
        borderColor: "teritary",
        border: "1px solid",

        _hover: {
          backgroundColor: "teritary",
          color: "white",
        },
      },
      outline: {
        color: "primary",
        bg: "transparent",
        border: "1px solid ",
        borderColor: "primary",

        _hover: {
          bg: "white",
          color: "#ed8121",
        },
      },
      icon: {
        bg: "transparent",
        border: "none",
        borderRadius: "50%",
        padding: "12px",
        // _hover: {
        //   opacity: "0.7",
        //   bg: "darkGray",
        // color: "#fff",
        // },
      },
    },
    size: {
      sm: {
        padding: 4,
      },
      lg: {
        paddingX: 12,
        paddingY: 4,
      },
      icon: {
        h: "12",
        w: "12",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

export type ButtonVariants = NonNullable<
  RecipeVariantProps<typeof buttonStyles>
>["variant"];
export type ButtonSizes = NonNullable<
  RecipeVariantProps<typeof buttonStyles>
>["size"];

export const Button = engine("button", buttonStyles);
