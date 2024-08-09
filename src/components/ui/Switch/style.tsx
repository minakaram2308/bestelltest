import { sva } from "styled-system/css";
import { switchAnatomy } from "@ark-ui/anatomy";
import { defineSlotRecipe } from "@pandacss/dev";

export const switchStyles = sva({
  slots: switchAnatomy.keys(),
  base: {
    root: {
      cursor: "pointer",
      width: "43px",
      height: "25px",
      backgroundColor: "darkGray",
      borderRadius: "50px",
      position: "relative",
      _checked: {
        backgroundColor: "primary",
      },
    },
    control: {
      minWidth: "20px",
      backgroundColor: "darkgray",
      padding: "2px 5px",
      borderBottom: "1px solid",
      _checked: {
        backgroundColor: "primary",
      },
    },
    thumb: {
      display: "block",
      width: "21px",
      height: "21px",
      backgroundColor: "white",
      borderRadius: "9999px",
      transition: "transform 100ms",
      transform: "translateX(2px)",
      willChange: "transform",
      _checked: {
        transform: "translateX(19px)",
      },
    },
    label: {
      color: "black",
      lineHeight: 1,
    },
  },
  defaultVariants: {},
  variants: {},
});
