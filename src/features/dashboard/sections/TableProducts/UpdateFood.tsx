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
  `Verkaufspreis Einzel (Netto)`,
  "Reserviert",
  "MwSt",
  "Bestand",
  "MHD",
];

const UpdateFoodTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const { loading, error, products } = useFilteredProducts({ category: 'FOOD', pageNo: 0, pageSize: 100 });

  useEffect(() => {
    if (products) {
      const formattedData = products.map(product => ({
        artNr: product.id,
        image: product.image || null, // Ensure image is either a URL or null
        bezeichnung: product.title,
        details: product.description, 
        verFugbarkeit: product.isExist ? "Erhältlich" : "Nicht verfügbar",
        preisNetto: `${product.price}€`,
        verkaufspreisEinzel: `${product.price}€`,
        reserviert: product.orderedQuantity ? product.orderedQuantity.toString() : "0",
        mwSt: product.tax ? `${product.tax}%` : "N/A",
        bestand: product.quantity ? product.quantity.toString() : "0",
        mhd: product.quantityDetails ? product.quantityDetails.map(qd => qd.end).join(', ') : 'N/A',
      }));
      setTableData(formattedData);
      console.log(tableData)
    }
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div>
      <SubTable data={products} columns={columns} />
    </div>
  );
};

export default UpdateFoodTable;
