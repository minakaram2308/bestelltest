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
  padding: "10px",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
});

const tableRowStyle = css({});

const tableCellStyle = css({
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
});

const wideCellStyle = css({
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
  gap: "10px",
});

const productImageStyle = css({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover!important",
});

const badgeStyle = css({
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
  padding: "4px 8px",
  display: "inline-block",
  textAlign: "center",
  minWidth: "50px",
});

interface Bezeichnung {
  image: string;
  text: string;
  description: string;
}

interface TableRowData {
  artNr: string;
  bezeichnung: Bezeichnung;
  verfugbarkeit: string; // Changed from verFugbarkeit to match column key conversion
  verkaufspreisnetto: number; // Changed to match key conversion
  verkaufspreiseinzelnnetto: number; // Changed to match key conversion
  reserviert: string;
  mwst: string;
  verfugbaremenge: string; // Changed to match key conversion
  mhd: string;
}

interface TableProps {
  columns: string[];
  data: TableRowData[];
}

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  const renderCellContent = (key: string, value: any) => {
    if (key === "bezeichnung") {
      return (
        <div className={imageWrapperStyle}>
          <img src={value.image} alt={value.text} className={productImageStyle} />
          <div>
            <div>{value.text}</div>
            <div>{value.description}</div>
          </div>
        </div>
      );
    }

    switch (key) {
      case "verfugbarkeit":
        return <span className={availabilityBadgeStyle}>{value}</span>;
      case "verkaufspreisnetto":
      case "verkaufspreiseinzelnnetto":
      case "reserviert":
      case "mwst":
      case "verfugbaremenge":
      case "mhd":
        return <span className={badgeStyle}>{value}</span>;
      default:
        return value;
    }
  };

  return (
    <div className={tableWrapperStyle}>
      <table className={tableStyle}>
        <thead>
          <tr className={tableRowStyle}>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${tableHeadStyle} ${
                  column === "Bezeichnung" || column === "Details"
                    ? wideCellStyle
                    : ""
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={tableRowStyle}>
              {columns.map((column, colIndex) => {
                const key = column
                  .toLowerCase()
                  .replace(/ /g, '')
                  .replace(/[äöüß]/g, match => {
                    switch (match) {
                      case 'ä': return 'a';
                      case 'ö': return 'o';
                      case 'ü': return 'u';
                      case 'ß': return 'ss';
                      default: return match;
                    }
                  });
                return (
                  <td
                    key={colIndex}
                    className={`${tableCellStyle} ${
                      column === "Bezeichnung" || column === "Details"
                        ? wideCellStyle
                        : ""
                    }`}
                  >
                    {renderCellContent(key, row[key])}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
