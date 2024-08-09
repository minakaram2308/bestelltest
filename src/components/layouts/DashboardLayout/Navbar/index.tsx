"use client ";
import React, { useEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { css } from "styled-system/css";
import { Box, Flex, HStack } from "styled-system/jsx";
import * as Switch from "@radix-ui/react-switch";
import { Button, Icon, InputWithIcon } from "@/components/wrappers";
import classNames from "classnames";

export const NavBar = ({
  toggleSidebar,
}: {
  toggleSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const searchClasses = css({
    borderRadius: "hug-lg",
    padding: "0.8rem",
    minWidth: { base: "auto", lg: "344px" },
    border: "none",
  });
  const navClasses = css({
    padding: { base: "1rem", lg: "1.5rem 2.5rem" },
    position: "sticky",
    top: "0",
    right: "0",
    zIndex: 5,
    justifyContent: "space-between",
    gap: { base: 1, md: 5 },
    alignItems: "center",
    backgroundColor: theme === "light" ? "#ffffff" : "#1D1D25",
    color: theme === "light" ? "black" : "white",
  });
const isMob = window.innerWidth < 768;
  return (
    <Flex className={navClasses}>
      {/* left */}
      <Box className={css({ display: { base: "block", md: "none" } })}>
        <Button
          variant="icon"
          size="icon"
          onClick={() => toggleSidebar((prev) => !prev)}
        >
          <Icon icon="hugeicons:menu-02" fontSize="2xl" />
        </Button>
      </Box>

      <Box>
        <Button
          variant="outline"
          size="sm"
          color={"#ed8121"}
          className={css({
            padding: { base: "0.3rem", lg: "12px 20px" },
            backgroundColor: { base: "#ed8121 !important", md: "transparent !important" },
            borderRadius: { base: "50%", md: "12px" },
          })}
        >
          <Icon
            icon="akar-icons:plus"
            color={window.innerWidth < 768 ? "white" : "#ed8121"}
          />

          <Box className={css({ display: { base: "none", md: "block" } })}>
            create
          </Box>
        </Button>
      </Box>
      {/* center */}
      <Box>
      { isMob ?
        <Box>
          <Button variant="icon" size="icon">
            <Icon icon="mingcute:search-line" fontSize="3xl" />
          </Button>
        </Box>
          :
        <InputWithIcon
          placeholder="Search or type a command"
          icon={<Icon icon="mingcute:search-line" />}
          className={classNames(
            "primaryBg searchplaceholder b-none",
            searchClasses
          )}
        />
      }
       </Box>
      {/* right */}
      <HStack className={css({ base: { gap: 1 }, md: { gap: 5 } })}>
        <Box className="switch-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={toggleTheme}
            />
            <span className="slider">
              <span
                className={`icon icon-right ${theme === "light" ? "" : "hidden"}`}
              >
                <Icon icon="ph:sun-light" fontSize="lg" />
              </span>
              <span
                className={`icon icon-left ${theme === "light" ? "hidden" : ""}`}
              >
                <Icon icon="ph:moon-fill" fontSize="lg" />
              </span>
            </span>
          </label>
        </Box>

        <Box>
          <Button variant="icon" size="icon">
            <Icon icon="mage:eye-off" fontSize="2xl" />
          </Button>
        </Box>
        <Box>
          <Button variant="icon" size="icon">
            <Icon icon="mingcute:message-4-line" fontSize="2xl" />
          </Button>
        </Box>
        <Box>
          <Button variant="icon" size="icon">
            <Icon icon="mynaui:bell" fontSize="2xl" />
          </Button>
        </Box>
        <Avatar.Root
          className={css({
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          })}
        >
          <Avatar.Image
            className={css({
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            })}
            src="https://random-image-pepebigotes.vercel.app/api/random-image"
            alt="User Image"
          />
        </Avatar.Root>
      </HStack>
    </Flex>
  );
};

export default NavBar;
