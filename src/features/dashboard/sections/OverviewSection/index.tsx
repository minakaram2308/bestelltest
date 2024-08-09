import { Card, Icon } from "@/components";
import { H3, H6 } from "@/components/ui/Headings";
import React from "react";
import { Box, Flex, Grid, engine } from "styled-system/jsx";
import { DashboardSelect, StatisticsBox } from "../../components";
import { css } from "styled-system/css";

export const OverviewSection = () => {
  const gridStyles = css({
    base: {
      gridTemplateColumns: "2",
      mt: "10px",
    },
    md: {
      gridTemplateColumns: "3",
      mt: "20px",
    },
  });
  return (
    <section>
      <Card className="secondaryBg">
        <Flex justifyContent="space-between" alignItems="center">
          <H3>
            Übersicht <span style={{ color: "#7F8596" }}>| Diese Woche</span>
          </H3>
          <Box>
            <DashboardSelect />
          </Box>
        </Flex>
        <Grid className={gridStyles}>
          {[1, 2, 3, 4, 5, 6].map((x) => (
            <StatisticsBox key={x}>
              <H6>Umsatz</H6>
              <Flex justifyContent="space-between" alignItems="center">
                <engine.p
                  fontWeight="semibold"
                  fontSize={{ base: "40px", lgDown: "24px" }}
                >
                  250.000 €
                </engine.p>
                <Box>
                  <Icon icon="charm:pulse" fontSize={24} />
                </Box>
              </Flex>
            </StatisticsBox>
          ))}
        </Grid>
      </Card>
    </section>
  );
};

export default OverviewSection;
