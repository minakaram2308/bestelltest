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
//   padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
  
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
  width: "350px",
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

const Component = ({ user }) => (
  <Box className={containerStyle}>
    <Flex className={headerStyle}>
      <Box className={avatarStyle}>
        <img src="/images/p2.png" alt="Avatar" /> 
      </Box>
      <Box className={userInfoStyle}>
        <Flex alignItems="center">
          <Box className={userNameStyle}>{user.name}</Box>
          <Box className={priceLabelStyle}>
            <img src="/images/userBadge.png" alt="Badge" />
          </Box>
        </Flex>
        <Box className={userNumberStyle}>Kunden Nr: {user.number}</Box>
      </Box>
    </Flex>

    <Flex justifyContent="space-between" className="px-20">
      <Box>
        <Box className={sectionTitleStyle}>Karton</Box>
        <Flex className={priceContainerStyle}>
          <PriceWidget value={parseFloat(user.cartonPrice)} />
          <Box>
            <Box className={oldPriceStyle}>{user.oldCartonPrice}</Box>
            <Box className={newPriceStyle}>{user.newCartonPrice}</Box>
          </Box>
        </Flex>
      </Box>

      <Box>
        <Box className={sectionTitleStyle}>Stück</Box>
        <Flex className={priceContainerStyle}>
          <PriceWidget value={parseFloat(user.piecePrice)} />
          <Box>
            <Box className={oldPriceStyle}>{user.oldPiecePrice}</Box>
            <Box className={newPriceStyle}>{user.newPiecePrice}</Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Box>
);

const Individual = () => {
  const users = [
    {
      avatar: "path/to/avatar.png", // Replace with the correct path
      name: "Gastronom",
      number: "123456",
      cartonPrice: "2.27",
      oldCartonPrice: "9,77 €",
      newCartonPrice: "7,50 €",
      piecePrice: "2.27",
      oldPiecePrice: "9,77 €",
      newPiecePrice: "7,50 €",
    },
    {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },
      {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },
      {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },

      {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },
      {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },
      {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },
      {
        avatar: "path/to/avatar.png", // Replace with the correct path
        name: "Gastronom",
        number: "123456",
        cartonPrice: "2.27",
        oldCartonPrice: "9,77 €",
        newCartonPrice: "7,50 €",
        piecePrice: "2.27",
        oldPiecePrice: "9,77 €",
        newPiecePrice: "7,50 €",
      },
    // Add more user objects as needed
  ];

  return (
    <Box className="flex-col gap-40">
      <InputWithIcon
        placeholder="Kundenname oder Kunden-Nr."
        icon={<Icon icon="mingcute:search-line" />}
        className={classNames(
          "primaryBg searchplaceholder b-none",
          searchClasses
        )}
      />
      <Box mt="20px" className="font-bold">Ausgewählte Kunden (50)</Box>
      {users.map((user, index) => (
        <Component key={index} user={user} />
      ))}
    </Box>
  );
};

export default Individual;
