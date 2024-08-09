import { ChildrenProp } from "@/types";
import React from "react";
import { css } from "styled-system/css";
import { Flex } from "styled-system/jsx";
import classNames from 'classnames';

const StatisticsBoxStyles = css({
  base: {
    backgroundColor: "#4F5BF31A",
    padding: { base: "2rem", lgDown: "1rem" },
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "hug-lg",
    gap: { base: 4, lgDown: 2 },
    _dark: { bgColor: "wrappers-background.dark", color: "white" },
  },
});
export const StatisticsBox = ({ children }: ChildrenProp) => {
  return     <Flex className={classNames('StatisticsBox', StatisticsBoxStyles)}>{children}</Flex>;
};

export default StatisticsBox;
