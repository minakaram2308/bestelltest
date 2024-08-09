import React, { useState, useEffect } from "react";
import Card from "@/components/wrappers/Card/infoCard";
import CardMain from "@/components/wrappers/Card/";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";

interface CardData {
  title: string;
  value: number;
  icon: string;
}

const dashboardStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
});

const InfoCards: React.FC<{
  sectionIndex: number;
  selectedSection: string;
  categoryLengths: { [key: string]: number };
  onSectionChange: (section: string) => void;
}> = ({
  sectionIndex,
  selectedSection,
  categoryLengths = {},
  onSectionChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Initialize with the first index active

  const {
    ALL = 0,
    RESTOCK = 0,
    OUTSTOCK = 0,
    ARCHIVE = 0,
    POPULAR = 0,
    NEW = 0,
    EXPIRED = 0,
  } = categoryLengths;

  const cards: CardData[] = [
    { title: "Alle Artikel", value: ALL, icon: "icon-all" },
    { title: "Bestand nachfüllen", value: RESTOCK, icon: "icon-refill" },
    { title: "Ausverkaufte Artikel", value: OUTSTOCK, icon: "icon-soldout" },
    { title: "Archivierte Artikel", value: ARCHIVE, icon: "icon-archive" },
    { title: "Beliebte Artikel", value: POPULAR, icon: "icon-popular" },
    { title: "Neu im Sortiment", value: NEW, icon: "icon-new" },
    { title: "MHD aktualisieren", value: EXPIRED, icon: "icon-recall" },
  ];

  useEffect(() => {
    setActiveIndex(0); // Set the first category as active by default when the component mounts
  }, []);

  const handleCardClick = (title: string, index: number) => {
    setActiveIndex(index);
    onSectionChange(title);
  };

  return (
    <CardMain>
      <Box className={dashboardStyle}>
        {cards.map((card, cardIndex) => (
          <a
            key={cardIndex}
            onClick={() => handleCardClick(card.title, cardIndex)}
            style={{ textDecoration: "none" }}
          >
            <Card
              category={card.title}
              value={card.value}
              icon={card.icon}
              isActive={cardIndex === activeIndex}
              index={cardIndex}
            />
          </a>
        ))}
      </Box>
    </CardMain>
  );
};

export default InfoCards;
