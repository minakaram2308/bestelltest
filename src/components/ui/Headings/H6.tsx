import { ChildrenT } from "@/types";
import React from "react";
import { css, cx } from "styled-system/css";

const H6Styles = css({
  fontSize: { base: "18px" },
  fontWeight: "medium",
  color: { base: "primary-background", _dark: "white" },
});
export const H6 = ({
  children,
  className,
}: {
  children: ChildrenT;
  className?: string;
}) => {
  const mergedClasses = cx(H6Styles, className);
  return <h6 className={mergedClasses}>{children}</h6>;
};

export default H6;
