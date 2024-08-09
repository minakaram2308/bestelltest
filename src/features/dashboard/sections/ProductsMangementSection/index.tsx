import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { css } from "styled-system/css";
import { Flex } from "styled-system/jsx";
import { H3 } from "@/components/ui/Headings";
import DynamicDropdown from "@/components/ui/Drobdown/index";
import NonFood from "@/features/dashboard/sections/TableProducts/NonFood";
import Food from "@/features/dashboard/sections/TableProducts/tableProducts";
import { Card, Icon, InputWithIcon } from "@/components";
import classNames from "classnames";
import TabsList from "@/components/ui/tabs/tabsList";
import TabsTrigger from "@/components/ui/tabs/tabsTriggers";
import * as Tabs from "@radix-ui/react-tabs";
import SearchResultItem from "./../search";
import { useProductsCategories } from "@/hooks/useProducts/getProductCategories";
import UpdateFoodTable from "../TableProducts/UpdateFood";
import { useFilteredProducts } from '@/hooks/useProducts/getProducts';

const searchClasses = css({
  borderRadius: "12px",
  padding: "16px",
  minWidth: { base: "auto", lg: "500px" },
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  fontSize: "1rem",
});

const subSearch = css({
  marginBottom: "10px",
});

const searchResultsContainerStyle = css({
  position: "absolute",
  top: "60px",
  left: "0",
  right: "0",
  zIndex: "1000",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  maxHeight: "400px",
  overflowY: "auto",
});

const buttonStyle = css({
  backgroundColor: "transparent",
  color: "#ff6600",
  border: "none",
  padding: "0",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

const buttonTextStyle = css({
  fontSize: "1rem",
  fontWeight: "700",
  color: "#ff6600",
});

const iconStyle = css({
  fontSize: "1.5rem",
  color: "#ff6600",
});

const tabsListStyle = css({
  display: 'flex',
  gap: '16px',
  padding: '8px',
  backgroundColor: '#f1f1f1',
  borderRadius: '8px',
});

const tabsTriggerStyle = css({
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  '&[data-state="active"]': {
    backgroundColor: '#ff6600',
    color: '#fff',
  },
});

interface SearchResult {
  artNr: string;
  image: string;
  name: string;
  price: string;
}

const sectionColumns = {
  all: [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Preis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "Reserviert",
    "MwSt",
    "Bestand",
    "MHD",
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
    "Bestand",
    "MHD",
  ],
  "Neu im Sortiment": [
    "Art.-Nr.",
    "Bezeichnung",
    "Verfügbarkeit",
    "Verkaufspreis (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "Reserviert",
    "MwSt",
    "Bestand",
    "MHD",
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
    "Verfügbarkeit (Netto)",
    "Verkaufspreis Einzel (Netto)",
    "Verfügbare Menge"
  ],
};

const sortOptions = [
  { label: 'Most Sold (Ascending)', value: 'MOST_SOLD_ASC' },
  { label: 'Most Sold (Descending)', value: 'MOST_SOLD_DESC' },
];

const ProductsManagementSection: React.FC<{
  update?: boolean;
  quantity?: string;
  productTitle?: string;
  selectedSection?: string;
}> = ({ update, productTitle, quantity, selectedSection }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState("FOOD");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const { fetchProductsCategories, loading, error, data } = useProductsCategories("EN", selectedTab === "FOOD");
  
  // const { loading: productsLoading, error: productsError, products } = useFilteredProducts({
  //   filterType: selectedSection,
  //   category: selectedCategory,
    
  //   searchWord: searchQuery,
  //   sortBy: sort,
  //   pageNo: 0,
  //   pageSize: 100,
  // });

  useEffect(() => {
    const loadCategories = async () => {
      console.log(data)
      try {
        const categories = await fetchProductsCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      selectedTab === "FOOD" ? 'FOOD' : 'NON_FOOD'
    );
  }, [categories, selectedTab, data]);

  const tabs = useMemo(
    () => [
      { label: "Food", value: "FOOD", Component: Food },
      { label: "Non Food", value: "NON_FOOD", Component: NonFood },
    ],
    []
  );

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("File uploaded:", file.name);
      }
    },
    []
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setSearchResults([
        {
          artNr: "12345",
          image: "/path/to/image.jpg",
          name: "Rotbarsch filet O.Haut 5,0Kg",
          price: "7,99 €/1,0 Kg",
        },
      ]);
    },
    []
  );

  const handleAddProduct = useCallback((product: SearchResult) => {
    
  }, []);

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategory(selectedCategories);
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  return (
    <Card>
      <Flex flexDirection="column" mt="1rem">
        <Tabs.Root defaultValue={tabs[0].value} onValueChange={setSelectedTab}>
          {!update && (
            <Flex justifyContent="space-between" alignItems="center" gap="32px">
              <H3>{`${productTitle} (${quantity})`}</H3>
              <div style={{ width: "60%", display: "flex", justifyContent: "left" }}>
                <TabsList>
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} label={tab.label} />
                  ))}
                </TabsList>
              </div>
            </Flex>
          )}
          {update && (
            <Flex justifyContent="right" alignItems="center" gap="32px">
              <div style={{ width: "42%", display: "flex", justifyContent: "left" }}>
                <TabsList>
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} label={tab.label} />
                  ))}
                </TabsList>
              </div>
              <>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <button className={buttonStyle} onClick={() => fileInputRef.current?.click()}>
                  <Icon icon="mdi:file-upload" className={iconStyle} />
                  <span className={buttonTextStyle}>Excel-Tabelle hochladen</span>
                </button>
              </>
            </Flex>
          )}
          <Flex justifyContent={"space-between"} mt="32px" mb="32px" position="relative">
            <InputWithIcon
              placeholder="Search product or Art.-Nr."
              icon={<Icon icon="mingcute:search-line" />}
              className={classNames("primaryBg searchplaceholder b-none", searchClasses)}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Flex gap="32px">
              <DynamicDropdown
                triggerLabel="Kategorien"
                items={filteredCategories}
                type="checkbox"
                onReset={() => handleCategoryChange(null)}
                onSubmit={handleCategoryChange}
                showIcon={false}
              />
              <DynamicDropdown
                triggerLabel="Sortieren nach"
                items={sortOptions}
                type="radio"
                onReset={() => handleSortChange(null)}
                onSubmit={handleSortChange}
                showIcon={true}
              />
            </Flex>
            {searchQuery && (
              <div className={searchResultsContainerStyle}>
                <InputWithIcon
                  placeholder="Search product or Art.-Nr."
                  icon={<Icon icon="mingcute:search-line" />}
                  className={classNames("primaryBg searchplaceholder b-none", searchClasses, subSearch)}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchResults.map((result, index) => (
                  <SearchResultItem
                    key={index}
                    artNr={result.artNr}
                    image={result.image}
                    name={result.name}
                    price={result.price}
                    onAdd={() => handleAddProduct(result)}
                  />
                ))}
              </div>
            )}
          </Flex>
          {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {update ? <UpdateFoodTable /> : <tab.Component selectedSection={selectedSection} subCategoryId={selectedTab} sortBy={sort} selectedTab={selectedTab} />}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Flex>
    </Card>
  );
};

export default ProductsManagementSection;
