import React, { useEffect, useState } from 'react';
import Table from "@/components/tables/tableFood";
import { TableRowData } from './types';
import { useFilteredProducts } from '@/hooks/useProducts/getProducts';
import SubTable from '@/components/tables/subTable';

const columns = [
  "Art.-Nr.",
  "Bezeichnung",
  "Verfügbarkeit",
  "Preis (Netto)",
  `Verkaufspreis
   Einzel (Netto)`,
  "Reserviert",
  "MwSt",
  "Bestand",
  "MHD",
];

const UpdateNonFoodTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const {  loading, error, products } = useFilteredProducts({ category: 'NON_FOOD', pageNo: 0, pageSize: 10 });

  useEffect(() => {
    if (products) {
      const formattedData = products.map(product => ({
        artNr: product.id,
        image: product.image,
        bezeichnung: product.title,
        details: product.description, 
        verFugbarkeit: "Erhältlich", 
        preisNetto: `${product.price}€`,
        verkaufspreisEinzel: `${product.price}€`,
        reserviert: "4", // Placeholder, replace with actual data if available
        mwSt: "7%", // Placeholder, replace with actual data if available
        bestand: "500", // Placeholder, replace with actual data if available
        mhd: "22.02.2024", // Placeholder, replace with actual data if available
      }));
      setTableData(formattedData);
    }
    console.log(tableData)
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div>
      <SubTable  data={tableData} />
    </div>
  );
};

export default UpdateNonFoodTable;
