"use client";
import React from "react";
import { H1 } from "@/components/ui/Headings";
import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { Button } from "@/components";
import ProductsManagementSection from "@/features/dashboard/sections/ProductsMangementSection";
import InfoCards from "@/features/dashboard/sections/InfoCard/infoCard";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import H2 from "@/components/ui/Headings/H2";

// Custom styles
const buttonStyle = css({
  backgroundColor: '#5865F2',
  color: '#fff',
  border: '1px solid #5865F2',
  borderRadius: '8px',
  padding: '10px 20px', 
  height: '50px', 
  width: 'auto!important',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const buttonTextStyle = css({
  fontSize: '1rem',
  fontWeight: '700',
});

const Products = () => {
  const { logout } = useLogin();

  return (
    <Flex p={{ base: "20px", lg: "2.5rem" }} flexDirection="column" gap="20px">
      <Box className={css({ mdDown: { display: "none" } })}>
        <Flex justifyContent="flex-start" alignItems="center" gap="16px">

            <Link href={'/products'}><ArrowLeftIcon width={32} height={32}/></Link>
          <H2>Preise & Lagerbestände aktualisieren</H2>
       
        </Flex>
      </Box>

      <ProductsManagementSection update={true} />
    </Flex>
  );
};

export default Products;
