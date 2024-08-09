import React from "react";
import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";
import InputWithIcon from "@/components/wrappers/InputWithIcon";
import { Icon } from "@/components";
import classNames from "classnames";
import PriceWidget from "@/components/ui/priceWidget"; // Adjust the import path as necessary

const searchClasses = css({
  borderRadius: "12px",
  padding: "16px",
  minWidth: { base: "auto", lg: "500px" },
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  fontSize: "1rem",
});

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  marginBottom: "20px",
  width:'100%'
});

const headerStyle = css({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
});

const avatarStyle = css({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  marginRight: "20px",
});

const userInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  marginLeft:'10px'
});

const userNameStyle = css({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  marginRight: "10px",
});

const userNumberStyle = css({
  fontSize: "14px",
  color: "#666",
});

const sectionTitleStyle = css({
  fontSize: "14px",
  fontWeight: "bold",
  margin: "10px 0",
  color: "#333",
});

const priceContainerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
    width:'350px',
  flexDirection:'row',

});

const priceLabelStyle = css({
  fontSize: "12px",
  color: "#666",
  marginRight: "20px",

});

const oldPriceStyle = css({
  fontSize: "14px",
  color: "#999",
  textDecoration: "line-through",
  width: "100px",
  marginLeft: "20px",
});

const newPriceStyle = css({
  fontSize: "14px",
  marginLeft: "20px",
  color: "#0070f3",
  width: "50px",
});

const groupRow = css({
    width:'100%',
    
})
const GroupComponent = ({ group }) => (
  <Box className={containerStyle}>
    <Flex className={headerStyle}>
      <input type="checkbox" checked />
      <Box className={userInfoStyle}>
        <Flex alignItems="center">
          <Box className={userNameStyle}>{group.name}</Box>
        </Flex>
        <Box className={userNumberStyle}>{group.customers} Kunden</Box>
      </Box>
    </Flex>
    <Flex>
    {group.items.map((item, index) => (
      <Flex justifyContent="space-between" className="px-20" key={index}>
        <Box className={groupRow}>
          <Box className={sectionTitleStyle}>{item.type}</Box>
          <Flex className={priceContainerStyle}>
            <PriceWidget value={parseFloat(item.price)} />
            <Box>
              <Box className={oldPriceStyle}>{item.oldPrice}</Box>
              <Box className={newPriceStyle}>{item.newPrice}</Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    ))}
    </Flex>
  
  </Box>
);

const Groups = () => {
  const groups = [
    {
      name: "Restaurants",
      customers: 50,
      items: [
        {
          type: "Karton",
          price: "2.27",
          oldPrice: "9,77 €",
          newPrice: "7,50 €",
        },
        {
          type: "Stück",
          price: "2.27",
          oldPrice: "9,77 €",
          newPrice: "7,50 €",
        },
      ],
    },
    {
      name: "Cafés",
      customers: 50,
      items: [
        {
          type: "Karton",
          price: "2.27",
          oldPrice: "9,77 €",
          newPrice: "7,50 €",
        },
        {
          type: "Stück",
          price: "2.27",
          oldPrice: "9,77 €",
          newPrice: "7,50 €",
        },
      ],
    },
    // Add more group objects as needed
  ];

  return (
    <Box className="flex-col gap-40">
      <InputWithIcon
        placeholder="Kundenname oder Kunden-Nr."
        icon={<Icon icon="mingcute:search-line" />}
        className={classNames("primaryBg searchplaceholder b-none", searchClasses)}
      />
      <Box mt="20px" className="font-bold">
        Ausgewählte Artikelgruppen
      </Box>
      {groups.map((group, index) => (
        <GroupComponent key={index} group={group} />
      ))}
    </Box>
  );
};

export default Groups;
