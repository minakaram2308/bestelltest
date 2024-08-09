"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { css } from "styled-system/css";
import { Share1Icon, Pencil1Icon, ArrowLeftIcon } from "@radix-ui/react-icons";
import Tabs from "@/features/dashboard/sections/tabs/tabs";
import { useProduct } from "@/hooks/useProducts/getProduct";
import { Box, Flex } from "styled-system/jsx";
import Link from "next/link";
import H2 from "@/components/ui/Headings/H2";
import productDetailsOne from '@/features/dashboard/sections/productsDetailsAssets/productDetailsS1';
import productDetailsTWo from '@/features/dashboard/sections/productsDetailsAssets/productDetailsS2';
import productDetailsThree from '@/features/dashboard/sections/productsDetailsAssets/productDetailsS3';
import priceSection from './price'
import Individual from "./productDetailsComponents/individual";
import Groups from "./productDetailsComponents/group";

const ProductDetails: FC = () => {
  const params = useParams();
  const id = params?.id; // Assuming the dynamic route is [id]
  const { fetchProduct, loading, error, data } = useProduct(id as string);
  const [product, setProduct] = useState<any>(null);
  const tabs = useMemo(
    () => [
      { label: 'Individuell', value: 'individual', Component: Individual },
      { label: 'Artikelgruppen', value: 'groups', Component: Groups },
      
    ],
    []
  );

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProduct();
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, fetchProduct]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!product) return <p>No product found.</p>;

  return (
    <Flex flexDirection="column mt-40" >
             <Tabs tabs={tabs} product={product} />
    </Flex>
  );
};

export default ProductDetails;
