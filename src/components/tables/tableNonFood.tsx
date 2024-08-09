import React from "react";
import { css } from "styled-system/css";

const tableWrapperStyle = css({
  margin: "20px 0px",
});

const tableStyle = css({
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #ddd",
});

const tableHeadStyle = css({
  backgroundColor: "#f2f2f2",
  textAlign: "center",
  padding: "4px",
  borderBottom: "1px solid #ddd",
  fontWeight: "normal",
  maxWidth: "120px",
});

const tableRowStyle = css({});

const tableCellStyle = css({
  padding: "8px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
  maxWidth: "120px",
});

const wideCellStyle = css({
  maxWidth: "220px",
  textAlign: "left!important",
});

const availabilityBadgeStyle = css({
  backgroundColor: "#c8e6c9",
  color: "#388e3c",
  padding: "0.2rem 0.5rem",
  borderRadius: "5px",
});

const imageWrapperStyle = css({
  display: "flex",
  alignItems: "center",
});

const productImageStyle = css({
  marginRight: "10px",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover!important",
});

const productDetailsStyle = css({
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
});

const badgeStyle = css({
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
  padding: "4px 8px",
  display: "inline-block",
  textAlign: "center",
  minWidth: "50px",
});

interface TableRowData {
  artNr: string;
  image: string;
  bezeichnung: string;
  details: string;
  verFugbarkeit: string;
  preisNetto: string;
  verkaufspreisEinzel: string;
  reserviert: string;
  mwSt: string;
  bestand: string;
  mhd: string;
}

interface TableProps {
  columns: string[];
  data: TableRowData[];
}

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className={tableWrapperStyle}>
      <table className={tableStyle}>
        <thead>
          <tr className={tableRowStyle}>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${tableHeadStyle} ${column === "Bezeichnung" || column === "Details" ? wideCellStyle : ""}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={tableRowStyle}
              onClick={() => onRowClick(row.artNr)}
            >
              {columns.includes("Art.-Nr.") && (
                <td className={tableCellStyle}>{row.artNr}</td>
              )}
              {columns.includes("Bezeichnung") && (
                <td className={`${tableCellStyle} ${wideCellStyle}`}>
                  <div className={imageWrapperStyle}>
                    {row.image && (
                      <img
                        src={row.image}
                        alt={row.bezeichnung}
                        className={productImageStyle}
                        width={80}
                        height={80}
                      />
                    )}
                    <div className={productDetailsStyle}>
                      <div>{row.bezeichnung}</div>
                      {row.details && (
                        <div>
                          {row.details.split("\n").map((line, idx) => (
                            <span key={idx}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              )}
              {columns.includes("Verfügbarkeit") && (
                <td className={tableCellStyle}>
                  <span
                    className={`${availabilityBadgeStyle} ${currentCategoryStyle.badge || ""}`}
                  >
                    {row.verFugbarkeit}
                  </span>
                </td>
              )}
              {columns.includes("Verkaufspreis (Netto)") && (
                <td className={tableCellStyle}>
                  <span className={badgeStyle}>{row.preisNetto}</span>
                </td>
              )}
              {columns.includes("Verkaufspreis Einzel (Netto)") && (
                <td className={tableCellStyle}>
                  <span className={badgeStyle}>{row.verkaufspreisEinzel}</span>
                </td>
              )}
              {columns.includes("Reserviert") && (
                <td className={tableCellStyle}>
                  <span className={badgeStyle}>{row.reserviert}</span>
                </td>
              )}
              {columns.includes("MwSt") && (
                <td className={tableCellStyle}>{row.mwSt || "N/A"}</td>
              )}
              {columns.includes("Bestand") && (
                <td className={tableCellStyle}>{row.bestand || "N/A"}</td>
              )}
              {columns.includes("Verfügbare Menge") && (
                <td className={tableCellStyle}>
                  {row.verfügbareMenge || "N/A"}
                </td>
              )}
              {(columns.includes("Mhd") ||
                columns.includes("Mindesthaltbarkeitsdatum (MHD)")) && (
                <td className={tableCellStyle}>{row.endDate || "N/A"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
