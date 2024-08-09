import { SelectContent, SelectRoot, SelectTrigger } from "@/components";
import { SelectItem, SelectValue } from "@radix-ui/react-select";
import React from "react";

export const DashboardSelect = () => {
  return (
    <SelectRoot>
      <SelectTrigger maxWidth="lg">
        <SelectValue placeholder="Diese Woche" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price">test 1</SelectItem>
        <SelectItem value="rating">test 2</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
};

export default DashboardSelect;
