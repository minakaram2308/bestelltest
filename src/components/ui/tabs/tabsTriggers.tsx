import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { css } from "styled-system/css";

interface TabsTriggerProps {
  value: string;
  label: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, label }) => {
  return (
    <Tabs.Trigger
      value={value}
      className={css({
        padding: "0.5rem 1rem",
        width:'100%',
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight:"bold",
        "&[data-state='active']": {
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          color:'rgba(79, 91, 243, 1)'

        },

      })}
   
    >
      {label}
    </Tabs.Trigger>
  );
};

export default TabsTrigger;
