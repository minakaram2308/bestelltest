"use client";
import { H1 } from "@/components/ui/Headings";

import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";

import { useLogin } from "@/hooks";
import {
  OrdersDetailsSection,
  OrdersSection,
  OverviewSection,
} from "@/features/dashboard/sections";

const Dashboard = () => {
  const { logout } = useLogin();

  return (
    <Flex p={{ base: "20px", lg: "2.5rem" }} flexDirection="column" gap="20px">
      <Box className={css({ mdDown: { display: "none" } })}>
        <H1>Dashboard</H1>
      </Box>
      <OverviewSection />
      <OrdersSection />
      <OrdersDetailsSection />
    </Flex>
  );
};

export default Dashboard;
