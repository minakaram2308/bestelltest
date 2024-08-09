import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { css } from "styled-system/css";
import { Flex } from "styled-system/jsx";

interface TabsListProps {
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <Tabs.List
      className={css({
        base: { marginBottom: "3rem" },
        md: { marginBottom: "4rem" },
      })}
    >
      <Flex
        gap={4}
        alignItems="center"
        background="#E7E7E1"
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
