import React, { useState, useRef, useEffect } from 'react';
import { DotsVerticalIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, Pencil1Icon, TrashIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { css } from 'styled-system/css';
import PriceBadge from './tableAssets/priceBadge';
import EditableQuantityBadge from './tableAssets/quantityBadge';
import EditableDateBadge from './tableAssets/dateBadge';
import DynamicDropdown from '@/components/ui/Drobdown/optionsDrobdown';
import CustomText from './tableAssets/productTextInfo';
import { useArchiveProduct } from '@/hooks/useProducts/archieveProduct';
import { useDeleteProduct } from '@/hooks/useProducts/deleteProduct';
import { Icon } from '../wrappers';
import { useUpdateProductsQuantityAndPrice } from '@/hooks/useProducts/updateProductQuantity&price';

const tableWrapperStyle = css({
  margin: '20px 0px',
  width: '100%',
  overflowX: 'auto',
});

const tableHeaderStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 3fr 2fr 2fr 2fr',
  padding: '10px 40px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f2f2f2',
  fontWeight: '600',
  fontSize: '13px',
  textAlign: 'left',
  alignItems: 'center',
});

const tableRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 3fr 2fr 2fr 2fr',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
  justifyContent: "space-between",
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
  position: 'relative',
  width: '320px',
});

const productImageStyle = css({
  marginRight: '10px',
  minWidth: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover!important',
});

const productDetailsStyle = css({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
});

const optionsIconContainerStyle = css({
  position: 'absolute',
  bottom: '30px',
  left: '21%',
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
  top: '10%',
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
  justifySelf: 'flex-end',
  gap: '65px',
});

const flexCol = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '15px',
});

const code = css({
  width: '100px'
});

const subInfo = css({
  color: 'rgba(154, 159, 165, 1)',
});

const emptyCell = css({
  width: '100%'
});

const modifiedInputStyle = css({
  borderColor: 'rgba(42, 133, 255, 0.35)',
});

const saveButtonsContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const buttonStyle = css({
  margin: '0 10px',
  padding: '10px 20px',
  backgroundColor: '#3A86FF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
});

const cancelButtonStyle = css({
  backgroundColor: '#FF0000',
});

interface ProductUnit {
  __typename: string;
  name: string;
}

interface QuantityDetails {
  __typename: string;
  qte: number;
  end: string;
}

interface TableRowData {
  __typename: string;
  id: string;
  title: string;
  image: string | null;
  price: number;
  quantity: number;
  specialCode: string;
  productUnit: ProductUnit;
  orderedQuantity: number | null;
  tax: number;
  quantityDetails: QuantityDetails[] | null;
}

interface TableProps {
  data: TableRowData[];
}


