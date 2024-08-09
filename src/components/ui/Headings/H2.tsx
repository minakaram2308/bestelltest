import { ChildrenT } from "@/types";
import React from "react";
import { css, cx } from "styled-system/css";

const H1Styles = css({
  fontSize: { base: "32px", md: "40px" },
  fontWeight: "bold",
  color: { base: "primary-background", _dark: "white" },
});
export const H1 = ({
  children,
  className,
}: {
  children: ChildrenT;
  className?: string;
}) => {
  const mergedClasses = cx(H1Styles, className);
  return <h1 className={mergedClasses}>{children}</h1>;
};

export default H1;
