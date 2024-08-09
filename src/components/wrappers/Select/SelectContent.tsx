import { Content } from "@radix-ui/react-select";
import { cva } from "styled-system/css";
import { engine } from "styled-system/jsx";

const selectContentStyles = cva({
  base: {
    position: "relative",
    zIndex: 10,
    maxHeight: 96,
    minWidth: 36,
    width: "full",
    overflow: "hidden",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "placeholder",
    backgroundColor: "white",
    paddingY: 4,
    paddingX: 2,
    marginTop: 2,
    shadow: "md",
    transition: "all 0.3ms",
  },
});

export const SelectContent = engine(Content, selectContentStyles);
