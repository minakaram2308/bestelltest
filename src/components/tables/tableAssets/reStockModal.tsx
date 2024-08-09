import React from 'react';
import { css } from 'styled-system/css';
// import EditablePriceBadge from './EditablePriceBadge';
import EditableQuantityBadge from './quantityBadge';
import EditableDateBadge from './dateBadge';
import { TrashIcon, PlusIcon } from '@radix-ui/react-icons';

const modalStyle = css({
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
});

const headerStyle = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
});

const tableStyle = css({
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
});

const thStyle = css({
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#666',
  padding: '10px',
  borderBottom: '1px solid #ddd',
});

const tdStyle = css({
  padding: '10px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'middle',
});

const rowStyle = css({
  backgroundColor: '#f9f9f9',
});

const footerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
});

const buttonStyle = css({
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '8px',
  cursor: 'pointer',
  border: 'none',
  '&.cancel': {
    backgroundColor: '#eee',
    color: '#333',
  },
  '&.update': {
    backgroundColor: '#f90',
    color: '#fff',
  },
});

const iconButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#eee',
  cursor: 'pointer',
  border: 'none',
  '&.delete': {
    backgroundColor: '#fdd',
    color: '#f00',
  },
  '&.add': {
    backgroundColor: '#ddd',
    color: '#00f',
  },
});

const RestockModal = () => {
  const handlePriceChange = (value) => {
    // Handle price change
  };

  const handleQuantityChange = (value) => {
    // Handle quantity change
  };

  const handleDateChange = (value) => {
    // Handle date change
  };

  return (
    <div className={modalStyle}>
      <div className={headerStyle}>Bestand nachfüllen</div>
      <table className={tableStyle}>
        <thead>
          <tr>
            <th className={thStyle}>Art.-Nr.</th>
            <th className={thStyle}>Bezeichnung</th>
            <th className={thStyle}>Verfügbare Menge</th>
            <th className={thStyle}>Mindesthaltbarkeitsdatum (MHD)</th>
          </tr>
        </thead>
        <tbody>
          <tr className={rowStyle}>
            <td className={tdStyle}>12345</td>
            <td className={tdStyle}>
              <div>
                <img src="/path/to/image.png" alt="Product" style={{ width: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>
                  <div>Rotbarsch filet</div>
                  <div>0.Haut 5,0Kg</div>
                  <div>7,99 €/ 1,0 Kg</div>
                  <div>850 g/Stk</div>
                </div>
              </div>
            </td>
            <td className={tdStyle}>
              <EditableQuantityBadge quantity="5" onChange={handleQuantityChange} />
              <EditableQuantityBadge quantity="2" onChange={handleQuantityChange} />
            </td>
            <td className={tdStyle}>
              <EditableDateBadge date="2024-06-28" onChange={handleDateChange} />
              <EditableDateBadge date="2024-06-28" onChange={handleDateChange} />
            </td>
            <td className={tdStyle}>
              <button className={`${iconButtonStyle} delete`}><TrashIcon /></button>
              <button className={`${iconButtonStyle} add`}><PlusIcon /></button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={footerStyle}>
        <button className={`${buttonStyle} cancel`}>Abbrechen</button>
        <button className={`${buttonStyle} update`}>Aktualisieren</button>
      </div>
    </div>
  );
};

export default RestockModal;
