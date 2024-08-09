"use client";
import NavBar from "@/components/layouts/DashboardLayout/Navbar";
import React from "react";
import { css } from "styled-system/css";
import { Box, Grid } from "styled-system/jsx";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      className={css({
        position: "relative",
        height: "100vh",
        gap: 0,
        background: "darkGray",
        gridTemplateColumns: {
          base: "none",
          md:"1fr" ,
        },
        transition: "all 75ms linear",
      })}
    >
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
