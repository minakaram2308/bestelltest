import { Trigger } from "@radix-ui/react-tabs";
import { cva } from "styled-system/css";
import { engine } from "styled-system/jsx";

// const tabButtonStyle = cx(
//   css({
//     fontWeight: "bold",
//     padding: "5px 0.5rem",
//     borderRadius: "hug-md",
//     width: "100%",
//     cursor: "pointer",
//   }),
//   "tabsTrigger"
// );
const triggerStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: "100%",
    borderRadius: "hug-md",
    transition: "all 300ms ease-in-out",
    padding: "5px 0.5rem",
    cursor: "pointer",
  },

  variants: {
    variant: {
      light: {
        backgroundColor: "transparent",
        color: "black",

        "&:hover": {
          opacity: 0.8,
          color: "#4f5bf3",
        },

        "&[data-state=active]": {
          color: "#4f5bf3",
          backgroundColor: "#fcfcf9",
        },
      },

      dark: {
        color: "#4f5bf3",
        opacity: 0.4,

        "&:hover": {
          opacity: 0.8,
          color: "secondary",
        },

        "&[data-state=active]": {
          background: "white",
          color: "#4f5bf3",
          opacity: 1,
        },
      },
      simple: {
        color: "textGray",
        borderRadius: 0,
        paddingX: 0,
        paddingY: 4,
        width: "auto",
        borderBottom: "2px solid transparent",

        "&:hover": {
          color: "secondary",
        },

        "&[data-state=active]": {
          color: "#4f5bf3",
          background: "white",
          borderBottom: "2px solid token(colors.secondary)",
        },
      },
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export const TabsTrigger = engine(Trigger, triggerStyles);
