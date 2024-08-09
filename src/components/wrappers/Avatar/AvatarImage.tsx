import { Avatar } from "@ark-ui/react/avatar";
import { cva } from "styled-system/css";
import { engine } from "styled-system/jsx";

const AvatarImageSyles = cva({
  base: { borderRadius: "full", width: "40px", height: "40px" },

  variants: {
    sizes: {
      sm: {
        width: "32px",
        height: "32px",
      },
      md: {
        width: "40px",
        height: "40px",
      },
      lg: {
        width: "48px",
        height: "48px",
      },
      xl: {
        width: "56px",
        height: "56px",
      },
    },
  },

  defaultVariants: {
    sizes: "md",
  },
});

export const AvatarImage = engine(Avatar.Image, AvatarImageSyles);
