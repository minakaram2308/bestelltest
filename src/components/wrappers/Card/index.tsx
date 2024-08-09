import { ChildrenT } from "@/types";
import React from "react";
import { css, cx } from "styled-system/css";
import { Box } from "styled-system/jsx";

const CardStyles = css({
  padding: { base: "10px", lg: "1.5rem" },
  borderRadius: "hug-xl",
  width: "100%",
  backgroundColor: {
    base: "components-background.light",
    _dark: "components-background.dark",
  },
});
export const Card = ({
  children,
  className,
  ...props
}: {
  children: ChildrenT;
  className?: string;
}) => {
  const mergedClasses = cx(CardStyles, className);
  return (
    
    <Box className={mergedClasses} {...props}>
      {children}
    </Box>
  );
};

export default Card;
