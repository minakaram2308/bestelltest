import { ChildrenT } from "@/types";
import React from "react";
import { css, cx } from "styled-system/css";

const H3Styles = css({
  fontSize: { base: "16px", md: "20px" },
  fontWeight: "semibold",
  color: { base: "primary-background", _dark: "white" },
});
export const H3 = ({
  children,
  className,
}: {
  children: ChildrenT;
  className?: string;
}) => {
  const mergedClasses = cx(H3Styles, className);
  return <h3 className={mergedClasses}>{children}</h3>;
};

export default H3;
