import { Avatar, Button, Card, Icon, Link } from "@/components";
import React from "react";
import { css } from "styled-system/css";
import { Flex, Box, engine, VStack } from "styled-system/jsx";

export const Order = ({ orderData }: { orderData: any }) => {
  const {
    owner,
    orderId,
    orderCount,
    orderType,
    orderPaymentType,
    orderDeliveryDate,
    orderDeliveryTime,
    totalPrice,
  } = orderData;
  const { ownerName, ownerLocation, ownerAvatar } = owner;
  return (
    <Card className="secondaryBg">
      <Flex flexDir="column" gap="2.5rem">
        {/* owner details */}
        <Flex justifyContent="space-between" fontWeight="semibold">
          <Flex gap={4}>
            <engine.span width="[40px]" height="[40px]" rounded="50%">
              <Avatar src={ownerAvatar} />
            </engine.span>
            <VStack alignItems="start" gap={0} lineHeight={1.2}>
              <engine.p fontSize="[20px]">{ownerName}</engine.p>
              <engine.span fontSize="[14px]" color="disabled-text">
                {ownerLocation.street}
              </engine.span>
              <engine.span fontSize="[14px]" color="disabled-text">
                {ownerLocation.state}
              </engine.span>
            </VStack>
          </Flex>
          <Link
            className={css({
              color: "primary",
              _hover: { textDecoration: "underline" },
            })}
            href="#"
          >
            Bestelldetails {">"}
          </Link>
        </Flex>
        {/* order details */}
        <VStack alignItems="start" w="100%">
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <engine.p color="disabled-text">Bestellung-ID</engine.p>
            <engine.p color="disabled-text">{orderId}</engine.p>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <engine.p color="disabled-text">Bestellte Artikel</engine.p>
            <engine.p color="disabled-text">{orderCount} Artikel</engine.p>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <engine.p color="disabled-text">Bestellungsart</engine.p>
            <engine.p color="disabled-text">{orderType}</engine.p>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <engine.p color="disabled-text">Zahlungsstatus</engine.p>
            <engine.p color="disabled-text">{orderPaymentType}</engine.p>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <engine.p color="disabled-text">Zustellungsdatum</engine.p>
            <engine.p color="disabled-text">{orderDeliveryDate}</engine.p>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <engine.p color="disabled-text">Uhrzeit</engine.p>
            <engine.p color="disabled-text">
              {orderDeliveryTime || "-"}
            </engine.p>
          </Flex>
        </VStack>
        {/* order price */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          color="primary-background"
          fontWeight="bold"
        >
          <engine.p>Gesamt in € (Brutto)</engine.p>
          <engine.p>{totalPrice}</engine.p>
        </Flex>
        {/* Order CTA's */}
        <Flex
          alignItems="center"
          gap={3}
          w="100%"
          color="primary-background"
          fontWeight="bold"
        >
          <Button variant="secondary" style={{padding: '0.5rem'}}> 
            <Icon icon="heroicons:x-mark" mr="0.5rem" fontSize="22px" />{" "}
            Ablehnen
          </Button>
          <Button variant="teritary" style={{padding: '0.5rem'}}>
            <Icon icon="quill:checkmark" mr="0.5rem" fontSize="22px" /> Annehmen
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Order;
