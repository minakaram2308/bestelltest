"use client";
import NavBar from "@/components/layouts/DashboardLayout/Navbar";
import SideBar from "@/components/layouts/DashboardLayout/Sidebar";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { css } from "styled-system/css";
import { Box, Grid } from "styled-system/jsx";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  // Define a function to check if the current route matches the hideSidebarRoutes pattern
  const shouldHideSidebar = pathname.startsWith('/products/');

  return (
    <Grid
      className={css({
        position: "relative",
        height: "100vh",
        gap: 0,
        background: "darkGray",
        gridTemplateColumns: {
          base: "none",
          md: shouldHideSidebar ? "1fr" : isExpanded ? "18% 1fr" : "94px 1fr",
        },
        transition: "all 75ms linear",
      })}
    >
      {!shouldHideSidebar && (
        <SideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      )}

      <Box
        className={css({
          overflowX: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr",
        })}
      >
        <NavBar />
        <main className={css({ width: "100%" })}>{children}</main>
      </Box>
    </Grid>
  );
};

export default Layout;
