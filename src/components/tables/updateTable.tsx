import React, { useState, useRef } from 'react';
import { DotsVerticalIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, Pencil1Icon, TrashIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { css } from 'styled-system/css';
import PriceBadge from './tableAssets/priceBadge';
import EditableQuantityBadge from './tableAssets/quantityBadge';
import EditableDateBadge from './tableAssets/dateBadge';
import DynamicDropdown from '@/components/ui/Drobdown/optionsDrobdown';
import CustomText from './tableAssets/productTextInfo';

const tableWrapperStyle = css({
  margin: '20px 0px',
  width: '100%',
  overflowX: 'auto',
});

const tableHeaderStyle = css({
  // display: 'grid',
  display:'flex',
  // gridTemplateColumns: '1fr 3fr 2fr 2fr 2fr 2fr',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f2f2f2',
  fontWeight: '600',
  fontSize: '13px',
  textAlign: 'left',
  alignItems: 'center',
  justifyContent:'space-between'
});

const tableRowStyle = css({
  display:'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
  textAlign: 'center',
  position: 'relative',
  
  justifyContent: 'space-between',
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
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '10px',
  fontSize: '15px',
  fontWeight: '700',
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
  minWidth: '60px',
});

const productInfoStyle = css({
  minWidth: '100px'
});

const optionsIconContainerStyle = css({
  position: 'absolute',
  bottom: '30px',
  left: '60px',
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
  top: '40px',
  left: 0,
  width: '80px',
  height: '80px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  color: '#fff',
});

const flexRow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '35px',
  
});

const flexCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

const subInfo = css({
  color: 'rgba(154, 159, 165, 1)'
});

const modifiedInputStyle = css({
  borderColor: 'red',
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

interface ProductInfoRow {
  price: number;
  quantity: number;
  date: string;
  isModified: boolean;
}

interface TableProps {
  data: TableRowData[];
}

const CustomTable: React.FC<TableProps> = ({ data }) => {

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(DynamicDropdown | null)[]>([]);
  const [hiddenRows, setHiddenRows] = useState<number[]>([]);
  const [tableData, setTableData] = useState<TableRowData[]>(data);

  const [productInfoRows, setProductInfoRows] = useState<{ [key: number]: ProductInfoRow[] }>({
    0: [{ price: 100, quantity: 10, date: '2024-06-28', isModified: false }],
    1: [{ price: 200, quantity: 20, date: '2025-06-28', isModified: false }]
  });

  const handleInputChange = (rowIndex: number, infoRowIndex: number, field: keyof ProductInfoRow, value: string) => {
    setProductInfoRows(prevState => ({
      ...prevState,
      [rowIndex]: prevState[rowIndex].map((infoRow, index) =>
        index === infoRowIndex ? { ...infoRow, [field]: field === 'quantity' ? Number(value) : value, isModified: true } : infoRow
      )
    }));
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

  const addProductInfoRow = (rowIndex: number) => {
    setProductInfoRows(prevState => ({
      ...prevState,
      [rowIndex]: [...prevState[rowIndex], { price: 0, quantity: 0, date: '', isModified: false }]
    }));
  };

  const removeProductInfoRow = (rowIndex: number, infoRowIndex: number) => {
    setProductInfoRows(prevState => ({
      ...prevState,
      [rowIndex]: prevState[rowIndex].filter((_, index) => index !== infoRowIndex)
    }));
  };

  return (
    <div className={tableWrapperStyle}>
      <div className={tableHeaderStyle}>
        <div className={productIdStyle}>Art.-Nr.</div>
        <div className={productInfoStyle}>Bezeichnung</div>
        <div>Verkaufspreis (Netto)</div>
        <div>Verkaufspreis Einzel z.B Stück, Kg, Dosen etc. (Netto)</div>
       
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
                  <span className={subInfo} key={idx}>{line}<br /></span>
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
          <div className={`${cellStyle} ${flexCol}`}>
            {productInfoRows[rowIndex] && productInfoRows[rowIndex].map((infoRow, infoRowIndex) => (
              <div key={infoRowIndex} className={flexRow}>
             
                <PriceBadge
                  label="Stück"
                  price={infoRow.price.toString()}
                  onChange={(value) => handleInputChange(rowIndex, infoRowIndex, 'price', value)}
                  className={infoRow.isModified ? modifiedInputStyle : ''}
                />
                <EditableQuantityBadge
                  quantity={infoRow.quantity}
                  onChange={(value) => handleInputChange(rowIndex, infoRowIndex, 'quantity', value)}
                  className={infoRow.isModified ? modifiedInputStyle : ''}
                />
                <EditableDateBadge
                  date={infoRow.date}
                  onChange={(value) => handleInputChange(rowIndex, infoRowIndex, 'date', value)}
                  className={infoRow.isModified ? modifiedInputStyle : ''}
                />
                {productInfoRows[rowIndex].length - 1 === infoRowIndex ? (
                  <div className={flexRow}>
                    <button type="button" className={css({ color: '#3A86FF', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' })} onClick={() => addProductInfoRow(rowIndex)}>
                      <PlusCircledIcon width={24} height={24} />
                    </button>
                  </div>
                ) : (
                  <div className={flexRow}>
                    <button type="button" className={css({ color: '#ff0000', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' })} onClick={() => removeProductInfoRow(rowIndex, infoRowIndex)}>
                      <TrashIcon width={24} height={24} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomTable;