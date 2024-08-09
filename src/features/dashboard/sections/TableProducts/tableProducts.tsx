import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from "@/components/tables/tableFood"; // Adjust the import based on your file structure
import { TableRowData } from './types'; // Adjust the import based on your file structure
import { useFilteredProducts } from '@/hooks/useProducts/getProducts'; // Adjust the import based on your file structure

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
    "Verfügbare Menge",
     ""
  ],
  "Archivierte Artikel": [
    "Art.-Nr.",
    "Bezeichnung",
    "Preis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "MwSt",
    "Bestand",
     ""
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
     ""
  ],
  "Bestand nachfüllen": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Verkaufspreis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "MwSt",
    "Verfügbare Menge",
    ""
  ],
};

const TableProducts: React.FC<{ selectedSection: string, selectedTab: string }> = ({ selectedSection, selectedTab }) => {
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [title, setTitle] = useState<string>('ALL');
  const [columns, setColumns] = useState<string[]>(sectionColumns.all);
  const router = useRouter(); // Use the new useRouter hook from next/navigation

  useEffect(() => {
    let filterType = 'ALL';
console.log(columns)
    switch (selectedSection) {
      case 'Bestand nachfüllen':
        filterType = 'RESTOCK';
        setColumns(sectionColumns["Bestand nachfüllen"]);
        break;
      case 'Ausverkaufte Artikel':
        filterType = 'OUTSTOCK';
        setColumns(sectionColumns["Ausverkaufte Artikel"]);
        break;
      case 'Archivierte Artikel':
        filterType = 'ARCHIVE';
        setColumns(sectionColumns["Archivierte Artikel"]);
        break;
      case 'Beliebte Artikel':
        filterType = 'POPULAR';
        setColumns(sectionColumns["Beliebte Artikel"]);
        break;
      case 'Neu im Sortiment':
        filterType = 'NEW';
        setColumns(sectionColumns["Neu im Sortiment"]);
        break;
      case 'MHD aktualisieren':
        filterType = 'EXPIRED';
        setColumns(sectionColumns["MHD aktualisieren"]);
        break;
      default:
        filterType = 'ALL';
        setColumns(sectionColumns.all);
    }

    setTitle(filterType);
  }, [selectedSection]);

  const { loading, error, products } = useFilteredProducts({ filterType: title, category: selectedTab });

  const onRowClick = (id: string) => {
    router.push(`/products/${id}`); // Navigate to the product detail page
  };

  useEffect(() => {
    if (products) {
      // Determine which list to map over
      const productList = products.getPopularProducts || products.getNewProducts || products;
      console.log(productList)
      const formattedData = productList.map(product => ({
         id: product.id,
        artNr: product.productNumber,
        image: product.image, // Include the image URL
        bezeichnung: product.title,
        verFugbarkeit: selectedSection === 'ALL'? 'Erhätlich' :selectedSection === 'Bestand nachfüllen'? 'Niedrig':selectedSection === 'Ausverkaufte Artikel' ? 'Ausverkauft':selectedSection === 'Archivierte Artikel'?'Ausgeblendet':'Erhätlich',
        preisNetto: `${product.price}€`,
        verkaufspreisEinzel: `${product.price}€`,
        reserviert: product.orderedQuantity || 0,
        mwSt: `${product.tax}%`,
        verfügbareMenge:`${product.quantity}` ,
        bestand: product.quantity || 0,
        mhd: product.endDate || 0,
        mindesthaltbarkeitsdatum:product.endData,
        endDate: product.quantityDetails ? product.quantityDetails.map(qd => qd.end).join(', ') : '',
      }));
      
      setTableData(formattedData);
    }
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div>
      <Table columns={columns} currentCategory={selectedSection} data={tableData} onRowClick={onRowClick} />
    </div>
  );
};

export default TableProducts;
