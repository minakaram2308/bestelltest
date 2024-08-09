"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { css } from "styled-system/css";
import { Share1Icon, Pencil1Icon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { Card, Icon, InputWithIcon } from "@/components";
import Tabs from "@/features/dashboard/sections/tabs/tabs";
import { useProduct } from "@/hooks/useProducts/getProduct";
import { Box, Flex } from "styled-system/jsx";
import Link from "next/link";
import H2 from "@/components/ui/Headings/H2";
import productDetailsOne from '@/features/dashboard/sections/productsDetailsAssets/productDetailsS1';
import productDetailsTWo from '@/features/dashboard/sections/productsDetailsAssets/productDetailsS2';
import productDetailsThree from '@/features/dashboard/sections/productsDetailsAssets/productDetailsS3';
import priceSection from './price'
import specialPrice from "./specialPrice";
const styles = {
  container: css({
    width: '100%',
    backgroundColor: "rgb(252, 252, 249)",
    color: "#333",
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    padding: "40px",
  }),
  mainInfo: css({
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "80px",
  }),
  imageSection: css({
    width: "50%", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  infoSection: css({
    width: "50%", 
    display: "flex",
    flexDirection: "column",
  }),
  image: css({
    width: "100%",
    borderRadius: "8px",
  }),
  title: css({
    fontSize: "64px",
    fontWeight: "bold",
    color: "black",
  }),
  price: css({
    fontSize: "36px",
    color: "rgba(48, 178, 140, 1)!important",
    fontWeight: 500,
    marginTop: 2,
  }),
  subPrice: css({
    fontSize: "1rem",
    fontWeight: 500,
    color: "rgba(127, 133, 150, 1)",
  }),
  buttonContainer: css({
    display: "flex",
    gap: "32px",
    marginBottom: "64px",
  }),
  button: css({
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
  }),
  editButton: css({
    background: "rgba(79, 91, 243, 1)",
    color: "white",
    gap: '10px',
    marginTop: '24px',
  }),
  shareButton: css({
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "rgba(111, 118, 126, 1)",
    cursor: "pointer",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
  }),
  section: css({
    marginTop: "0px",
  }),
  sectionTitle: css({
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "black",
  }),
  description: css({
    marginTop: 2,
    color: "gray",
  }),
  details: css({
    display: "flex",
    justifyContent: "space-between",
    marginTop: 2,
    color: "black",
  }),
  stock: css({
    backgroundColor: "rgba(79, 91, 243, 0.2)",
    padding: 4,
    marginTop: 2,
    borderRadius: "8px",
  }),
  stockDetails: css({
    display: "flex",
    justifyContent: "space-between",
    marginTop: 2,
  }),
  paddingBorder: css({
    background: "rgba(231, 231, 225, 1)",
    margin: "40px auto",
    height: '2px',
    display: 'block',
    width: '80%',
    border: 'none',
  }),
};

const ProductDetails: FC = () => {
  const params = useParams();
  const id = params?.id; // Assuming the dynamic route is [id]
  const { fetchProduct, loading, error, data } = useProduct(id as string);
  const [product, setProduct] = useState<any>(null);
  const tabs = useMemo(
    () => [
      { label: 'Kategorie', value: 'section_1', Component: productDetailsOne },
      { label: 'Verkaufspreis', value: 'section_2', Component: priceSection },
      { label: 'Sonderpreis', value: 'section_3', Component: specialPrice },
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
    <Flex flexDirection="column">
      <Flex justifyContent="flex-start" alignItems="center" padding={'40px'} margin={'0px'} backgroundColor={'rgb(252, 252, 249)'}>
        <Link href={'/products'}>
          <ArrowLeftIcon width={32} height={32} />
        </Link>
        <H2 className={'ml-30'}>Artikeldetails</H2>
      </Flex>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img
            className={styles.image}
            src={product.image || "/path/to/default-image.png"}
            alt={product.title}
          />
          <Tabs tabs={tabs} product={product} />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.mainInfo}>
            <h1 className={styles.title}>{product.title}</h1>
            <div>
              <p className={styles.price}>{product.price} €</p>
              <p className={styles.subPrice}>{product.singularPrice} €/1,0 Kg</p>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.editButton}`}>
              <Pencil1Icon />
              Artikel bearbeiten
            </button>
            <button className={`${styles.button} ${styles.shareButton}`}>
              <Share1Icon />
            </button>
          </div>

          <div className={`${styles.section} mb-64`}>
            <h2 className={styles.sectionTitle}>Beschreibung</h2>
            <p className={styles.description}>
              {product.description ||
                `Lorem ipsum odor amet, consectetuer adipiscing elit. Natoque ultrices aliquam venenatis efficitur sapien. Faucibus ac adipiscing tellus nisl maecenas vivamus justo; turpis litora. Tellus ante vehicula suspendisse fermentum nulla vestibulum adipiscing. Scelerisque netus odio sagittis nam finibus habitant. Per risus neque dolor ad vel hac rutrum.
                us laoreet sed odio. Phasellus malesuada molestie himenaeos commodo porttitor iaculis.`}
            </p>
          </div>

          <div className={`${styles.section} `}>
            <h2 className={styles.sectionTitle}>Artikeldetails</h2>
            <div className={styles.details}>
              <span>Artikelnummer</span>
              <span>{product.productNumber || "N/A"}</span>
            </div>
            <div className={styles.details}>
              <span>Mindestbestand</span>
              <span>{product.threshold}</span>
            </div>
            <div className={styles.details}>
              <span>Steuersatz</span>
              <span>{product.tax}%</span>
            </div>
            <div className={styles.details}>
              <span>Hersteller</span>
              <span>{product.manufacturer || "N/A"}</span>
            </div>
            <div className={styles.details}>
              <span>Marke</span>
              <span>{product.market || "N/A"}</span>
            </div>
            <div className={styles.details}>
              <span>Sorte</span>
              <span>{product.sorte || "N/A"}</span>
            </div>
            <div className={styles.details}>
              <span>Barcode</span>
              <span>{product.barcode || "N/A"}</span>
            </div>
          </div>
          <hr className={styles.paddingBorder} />
          <div className={`${styles.section} mb-64`}>
            <h2 className={styles.sectionTitle}>Lagerbestand</h2>
            <div className={styles.stock}>
              <div className={styles.stockDetails}>
                <span>Verfügbare Menge</span>
                <span>{product.quantity}</span>
              </div>
              <div className={styles.stockDetails}>
                <span>Mindestbestand</span>
                <span>{product.threshold}</span>
              </div>
            </div>
            {product.quantityDetails &&
              product.quantityDetails.map((detail, index) => (
                <div key={index} className={styles.stock}>
                  <div className={styles.stockDetails}>
                    <span>Bestand {index + 1}</span>
                    <span>{detail.qte}</span>
                  </div>
                  <div className={styles.stockDetails}>
                    <span>Mindesthaltbarkeitsdatum (MHD)</span>
                    <span>{detail.end}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default ProductDetails;
