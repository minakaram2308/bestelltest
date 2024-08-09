import React, { useState, useRef } from 'react';
import { DotsVerticalIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, Pencil1Icon, TrashIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { css } from 'styled-system/css';
import PriceBadge from './tableAssets/priceBadge';
import EditableQuantityBadge from './tableAssets/quantityBadge';
import EditableDateBadge from './tableAssets/dateBadge';
import DynamicDropdown from '@/components/ui/Drobdown/optionsDrobdown';
import CustomText from './tableAssets/productTextInfo'; // Import the CustomText component
import QuantityDateEntryComponent from './update'; // Import the QuantityDateEntryComponent

const tableWrapperStyle = css({
  margin: '20px 0px',
  width: '100%',
  overflowX: 'auto',
});

const tableHeaderStyle = css({
  display: 'grid',
  gridTemplateColumns: 'min-content 1fr repeat(4, 1fr)',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
  textAlign: 'center',
  alignItems: 'center',
});

const tableRowStyle = css({
  display: 'grid',
  gridTemplateColumns: 'min-content 1fr repeat(4, 1fr)',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
  textAlign: 'center',
  position: 'relative',
  '&:hover .options-icon-container': {
    display: 'flex',
  },
});

const cellStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '10px',
});

const productCellStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '10px',
});

const imageWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  minWidth: '280px',
  position: 'relative',
});

const productImageStyle = css({
  marginRight: '10px',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover!important',
});

const productDetailsStyle = css({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '220px',
  textAlign: 'left',
});

const productIdStyle = css({
  minWidth: '100px',
});
const productInfoStyle = css({
  minWidth:'280px'
})
const optionsIconContainerStyle = css({
  position: 'absolute',
  bottom: '10px',
  left: '70px',
  display: 'none',
  cursor: 'pointer',
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '50%',
  padding: '5px',
  transition: 'transform 0.2s, background-color 0.2s',
  alignItems: 'center',
  justifyContent: 'center',
});

const overlayStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  color: '#fff',
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
  data: TableRowData[];
}

const CustomTable: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(DynamicDropdown | null)[]>([]);
  const [hiddenRows, setHiddenRows] = useState<number[]>([]);

  const handleInputChange = (rowIndex: number, field: string, value: string) => {
    const newData = [...tableData];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setTableData(newData);
  };

  const handleDropdownToggle = (rowIndex: number) => {
    if (activeDropdown !== null && activeDropdown !== rowIndex && dropdownRefs.current[activeDropdown]) {
      dropdownRefs.current[activeDropdown]?.closeDropdown();
    }
    setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex);
    dropdownRefs.current[rowIndex]?.toggleDropdown();
  };

  const handleDropdownAction = (action: string, rowIndex: number) => {
    if (action === 'delete') {
      setTableData(tableData.filter((_, index) => index !== rowIndex));
    } else if (action === 'hide') {
      setHiddenRows(hiddenRows.includes(rowIndex)
        ? hiddenRows.filter(index => index !== rowIndex)
        : [...hiddenRows, rowIndex]);
    }
    setActiveDropdown(null);
    dropdownRefs.current[rowIndex]?.closeDropdown();
  };

  return (
    <div className={tableWrapperStyle}>
      <div className={tableHeaderStyle}>
        <div className={productIdStyle}>Art.-Nr.</div>
        <div className={productInfoStyle}>Bezeichnung</div>
        <div>Verkaufspreis (Netto)</div>
        <div>Verkaufspreis Einzel z.B Stück, Kg, Dosen etc. (Netto)</div>
        <div>Bestand</div>
        <div>Mindesthaltbarkeitsdatum (MHD)</div>
      </div>
      
      {tableData.map((row, rowIndex) => (
        <div key={rowIndex} className={tableRowStyle}>
          <div className={cellStyle}>{row.artNr}</div>
          <div className={`${productCellStyle} ${cellStyle}`}>
            <div className={imageWrapperStyle}>
              <img src={row.image} alt={row.bezeichnung} className={productImageStyle} />
              {hiddenRows.includes(rowIndex) && (
                <div className={overlayStyle}>
                  <EyeClosedIcon />
                </div>
              )}
              <div className={productDetailsStyle}>
                <div>{row.bezeichnung}</div>
                <CustomText />
                <div>{row.details.split('\n').map((line, idx) => (
                  <span key={idx}>{line}<br /></span>
                ))}</div>
              </div>
              <div
                className={`${optionsIconContainerStyle} options-icon-container ${activeDropdown === rowIndex ? 'active' : ''}`}
                onClick={() => handleDropdownToggle(rowIndex)}
              >
                <DotsVerticalIcon />
              </div>
              <DynamicDropdown
                ref={(el) => (dropdownRefs.current[rowIndex] = el)}
                items={[
                  { label: "Artikel bearbeiten", value: "edit", icon: <Pencil1Icon /> },
                  { label: "Ausblenden", value: "hide", icon: hiddenRows.includes(rowIndex) ? <EyeOpenIcon /> : <EyeClosedIcon /> },
                  { label: "Preisangabe", value: "lock", icon: <LockClosedIcon /> },
                  { label: "Löschen", value: "delete", icon: <TrashIcon /> },
                ]}
                onAction={(action) => handleDropdownAction(action, rowIndex)}
                customTrigger={<div />}
              />
            </div>
          </div>
          <div className={cellStyle}>
            <PriceBadge label="Karton" price={row.preisNetto} />
          </div>
          <div className={cellStyle}>
            <PriceBadge label="Stück" price={row.verkaufspreisEinzel} />
          </div>
          <div className={cellStyle} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <EditableQuantityBadge
              quantity={row.reserviert}
              onChange={(value) => handleInputChange(rowIndex, 'reserviert', value)}
            />
          </div>
          <div className={cellStyle} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <EditableDateBadge
              date={row.mhd}
              onChange={(value) => handleInputChange(rowIndex, 'mhd', value)}
            />
          </div>
          <div className={cellStyle}>
            <QuantityDateEntryComponent data={[]} /> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomTable;
