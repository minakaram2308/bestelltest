"use client";
import { Card } from "@/components";
import { H3, H6 } from "@/components/ui/Headings";
import React, { useState } from "react";
import { Flex, Grid, HStack, VStack, engine } from "styled-system/jsx";
import { css } from "styled-system/css";
import { Order } from "../../components";

const gridStyles = css({
  base: {
    gridTemplateColumns: "2",
    gap: "[40px]",
    mt: "[20px]",
  },
  mdDown: {
    gridTemplateColumns: 1,
  },
});
const orderBoxStyles = {
  padding: { base: "20px", lgDown: "10px" },
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "hug-lg",
  gap: 2,
  cursor: "pointer",
};

const dummyOrderData = {
  owner: {
    ownerName: "KFC",
    ownerLocation: { street: "nozha", state: "cairo" },
    ownerAvatar: "https://random-image-pepebigotes.vercel.app/api/random-image",
  },
  orderId: "123",
  orderCount: 15,
  orderType: "delivery",
  orderPaymentType: "cash",
  orderDeliveryDate: "15-07-2024",
  orderDeliveryTime: "02:22pm",
  totalPrice: "5000",
};
export const OrdersDetailsSection = () => {
  return (
    <section>
      <Card className="secondaryBg">
        <Flex justifyContent="space-between" alignItems="center">
          <H3>
            Bestellungen
            <span style={{ color: "#7F8596" }}></span>
          </H3>
        </Flex>
        <Grid className={gridStyles}>
          <Card
            className='primaryBg'
          >
            <VStack gap={3} justifyItems="center" alignItems="center">
              <H6>Lieferung</H6>
              {/* listing of orders as the following component */}
              <Order orderData={dummyOrderData} />
            </VStack>
          </Card>
          <Card
           className='primaryBg'
          >
            <VStack gap={3} justifyItems="center" alignItems="center">
              <H6>Abholen</H6>
              {/* listing of orders as the following component */}
              <Order orderData={dummyOrderData} />
            </VStack>
          </Card>
        </Grid>
      </Card>
    </section>
  );
};

export default OrdersDetailsSection;
