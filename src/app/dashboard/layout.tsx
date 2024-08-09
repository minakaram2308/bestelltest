"use client";
import NavBar from "@/components/layouts/DashboardLayout/Navbar";
import SideBar from "@/components/layouts/DashboardLayout/Sidebar";
import React, { useState, useEffect } from "react";
import { css } from "styled-system/css";
import { Box, Grid } from "styled-system/jsx";


type LayoutProps = {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const [isExpanded, setIsExpanded] = useState<boolean | null>(null);
  useEffect(() => {
    setIsExpanded(window.innerWidth >= 768);
  }, []);
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  if (isExpanded === null) {
    return null; // or a loader if you want to render something while waiting
  }
  return (
    <Grid
      className={css({
        position: "relative",
        gap: 0,
        gridTemplateColumns: {
          base: "none",
          md: isExpanded ? "17% 1fr" : "94px 1fr",
        },
        transition: "all 75ms linear",
      })}
    >
        <SideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      <Box
        className={css({
          overflowX: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr",
        })}
      >
        <NavBar toggleSidebar={toggleSidebar} />
        <main className={css({ width: "100%"})}>{children}</main>
      </Box>
    </Grid>
  );
};

export default Layout;
