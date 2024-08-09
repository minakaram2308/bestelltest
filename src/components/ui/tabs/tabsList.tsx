import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { css } from "styled-system/css";
import { Flex } from "styled-system/jsx";

interface TabsListProps {
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <Tabs.List className={css({ width: "100%" })}>
      <Flex
        gap={4}
        alignItems="center"
        background="rgba(243, 243, 240, 1)"
        fontWeight="400"
        borderRadius="8px"
        transition="colors 150ms ease-in-out"
        padding="4px"
      >
        {children}
      </Flex>
    </Tabs.List>
  );
};

export default TabsList;
