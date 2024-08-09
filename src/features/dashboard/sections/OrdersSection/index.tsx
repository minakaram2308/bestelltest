"use client";
import { Card } from "@/components";
import { H3, H6 } from "@/components/ui/Headings";
import React, { useState } from "react";
import { Flex, Grid, engine } from "styled-system/jsx";
import { css, cx } from "styled-system/css";
import { orderSectionItems } from "./items";
import classNames from "classnames";

const gridStyles = css({
  base: {
    gridTemplateColumns: "2",
    mt: "10px",
  },
  lg: {
    gridTemplateColumns: "3",
    mt: "20px",
  },
});

export const OrdersSection = () => {
  const [selectedOrderType, setSelectedOrderType] = useState("newly_released");
  const handleClick = (type: string) => {
    setSelectedOrderType(type);
  };
  return (
    <section>
      <Card className="secondaryBg">
        <Flex justifyContent="space-between" alignItems="center">
          <H3>
            Bestellungen
            <span style={{ color: "#7F8596" }}> | {selectedOrderType}</span>
          </H3>
        </Flex>
        <Grid className={gridStyles}>
          {orderSectionItems.map((item) => {
            const isActive = item?.value === selectedOrderType;
            return (
              <Flex
              className={`orderBox ${isActive ? 'ActiveorderBox' : ''}`}
                key={item.value}
                onClick={(e) => handleClick(item?.value)}
              >
                <H6>Neue Bestellungen </H6>
                <Flex justifyContent="space-between" alignItems="center">
                  <engine.p fontWeight="semibold" fontSize="24px">
                    4
                  </engine.p>
                </Flex>
              </Flex>
            );
          })}
        </Grid>
      </Card>
    </section>
  );
};

export default OrdersSection;
