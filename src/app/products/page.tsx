"use client";

import React, { useState, useEffect } from "react";
import { H1 } from "@/components/ui/Headings";
import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { Button } from "@/components";
import ProductsManagementSection from "@/features/dashboard/sections/ProductsMangementSection";
import InfoCards from "@/features/dashboard/sections/InfoCard/infoCard";
import { useFilteredProducts } from '@/hooks/useProducts/getProducts.ts';
import ProductDetails from "./[id]/page.tsx";

const buttonStyle = css({
  backgroundColor: "#5865F2",
  color: "#fff",
  border: "1px solid #5865F2",
  borderRadius: "8px",
  padding: "10px 20px",
  height: "50px",
  width: "auto!important",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const buttonTextStyle = css({
  fontSize: "1rem",
  fontWeight: "700",
});


const sectionColumns = {
  all: [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Verkaufspreis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "Reserviert",
    "MwSt",
    "Bestand",
    "Mhd",
  ],
  "Ausverkaufte Artikel": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbare Menge"
  ],
  "Archivierte Artikel": [
    "Art.-Nr.",
    "Bezeichnung",
    "Preis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "MwSt",
    "Bestand",
  ],
  "Beliebte Artikel": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Verkaufspreis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "Reserviert",
    "MwSt",
    "Verfügbare Menge",
    "Mhd",
  ],
  "Neu im Sortiment": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Verkaufspreis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "Reserviert",
    "MwSt",
    "Verfügbare Menge",
    "Mhd",
  ],
  "MHD aktualisieren": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbare Menge",
    "Mindesthaltbarkeitsdatum (MHD)",
  ],
  "Bestand nachfüllen": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Verkaufspreis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "MwSt",
    "Verfügbare Menge",
    "Mhd"
  ],
};
const Products = () => {
  const { logout } = useLogin();
  const [sectionTitle, setSectionTitle] = useState('Alle Artikel');
  const [activeTab, setActiveTab] = useState('FOOD');
  const [sectionIndex, setSectionIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('ALL');
  const [title, setTitle] = useState<string>('ALL');
  const [columns, setColumns] = useState<string[]>(sectionColumns.all);
  const [categoryLengths, setCategoryLengths] = useState<{ [key: string]: number }>({
    ALL: 0,
    RESTOCK: 0,
    OUTSTOCK: 0,
    ARCHIVE: 0,
    POPULAR: 0,
    NEW: 0,
    EXPIRED: 0,
  });

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };


  const allProducts = useFilteredProducts({ filterType: 'ALL', category: activeTab });
  const restockProducts = useFilteredProducts({ filterType: 'RESTOCK', category: activeTab });
  const outStockProducts = useFilteredProducts({ filterType: 'OUTSTOCK', category: activeTab });
  const archiveProducts = useFilteredProducts({ filterType: 'ARCHIVE', category: activeTab });
  const popularProducts = useFilteredProducts({ filterType: 'POPULAR', category: activeTab });
  const newProducts = useFilteredProducts({ filterType: 'NEW', category: activeTab });
  const expiredProducts = useFilteredProducts({ filterType: 'EXPIRED', category: activeTab });

  const allProductsNon = useFilteredProducts({ filterType: 'ALL', category: 'NON_FOOD' });
  const restockProductsNon = useFilteredProducts({ filterType: 'RESTOCK', category: 'NON_FOOD' });
  const outStockProductsNon = useFilteredProducts({ filterType: 'OUTSTOCK', category: 'NON_FOOD' });
  const archiveProductsNon = useFilteredProducts({ filterType: 'ARCHIVE', category: 'NON_FOOD' });
  const popularProductsNon = useFilteredProducts({ filterType: 'POPULAR', category: 'NON_FOOD' });
  const newProductsNon = useFilteredProducts({ filterType: 'NEW', category: 'NON_FOOD' });
  const expiredProductsNon = useFilteredProducts({ filterType: 'EXPIRED', category: 'NON_FOOD' });

  useEffect(() => {
    setCategoryLengths({
      ALL: (allProducts.products?.length || 0) + (allProductsNon.products?.length || 0),
      RESTOCK: (restockProducts.products?.length || 0) + (restockProductsNon.products?.length || 0),
      OUTSTOCK: (outStockProducts.products?.length || 0) + (outStockProductsNon.products?.length || 0),
      ARCHIVE: (archiveProducts.products?.length || 0) + (archiveProductsNon.products?.length || 0),
      POPULAR: (popularProducts.products?.length || 0) + (popularProductsNon.products?.length || 0),
      NEW: (newProducts.products?.length || 0) + (newProductsNon.products?.length || 0),
      EXPIRED: (expiredProducts.products?.length || 0) + (expiredProductsNon.products?.length || 0),
    });
  }, [
    allProducts.products,
    restockProducts.products,
    outStockProducts.products,
    archiveProducts.products,
    newProducts.products,
    newProducts.products,
    expiredProducts.products,
  ]);

  useEffect(() => {
    let filterType = 'ALL';

    switch (selectedSection) {
      case 'Bestand nachfüllen':
        filterType = 'RESTOCK';
        setColumns(sectionColumns[""]);
        setSectionTitle('Bestand nachfüllen');
        break;
      case 'Ausverkaufte Artikel':
        filterType = 'OUTSTOCK';
        setColumns(sectionColumns["Ausverkaufte Artikel"]);
        setSectionTitle('Ausverkaufte Artikel');
        break;
      case 'Archivierte Artikel':
        filterType = 'ARCHIVE';
        setColumns(sectionColumns["Archivierte Artikel"]);
        setSectionTitle('Archivierte Artikel');
        break;
      case 'Beliebte Artikel':
        filterType = 'POPULAR';
        setColumns(sectionColumns["Beliebte Artikel"]);
        setSectionTitle('Beliebte Artikel');
        break;
      case 'Neu im Sortiment':
        filterType = 'NEW';
        setColumns(sectionColumns["Neu im Sortiment"]);
        setSectionTitle('Neu im Sortiment');
        break;
      case 'MHD aktualisieren':
        filterType = 'EXPIRED';
        setColumns(sectionColumns["MHD aktualisieren"]);
        setSectionTitle('MHD aktualisieren');
        break;
      default:
        filterType = 'ALL';
        setColumns(sectionColumns.all);
        setSectionTitle('Alle Artikel');
    }

    setTitle(filterType);
  }, [selectedSection]);

  return (
    <Flex p={{ base: "20px", lg: "2.5rem" }} flexDirection="column" gap="20px">
      <Box className={css({ mdDown: { display: "none" } })}>
        <Flex justifyContent="space-between" alignItems="center" gap="16px">
          <H1>Artikel</H1>
          <Flex justifyContent="space-between" alignItems="center" gap="16px">
            <Link href="/updateProducts" passHref>
              <Button className={`${buttonStyle} transparent-button`}>
                <span className={buttonTextStyle}>
                  Preise & Lagerbestände aktualisieren
                </span>
              </Button>
            </Link>
            <Link href="/addProduct" passHref>
              <Button className={buttonStyle}>
                <span className={buttonTextStyle}>+ Artikel</span>
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <InfoCards
        sectionIndex={sectionIndex}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
        categoryLengths={categoryLengths}
      />
      <ProductsManagementSection
        update={false}
        quantity={categoryLengths[title]?.toString()}
        productTitle={sectionTitle}
        selectedSection={selectedSection}
        category={activeTab}
      />
      <ProductDetails />
    </Flex>
  );
};

export default Products;
