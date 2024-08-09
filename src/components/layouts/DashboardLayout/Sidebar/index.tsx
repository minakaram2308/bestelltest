"use client";
import React, { useState } from "react";
import { css } from "styled-system/css";
import { Flex, engine } from "styled-system/jsx";
import { Button, Icon, Link, NavLink } from "@/components";
import { Switch } from "@/components/ui";
import { sideBarItem, sideBarItems } from "./items";
import classNames from "classnames";

export const SideBar = ({
  isExpanded,
  toggleSidebar,
}: {
  isExpanded: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const wrapperClasses = css({
    // display: "flex",
    position: { base: "absolute", md: "unset" },
    left: isExpanded ? { base: "0 !important", md: "unset !important" } : { base: "-100% !important", md: "unset !important" },
    flexDirection: "column",
    alignItems: "start",
    height: "100%",
    width: isExpanded ? { base: "60%", md: "100%" } : { base: "0", md: "94px" },
    transition: { base: "left 0.2s ease-in-out", md: "width 0.2s ease-in-out" },
    gap: "0.5rem",
    padding: { base: "1.5rem 1rem", md: "0.5rem", lg: "1.5rem 1.5rem" },
  });
  const itemClasses = css({
    p: isExpanded ? { base: "3", md: 3 } : "0.75rem 0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: !isExpanded
      ? { base: "center", lgDown: "center" }
      : "start",
    borderRadius: "hug-md",
    fontWeight: "semibold",
    fontSize: "15px",
    cursor: "pointer",

    _hover: {
      boxShadow: "0px 2px 4px 0px #00000014",
      bgColor: "#F7F7F0",
      transition: "all 75ms ease-out",
      color: "primary-background",
      fill: "primary-background",
    },
  });

  const responsiveExpansion = css({
     display: isExpanded ? "block" : "none" });
  return (
    <Flex className={classNames("secondaryBg", wrapperClasses)}>
      <Flex width="100%">
        <Flex flexDir="column" width="100%" className={responsiveExpansion}>
          <p
            className={css({
              fontWeight: "bold",
              color: "secondary",
              textTransform: "capitalize",
              truncate: true,
            })}
          >
            vendor name
          </p>
          <span
            className={css({
              color: isOnline ? "primary" : "secondary",
              fontWeight: "bold",
            })}
          >
            {isOnline ? "Aktiviert" : "not Aktiviert"}
          </span>
        </Flex>

        <Switch
          checked={isOnline}
          setChecked={setIsOnline}
          // name="isOnline"
          // control={control}
        />
      </Flex>
      {/* items wrapper */}
      <ul
        className={css({
          w: "100%",
          flexDirection: "column",
          gap: "8px",
          mt: "8",
          display: "flex",
        })}
      >
        {/* items */}
        {sideBarItems?.map((item: sideBarItem) => {
          return (
            <li key={item.value}>
              <NavLink
                activeClasses={"activeLink"}
                className={itemClasses}
                exact={item?.value === "dashboard"}
                href={`/${item?.value}`}
              >
                <Flex
                  alignItems="center"
                  className={css({
                    justifyContent: "space-between",
                  })}
                  width="100%"
                >
                  <Flex
                    gap={3}
                    alignItems="center"
                    mdDown={{ justifyContent: "center" }}
                  >
                    <Icon icon={item.icon} width="24px" height="24px" />
                    <span className={responsiveExpansion}>{item.label}</span>
                  </Flex>
                  <span className={responsiveExpansion}>
                    {item?.subItems && (
                      <Button variant="icon" size="icon">
                        +
                      </Button>
                    )}
                    {item?.itemsCount && (
                      <Button
                        variant="icon"
                        disabled
                        size="icon"
                        className="itemsCount"
                      >
                        {item?.itemsCount}
                      </Button>
                    )}
                  </span>
                </Flex>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <Flex
        className={css({
          base: { display: "none" },
          md: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: "1rem",
            mb: "8",
          },
          lg: {
            justifyContent: "flex-end",
          },
        })}
      >
        <Button
          variant="teritary"
          size="icon"
          className={css({
            padding: "6px 0",
            borderRadius: "50%",
            color: "teritary",
            borderColor: "teritary",
            borderWidth: "2px",
          })}
          onClick={() => toggleSidebar((prev) => !prev)}
        >
          {isExpanded ? (
            <Icon
              icon="carbon:chevron-left"
              fontSize={"22px"}
              fontWeight={"bolder"}
              color={"#4F5BF3"}
            />
          ) : (
            <Icon
              icon="carbon:chevron-right"
              fontSize={"22px"}
              fontWeight={"bold"}
              color={"#4F5BF3"}
            />
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default SideBar;