const CustomTable: React.FC<TableProps> = ({ data }) => {
  const { archiveProduct, loading: archiveLoading, error: archiveError, data: archiveData } = useArchiveProduct();
  const { deleteProduct, loading: deleteLoading, error: deleteError, data: deleteData } = useDeleteProduct();
  const { updateProductsQuantityAndPrice, loading: updateLoading, error: updateError, data: updateData } = useUpdateProductsQuantityAndPrice();

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(DynamicDropdown | null)[]>([]);
  const [hiddenRows, setHiddenRows] = useState<number[]>([]);
  const [tableData, setTableData] = useState<TableRowData[]>(data);
  const [productInfoRows, setProductInfoRows] = useState<{ [key: number]: any[] }>({});
  const [isModified, setIsModified] = useState<boolean>(false);

  useEffect(() => {
    const initialProductInfoRows = data.reduce((acc, row, rowIndex) => {
      acc[rowIndex] = row.quantityDetails ? row.quantityDetails.map(detail => ({
        price: row.price,
        quantity: detail.qte,
        expiryDate: detail.end,
        isModified: false,
      })) : [{
        price: row.price,
        quantity: row.quantity,
        expiryDate: '',
        isModified: false,
      }];
      return acc;
    }, {} as { [key: number]: any[] });
    setProductInfoRows(initialProductInfoRows);
  }, [data]);

  const handleDropdownToggle = (rowIndex: number) => {
    if (activeDropdown !== null && activeDropdown !== rowIndex && dropdownRefs.current[activeDropdown]) {
      dropdownRefs.current[activeDropdown]?.closeDropdown();
    }
    setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex);
    dropdownRefs.current[rowIndex]?.toggleDropdown();
  };

  const handleDropdownAction = async (action: string, rowIndex: number) => {
    if (action === 'delete') {
      await deleteProduct(tableData[rowIndex].id);
      setTableData(tableData.filter((_, index) => index !== rowIndex));
    } else if (action === 'hide') {
      await archiveProduct(tableData[rowIndex].id);
      setHiddenRows(
        hiddenRows.includes(rowIndex)
          ? hiddenRows.filter((index) => index !== rowIndex)
          : [...hiddenRows, rowIndex]
      );
    }
    setActiveDropdown(null);
    dropdownRefs.current[rowIndex]?.closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.options-icon') && !target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addProductInfoRow = (rowIndex: number) => {
    setProductInfoRows(prevState => ({
      ...prevState,
      [rowIndex]: [...prevState[rowIndex], { price: 0, quantity: 0, expiryDate: '', isModified: false }]
    }));
    setIsModified(true);
  };

  const removeProductInfoRow = (rowIndex: number, infoRowIndex: number) => {
    setProductInfoRows(prevState => ({
      ...prevState,
      [rowIndex]: prevState[rowIndex].filter((_, index) => index !== infoRowIndex)
    }));
    setIsModified(true);
  };

  const handleInputChange = (rowIndex: number, infoRowIndex: number, field: string, value: string) => {
    setProductInfoRows(prevState => ({
      ...prevState,
      [rowIndex]: prevState[rowIndex].map((infoRow, index) =>
        index === infoRowIndex ? { ...infoRow, [field]: field === 'quantity' || field === 'price' ? Number(value) : value, isModified: true } : infoRow
      )
    }));
    setIsModified(true);
  };

  const handleSaveChanges = async () => {
    const productsToUpdate = tableData.map((row, rowIndex) => {
      const infoRows = productInfoRows[rowIndex].filter(infoRow => infoRow.expiryDate !== "").map(infoRow => ({
        quantity: infoRow.quantity,
        expiryDate: infoRow.expiryDate
      }));

      const product = {
        productId: row.id,
        quantity: row.quantity,
        singularPrice: row.price || 0
      };

      if (infoRows.length > 0) {
        product['quantityInput'] = infoRows;
        product['price'] = row.price || 0;  // Ensure price is set when quantityInput exists
      }

      return product;
    });

    try {
      await updateProductsQuantityAndPrice(productsToUpdate);
      console.log('Products updated successfully');
    } catch (err) {
      console.error('Failed to update products:', err);
    }

    setIsModified(false);
  };

  const handleCancelChanges = () => {
    // Logic to revert changes goes here
    setIsModified(false);
  };

  return (
    <div className={tableWrapperStyle}>
      <div className={tableHeaderStyle}>
        <div>Art.-Nr.</div>
        <div>Bezeichnung</div>
        <div>Verkaufspreis (Netto)</div>
        <div>Verfügbare menge</div>
        <div>Mindesthaltbarkeitsdatum (MHD)</div>
      </div>

      {tableData.map((row, rowIndex) => (
        <div key={row.id} className={tableRowStyle}>
          <div className={`${cellStyle} ${code} `}>{row.specialCode}</div>
          <div className={`${productCellStyle} ${cellStyle}`}>
            <div className={imageWrapperStyle}>
              {row.image ? (
                <img src={row.image} alt={row.title} className={productImageStyle} width={80} height={80}/>
              ) : (
                <div className={productImageStyle} style={{ backgroundColor: '#f0f0f0' }}></div>
              )}
              {hiddenRows.includes(rowIndex) && (
                <div className={overlayStyle}>
                  <EyeClosedIcon />
                </div>
              )}
              <div className={productDetailsStyle}>
                <div>{row.title}</div>
                <CustomText />
                <div>
                  <span className={subInfo}>{row.specialCode}</span>
                </div>
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
                  { label: 'Artikel bearbeiten', value: 'edit', icon: <Pencil1Icon /> },
                  {
                    label: 'Ausblenden',
                    value: 'hide',
                    icon: hiddenRows.includes(rowIndex) ? <EyeOpenIcon /> : <EyeClosedIcon />,
                  },
                  { label: 'Preisangabe', value: 'lock', icon: <LockClosedIcon /> },
                  { label: 'Löschen', value: 'delete', icon: <TrashIcon /> },
                ]}
                onAction={(action) => handleDropdownAction(action, rowIndex)}
                customTrigger={<div />}
              />
            </div>
          </div>
          <div className={`${cellStyle} ${flexCol}`}>
            {productInfoRows[rowIndex]?.map((infoRow, infoRowIndex) => (
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
                  date={infoRow.expiryDate}
                  onChange={(value) => handleInputChange(rowIndex, infoRowIndex, 'expiryDate', value)}
                  className={infoRow.isModified ? modifiedInputStyle : ''}
                />

                {productInfoRows[rowIndex].length - 1 === infoRowIndex ? (
                  <button type="button" className={css({ color: '#3A86FF', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' })} onClick={() => addProductInfoRow(rowIndex)}>
                    <PlusCircledIcon width={24} height={24} />
                  </button>
                ) : (
                  <button type="button" className={css({ color: '#ff0000', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' })} onClick={() => removeProductInfoRow(rowIndex, infoRowIndex)}>
                    <TrashIcon width={24} height={24} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {isModified && (
        <div className={saveButtonsContainerStyle}>
          <button type="button" className={`${buttonStyle} subButton `} onClick={handleCancelChanges}>
            <Icon icon={'dismiss'} />
            <span>
            Abbrechen
            </span>
        
          </button>
          <button type="button" className={`${buttonStyle} mainButton`} onClick={handleSaveChanges} disabled={updateLoading}>
          {updateLoading ? 'Aktualisieren...' : 'Aktualisieren'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTable;