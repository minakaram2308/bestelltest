import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

interface TabsContentProps {
  tabs: Array<{ value: string; Component: React.ComponentType<any> }>;
}

const TabsContent: React.FC<TabsContentProps> = ({ tabs }) => {
  return (
    <>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value}>
          <tab.Component />
        </Tabs.Content>
      ))}
    </>
  );
};

export default TabsContent;
